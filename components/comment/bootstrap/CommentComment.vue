<template>
  <div class="dx-comments__comment clear-fix">
    <div class="dx-comments__photo">
      <img :src="commentData.user.avatar"/>
    </div>

    <div class="dx-comments__body">
      <div class="subheading">
        <span style="vertical-align: middle;" v-if="currentUserOwner"><i class="bi-bookmark-fill"></i></span>
        <span style="vertical-align: middle;" :class="['primary--text', { 'ml-1' : currentUserOwner }]">{{ commentData.user.displayName }}</span>
        <span class="ml-1"><i class="bi-circle" style="font-size: 12px;"></i></span>
        <span style="vertical-align: middle;" class="ml-1 caption">{{ commentData.commentedAtStr }}</span>
      </div>

      <div v-if="!editMode" class="body-1 dx-comments__text">{{ commentData.text }}</div>
      <div v-else>
        <textarea class="dx-comments__form-text" rows="3" :label="t('formLabelEdit')" v-model="commentText"></textarea>
        <button @click="commentUpdate" :loading="loading" color="blue-grey" class="dx-comments__form-button">{{ t('buttonSave') }}</button>
        <button @click="cancelEdit" class="dx-comments__form-button">{{ t('buttonCancel') }}</button>
      </div>

      <div class="body-1">
        <comment-like :model-data="commentData"></comment-like>

        <span @click="showReplyForm" class="dx-comments__button ml-3">
          {{ t('buttonReply') }}
          <i class="bi-reply dx-comments__button-icon ml-1"></i>
        </span>

        <template v-if="currentUserOwner">
          <span @click="showEdit" class="dx-comments__button ml-3">
            {{ t('buttonEdit') }}
            <i class="bi-pencil dx-comments__button-icon ml-1"></i>
          </span>
          <span @click="commentDelete" class="dx-comments__button ml-3">
            {{ t('buttonRemove') }}
            <i class="bi-trash dx-comments__button-icon ml-1"></i>
          </span>
        </template>
      </div>

      <template v-if="$root.auth__loggedIn">
        <comment-form
          v-if="replyFormVisible"
          @commentStored="commentStoredHandler"
          :show-close-button="true"
          @commentFormClosed="replyFormClosedHandler"
          :commentable-id="commentData.id"
          :commentable-type="commentData.class">
        </comment-form>
      </template>

      <div class="pt-3" v-else-if="replyFormVisible">
        <comment-sign-in :url-login="urlLogin"></comment-sign-in>
      </div>
    </div>
  </div>
</template>

<script>
  import CommentMixin from '../__mixins/comment';
  import CommentForm from './CommentForm.vue';
  import CommentLike from './CommentLike.vue';
  import CommentSignIn from './CommentSignIn.vue';
  import TranslateMixin from '../../../mixins/translate';

  export default {
    name: 'OmxCommentComment',
    components: { CommentForm, CommentLike, CommentSignIn },
    mixins: [CommentMixin, TranslateMixin],

    data() {
      return {
        translate__ns: {
          default: 'app.components.dxComments',
        },
        replyFormVisible: false,
        editMode: false,
        commentText: null,
      };
    },

    props: {
      urlLogin: { type: String, required: true },
      commentData: { type: Object, required: true },
    },

    computed: {
      currentUserOwner() {
        return this.$root.auth__loggedIn && (this.$root.DataUser.id === this.commentData.user.id);
      },
    },

    methods: {
      showReplyForm() {
        this.replyFormVisible = true;
      },

      replyFormClosedHandler() {
        this.replyFormVisible = false;
      },

      showEdit() {
        if (!this.editMode) {
          this.editMode = true;
          this.commentText = this.commentData.text;
        }
      },

      cancelEdit() {
        this.editMode = false;
        this.commentText = null;
      },

      commentStoredHandler(data) {
        this.replyFormVisible = false;
        this.commentData.comments.unshift(data);
      },

      commentUpdate() {
        if (this.commentText) {
          if (this.commentText === this.commentData.text) {
            this.cancelEdit();
          } else {
            this.updateIt(this.commentData.id, this.commentText)
              .then((result) => {
                if (result) {
                  this.commentData.text = result.data.text;
                  this.cancelEdit();
                }
              });
          }
        }
      },

      commentDelete() {
        this.tryDeleteComment(this.commentData.id);
      }
    },

    created() {
      this.commentText = null;
    }
  };
</script>
