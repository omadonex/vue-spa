<template>
    <div id="modalGallery" class="modal">
        <div class="modal-dialog modal-dialog-centered" style="max-width: 90vw;">
            <div class="modal-content">
                <div class="gallery">
                    <div class="gallery__content">
                        <div v-if="currImage" class="gallery__img-wrap" @click="imageClick" @mousemove="imageMouseMove">
                            <img :src="currImage.src"  class="gallery__img"/>
                            <template v-if="haveMoreThanOneImage">
<!--                                <v-icon v-show="prevArrowVisible" class="arrow arrowLeft" x-large color="white">mdi-chevron-left</v-icon>-->
<!--                                <v-icon v-show="nextArrowVisible" class="arrow arrowRight" x-large color="white">mdi-chevron-right</v-icon>-->
                            </template>
                        </div>
                        <div class="gallery__buttons pa-3 white--text">
<!--                            <v-layout>-->
<!--                                <v-flex d-flex xl6>-->
<!--                                    <span class="text-xs-left">Всего изображений: {{ $root.Data__gallery.imageIndex + 1 }} из {{ countImages }}</span>-->
<!--                                </v-flex>-->
<!--                                &lt;!&ndash;<v-flex d-flex xl6>&ndash;&gt;-->
<!--                                &lt;!&ndash;<span class="text-xs-right">Всего изображений: 1 из 1</span>&ndash;&gt;-->
<!--                                &lt;!&ndash;</v-flex>&ndash;&gt;-->
<!--                            </v-layout>-->
                        </div>
                    </div>
<!--                    <div v-if="$root.Data__gallery.fullMode" class="gallery__sidebar">-->
<!--                        <div class="gallery__sidebar-scrollable">-->
<!--                            <div style="background: #fafbfc;" class="pa-3 clear-fix">-->
<!--                                <div style="width: 48px; float: left">-->
<!--                                    <v-avatar>-->
<!--                                        <img src="/img/teachers/1/square-small.jpg">-->
<!--                                    </v-avatar>-->
<!--                                </div>-->
<!--                                <div style="margin-left: 48px;" class="pl-3 py-1">-->
<!--                                    Полина Харибова<br/>-->
<!--                                    <span style="color: #939699;">2 июля 2018г.</span>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <div class="px-3 py-1" style="border-bottom: 1px solid #fafbfc;">-->
<!--                                &lt;!&ndash;<dx-like small left no-caption :model-data="$root.MainData.lesson.data"></dx-like>-->
<!--                                <dx-share small no-caption :model-data="$root.MainData.lesson.data"></dx-share>&ndash;&gt;-->
<!--                            </div>-->
<!--                            <div class="px-3 py-1">-->
<!--                                <div v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]" :key="item">-->
<!--                                    jasdhfjk has fjksdhfjk ahsfjk ashjkf hasjkfh asjkfh asjkfh asjkfh kasjfh asjkfh asjkfh kasj-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <div class="gallery__sidebar-form">-->
<!--                            <div class="pa-3">-->
<!--                                <div style="position: relative;" class="comment__form">-->
<!--                                    <v-textarea-->
<!--                                        class="ma-0"-->
<!--                                        :solo="commentForm.full"-->
<!--                                        @click="commentFormClick"-->
<!--                                        style="padding-left: 35px;"-->
<!--                                        no-resize hide-details-->
<!--                                        :placeholder="commentFormPlaceholder"-->
<!--                                        :rows="commentForm.rows"-->
<!--                                        v-model="commentForm.text">-->
<!--                                    </v-textarea>-->
<!--                                    <div v-if="commentForm.full" class="text-xs-right">-->
<!--                                        <v-btn small @click="commentFormCancelClick">Cancel</v-btn>-->
<!--                                        <v-btn small class="mr-0 white&#45;&#45;text" color="blue-grey">Post</v-btn>-->
<!--                                    </div>-->
<!--                                    <v-avatar style="position: absolute; top: 3px; left: 0" size="28">-->
<!--                                        <img src="/img/teachers/1/square-small.jpg">-->
<!--                                    </v-avatar>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'OmxGallery',

    data() {
      return {
        prevArrowVisible: false,
        nextArrowVisible: false,

        commentForm: {
          full: false,
          rows: 1,
          text: null,
        },
      };
    },

    computed: {
      commentFormPlaceholder() {
        return this.commentForm.full ? undefined : 'Place your comment';
      },

      haveMoreThanOneImage() {
        return (this.countImages > 1);
      },

      countImages() {
        return this.$root.Data__gallery.images.length;
      },

      currImage() {
        if (this.countImages > 0) {
          return this.$root.Data__gallery.images[this.$root.Data__gallery.imageIndex];
        }

        return null;
      },

      show() {
        return this.$root.Data__gallery.show;
      }
    },

    methods: {
      commentFormClick(event) {
        this.commentForm.full = true;
        this.commentForm.rows = 4;
      },

      commentFormCancelClick(event) {
        this.commentForm.full = false;
        this.commentForm.rows = 1;
        this.commentForm.text = null;
      },

      imageMouseMove(event) {
        if (event.offsetX < 0.3*event.srcElement.offsetWidth) {
          this.prevArrowVisible = true;
          this.nextArrowVisible = false;
        } else {
          this.prevArrowVisible = false;
          this.nextArrowVisible = true;
        }
      },

      imageClick(event) {
        if (event.offsetX < 0.3*event.srcElement.offsetWidth) {
          this.prevImage();
        } else {
          this.nextImage();
        }
      },

      prevImage() {
        let imageIndex = this.$root.Data__gallery.imageIndex;
        imageIndex -= 1;
        if (imageIndex < 0) {
          imageIndex = this.countImages - 1;
        }
        this.$root.Data__gallery.imageIndex = imageIndex;
      },

      nextImage() {
        let imageIndex = this.$root.Data__gallery.imageIndex;
        imageIndex += 1;
        if (imageIndex > this.countImages - 1) {
          imageIndex = 0;
        }
        this.$root.Data__gallery.imageIndex = imageIndex;
      },
    },

    watch: {
        show: function (val) {
            $('#modalGallery').modal(val ? 'show' : 'hide');
        }
    },

    mounted() {
      this.prevArrowVisible = false;
      this.nextArrowVisible = false;
      this.commentForm.full = false;
      this.commentForm.rows = 1;
      this.commentForm.text = null;

        $('#modalGallery').on('hidden.bs.modal', (e) => {
            this.$root.Data__gallery.show = false;
        });
    }
  };
