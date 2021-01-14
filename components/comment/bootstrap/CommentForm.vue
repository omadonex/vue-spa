<template>
  <div class="dx-comments__form clear-fix">
    <div class="dx-comments__photo">
      <img :src="$root.DataUser.avatar"/>
    </div>
    <div class="dx-comments__body">
      <textarea
          class="dx-comments__form-text"
          rows="3"
          :label="t('formLabel')"
          v-model="commentText"
      ></textarea>
      <button
          @click="commentStore" :loading="loading" color="blue-grey"
          class="dx-comments__form-button">
        {{ t('buttonPost') }}
      </button>
      <button v-if="showCloseButton"
          @click="closeForm" :disabled="loading"
          class="dx-comments__form-button">
        {{ t('buttonClose') }}
      </button>
    </div>
  </div>
</template>

<script>
  import CommentMixin from '../mixins/comment';
  import TranslateMixin from '../../../mixins/translate';

  export default {
    name: 'OmxCommentForm',
    mixins: [CommentMixin, TranslateMixin],

    data() {
      return {
        translate__ns: {
          default: 'app.components.dxComments',
        },
        commentText: null,
      };
    },

    props: {
      showCloseButton: { type: Boolean, default: false },
      commentableId: { type: Number, required: true },
      commentableType: { type: String, required: true },
    },

    methods: {
      closeForm() {
        this.commentText = null;
        this.$emit('commentFormClosed');
      },

      commentStore() {
        if (this.commentText) {
          this.commentIt(this.commentableId, this.commentableType, this.commentText)
            .then((result) => {
              if (result) {
                this.commentText = null;
              }
            });
        }
      },
    },

    created() {
      this.commentText = null;
    }
  };
</script>
