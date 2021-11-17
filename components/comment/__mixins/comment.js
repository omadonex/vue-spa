export default {
  data() {
    return {
      loading: false,
    };
  },

  methods: {
    commentIt(url, commentableId, commentableType, commentText) {
      return this.$root.smartAjax__call({
        callingObject: this,
        method: 'post',
        url: url,
        params: {
          text: commentText,
          commentableId: commentableId,
          commentableType: commentableType,
          lang: this.$root.DataLang.currLang,
          userId: this.$root.DataUser.id,
        },
      })
        .then((result) => {
          if (result) {
            this.$emit('commentStored', result.data);
          }

          return result;
        });
    },

    updateIt(commentId, commentText) {
      const url = this.$root.route('api.v1.content.comment.update', { id: commentId }).url();
      const requestParams = {
        text: commentText,
        lang: this.$root.DataLang.currLang,
        userId: this.$root.DataUser.id,
      };

      return this.$root.smartAjax__call({
        callingObject: this,
        method: 'patch',
        url: url,
        params: requestParams,
      })
        .then((result) => {
          if (result) {
            this.$emit('commentUpdated', result.data);
          }

          return result;
        });
    },

    deleteComment(commentId) {
      const url = this.$root.route('api.v1.content.comment.destroy', { id: commentId }).url();
      const requestParams = {
        lang: this.$root.DataLang.currLang,
        userId: this.$root.DataUser.id,
      };

      return this.$root.smartAjax__call({
        callingObject: this,
        method: 'delete',
        url: url,
        params: requestParams,
      })
        .then((result) => {
          if (result) {
            this.$parent.$emit('commentDeletedSuccess', commentId);
          } else {
            this.$parent.$emit('commentDeletedError', commentId);
          }

          return result;
        });
    },

    tryDeleteComment(commentId) {
      this.$emit('commentDeleted', commentId);
      this.deleteComment(commentId);
    }
  }
}

