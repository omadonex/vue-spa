<template>
    <div class="dx-comments">
        <div v-if="showEmptyText">
            <p class="subheading mb-0">
<!--                <v-icon>mdi-comment-text-multiple-outline</v-icon>-->
                {{ t('emptyLabel') }}
            </p>
        </div>
        <div v-if="topLevel" class="pb-0">
            <comment-form v-if="$root.auth__loggedIn" @commentStored="commentStoredHandler" :commentable-id="modelId" :commentable-type="modelClass"></comment-form>
            <comment-sign-in v-else></comment-sign-in>
        </div>
        <template v-for="comment in finalComments">
            <div :key="'comment_' + comment.id" v-if="deletedCommentsIds.indexOf(comment.id) === -1">
                <div>
                    <div d-flex class="pb-0">
                        <comment-comment
                            :comment-data="comment"
                            @commentDeleted="commentDeletedHandler"
                            @commentDeletedError="commentDeletedErrorHandler">
                        </comment-comment>
                    </div>
                    <div v-if="comment.comments.length > 0" style="margin-left: 100px;">
                        <comment :comments="comment.comments" :model-data="comment" :top-level="false"></comment>
                    </div>
                </div>
            </div>
        </template>
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
        localComments: [],
        deletedCommentsIds: [],
      };
    },

    props: {
      topLevel: { type: Boolean, default: true },
      comments: { type: Array, default() { return []; } },
      url: { type: String, required: true },
      modelId: { type: Number, required: true },
      modelClass: { type: String, required: true },
    },

    computed: {
      finalComments() {
          return this.localComments.concat(this.comments);
      },
      showEmptyText() {
        return this.topLevel && (this.finalComments.length === 0);
      }
    },

    methods: {
      commentStoredHandler(data) {
        this.localComments.unshift(data);
      },

      commentDeletedHandler(commentId) {
        this.deletedCommentsIds.push(commentId);
      },

      commentDeletedErrorHandler(commentId) {
        let index = this.deletedCommentsIds.findIndex((item, i, arr) => {
          return item === commentId;
        });
        this.deletedCommentsIds.splice(index, 1);
      },

      loadComments(page) {
        this.$root.smartAjax__call({
          callingObject: this,
          method: 'get',
          url: this.url,
          params: {
            page: page,
            commentableId: this.modelId,
            commentableType: this.modelClass,
            lang: this.$root.DataLang.currLang
          },
        });
      }
    },

    created() {
      this.localComments = [];
      this.deletedCommentsIds = [];
      this.$on('commentDeletedError', this.commentDeletedErrorHandler);
    },

    mounted() {
      this.loadComments(1);
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