</script>

<style lang="scss">
  .clear-fix::after, .clear-fix::before {
    content: '';
    display:block;
    height: 0;
  }
  .clear-fix::after {
    clear: both;
  }
  .overlay--active:before {
    opacity: .75;
  }
  .comment__form { //почему то не применяется, надо бы подумать
    textarea {
      margin-top: 0 !important;
    }
  }
</style>

<style scoped lang="scss">
  .gallery {
    display: flex;

    max-width: 95vw;
    height: 90vh;
    min-height: 90vh;
    min-width: 600px;

    .arrow {
      position: absolute;
      top: calc(50% - 24px);
    }
    .arrowLeft {
      left: 48px;
    }
    .arrowRight {
      right: 48px;
    }
  }

  .gallery__content {
    width: 100%;
    height: 100%;
    background: #1e1e1e;
  }

  .gallery__sidebar {
    background: white;
    flex-shrink: 0;
    width: 350px;
    display: flex;
    flex-direction: column;
  }

  .gallery__sidebar-scrollable {
    flex: 1;
    height: 100%;
    overflow-y: auto;
  }

  .gallery__sidebar-form {
    background: #fafbfc;
    flex-shrink: 0;
  }

  .gallery__img-wrap {
    display: flex;
    height: calc(100% - 50px);
    width: auto;
    position: relative;
    cursor: pointer;
  }
  .gallery__buttons {
    height: 50px;
    background: #2d373c;
  }
  .gallery__img {
    display: block;
    max-height: 100%;
    max-width: 100%;
    margin: auto;
  }
</style>
