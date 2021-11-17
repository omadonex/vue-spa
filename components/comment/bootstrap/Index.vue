<template>
  <div class="dx-comments">

    <!-- Нет комментариев, label-напоминалка, что нужно оставить комментарий -->
    <div v-if="!isCommentsExists" class="mt-3">
      <i class="bi-chat-text" style="vertical-align: top;"></i>
      {{ t('emptyLabel') }}
    </div>

    <!-- Форма для оставления комментариев, либо ссылка на вход, если пользователь не аутентифицирован -->
    <div class="mt-3">
      <comment-form v-if="$root.auth__loggedIn"
                    @commentStored="commentStoredHandler"
                    :url-store="urlStore"
                    :commentable-id="modelId"
                    :commentable-type="modelClass"></comment-form>
      <comment-sign-in :url-login="urlLogin" v-else></comment-sign-in>
    </div>

    <!-- Блок комментариев -->
    <div v-if="isCommentsExists" class="mt-5">
      <template v-for="comment in commentList">
        <div v-if="deletedCommentsIds.indexOf(comment.id) === -1" class="mt-3" :key="'comment_' + comment.id">
          <comment-comment :url-login="urlLogin"
                           :comment-data="comment">
                    <!--                            @commentDeleted="commentDeletedHandler"-->
                    <!--                            @commentDeletedError="commentDeletedErrorHandler">-->
          </comment-comment>
          <div v-if="comment.comments.length > 0" style="margin-left: 100px;">
            <comment :inner-comment-list="comment.comments" :model-data="comment" :top-level="false"></comment>
          </div>
        </div>
      </template>
    </div>

    <!-- Спиннер подгрузки комментариев -->
    <div v-show="loading" class="mt-3 spinner-grow" role="status"></div>

  </div>
</template>

<script>
  import CommentComment from './CommentComment.vue';
  import CommentForm from './CommentForm.vue';
  import CommentSignIn from './CommentSignIn.vue';
  import TranslateMixin from '../../../mixins/translate';

  export default {
    name: 'OmxComment',
    components: { CommentComment, CommentForm, CommentSignIn },
    mixins: [TranslateMixin],

    data() {
      return {
        translate__ns: {
          default: 'app.components.dxComments',
        },
        loading: false,
        initialized: false,
        nextPage: 1,
        loadedCommentList: [],
        newCommentList: [],
        scrolledToBottom: false,

        deletedCommentsIds: [],
      };
    },

    props: {
      urlLogin: { type: String, required: true },
      urlLoad: { type: String, required: true },
      urlStore: { type: String, required: true },
      modelId: { type: Number, required: true },
      modelClass: { type: String, required: true },
      timeFreeze: { type: Number, default: 15 },
      timeEdit: { type: Number, default: 1440 },
    },

    computed: {
      commentList() {
        return this.newCommentList.concat(this.loadedCommentList);
      },

      isCommentsExists() {
        return this.commentList.length !== 0;
      },
    },

    watch: {
      scrolledToBottom(value) {
        if (this.initialized && value) {
          this.loadComments();
        }
      }
    },

    methods: {
      windowScrollHandler(event) {
        let d = event.path[0];
        let w = event.path[1];
        this.scrolledToBottom = Math.max(w.pageYOffset, d.documentElement.scrollTop, d.body.scrollTop) + w.innerHeight === d.documentElement.offsetHeight
      },

      commentStoredHandler(data) {
        this.newCommentList.unshift(data);
      },
      //
      // commentDeletedHandler(commentId) {
      //   this.deletedCommentsIds.push(commentId);
      // },
      //
      // commentDeletedErrorHandler(commentId) {
      //   let index = this.deletedCommentsIds.findIndex((item, i, arr) => {
      //     return item === commentId;
      //   });
      //   this.deletedCommentsIds.splice(index, 1);
      // },

      loadComments() {
        if (this.nextPage !== 0) {
          return this.$root.smartAjax__call({
            callingObject: this,
            method: 'get',
            url: this.urlLoad,
            params: {
              page: this.nextPage,
              commentableId: this.modelId,
              commentableType: this.modelClass,
              lang: this.$root.DataLang.currLang
            },
          })
              .then((result) => {
                if (result.data.length > 0) {
                  this.loadedCommentList = this.loadedCommentList.concat(result.data);
                }

                if (result.data.length < result.meta.per_page) {
                  this.nextPage = 0;
                } else {
                  this.nextPage = Math.floor(this.commentList.length / result.meta.per_page) + 1;
                }

                return result;
              });
        }

        return null;
      }
    },

    created() {
      window.addEventListener('scroll', this.windowScrollHandler);
      // this.deletedCommentsIds = [];
      // this.$on('commentDeletedError', this.commentDeletedErrorHandler);
    },

    destroyed () {
      window.removeEventListener('scroll', this.windowScrollHandler);
    },

    mounted() {
      this.loadComments().then((result) => {
        this.initialized = true;
      });
    }
  };
</script>

<style lang="scss">
$dxCommentsPhotoWidth: 120px;

.dx-comments {
  .dx-comments__photo {
    float: left;
    width: $dxCommentsPhotoWidth;

    img {
      width: $dxCommentsPhotoWidth;
      height: $dxCommentsPhotoWidth;
    }
  }

  .dx-comments__body {
    margin-left: $dxCommentsPhotoWidth + 20px;
  }

  .dx-comments__form-text {
    padding-top: 0;

    label {
      top: 13px !important;
    }

    div.input-group__input {
      border: 1px solid #c0c0c0 !important;
    }
  }

  .dx-comments__text {
    color: rgba(0,0,0,.87);
  }

  .dx-comments__button {
    cursor: pointer;

    .dx-comments__button-icon {
      font-size: 12px;
      vertical-align: baseline;
    }
  }

  .dx-comments__form-button {
    height: 24px;
    font-size: 12px;
    margin-left: 0;
  }
}
</style>