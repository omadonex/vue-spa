export default {
  data() {
    return {
      appFromBrowser: true,
      appLoggedIn: false,
      appSiteUrl: null,
    }
  },

  methods: {
    xSetFromBrowser(value) {
      this.appFromBrowser = value;
    },

    xSetLoggedIn(value) {
      this.appLoggedIn = value;
    },

    xSetSiteUrl(value) {
      this.appSiteUrl = value;
    },
  },
};
