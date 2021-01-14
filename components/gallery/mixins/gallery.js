export default {
  data() {
    return {
      Data__gallery: {
        show: false,
        fullMode: true,
        imageIndex: 0,
        images: [],
      }
    };
  },

  methods: {
    gallery__showSingle(url) {
      this.gallery__showSeveral([
        {
          alt: '',
          src: url,
        },
      ], 0, false);
    },

    gallery__showSeveral(images, imageIndex, fullMode) {
      this.Data__gallery.fullMode = (fullMode !== undefined) ? fullMode : this.Data__gallery.fullMode;
      this.Data__gallery.imageIndex = (imageIndex !== undefined) ? imageIndex : this.Data__gallery.imageIndex;
      this.Data__gallery.images = (images !== undefined) ? images : this.Data__gallery.images;
      this.Data__gallery.show = true;
    },
  },
};
