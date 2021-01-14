export default {
  data() {
    return {
      loadingComments: false,
    }
  },

  computed: {
    commentListData() {
      let data = [];
      if (this.pageLoader__pageData.hasOwnProperty('commentList')) {
        for (let index in this.pageLoader__pageData.commentList) {
          if (index !== 'meta') {
            data = data.concat(this.pageLoader__pageData.commentList[index]);
          }
        }
      }

      return data;
    },
  },

  methods: {
    loadComments(page, commentableId, commentableType) {
      const query = {};
      query.page = page;
      query.commentableId = commentableId;
      query.commentableType = commentableType;
      query.lang = this.$root.DataLang.currLang;
      const url = this.$root.route('api.v1.content.comment.index').url();
      return this.pageLoader__load({
        url: url,
        propName: 'commentList',
        list: true,
        relations: ['user', 'user.meta'],
        query: query,
        loadingPropName: 'loadingComments',
      });
    },
  },
};
