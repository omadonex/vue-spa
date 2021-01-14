export default {
  data() {
    return {
      translate__ns: {
        default: 'app.components.dxLike',
      },
      cnt: this.modelData.likes.count,
      enabled: this.modelData.likes.can,
    };
  },

  props: {
    modelData: { type: Object, required: true },
  },

  computed: {
    likesEnabled() {
      return this.$root.auth__loggedIn && this.enabled;
    },
  },

  methods: {
    likeIt() {
      this.cnt += 1;
      this.enabled = false;

      const url = this.$root.route('api.v1.content.like.store').url();

      const requestParams = {
        likeableId: this.modelData.id,
        likeableType: this.modelData.class,
        lang: this.$root.DataLang.currLang,
        userId: this.$root.DataUser.id,
      };

      return this.$root.smartAjax__call({
        callingObject: this,
        method: 'post',
        url: url,
        params: requestParams,
      })
        .then((result) => {
          if (result === null) {
            this.cnt -= 1;
            this.enabled = true;
          }
        });
    },
  }
}

