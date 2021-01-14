<template>
  <div class="slider shadow bg-dark">
    <div id="slider-container" class="slider-container" :style="'max-height: ' + height + 'px; min-height: ' + height + 'px;'">
      <div v-if="!enabled" class="white--text empty-text">{{ emptyText }}</div>
      <template v-else>
        <img @click="$root.gallery__showSeveral(items, index, false)" :style="'max-height: ' + height + 'px; min-height: ' + height + 'px;'"
           v-for="(item, index) in items" :key="item.id" :src="item.src" :class="['slider-image right-margin', { 'left-margin': index === 0 }]"/>
      </template>
    </div>
    <div @click="scrollLeft" class="slider-button slider-button-big slider-nav slider-nav-left">
        <i class="bi-chevron-left"></i>
    </div>
    <div @click="scrollRight" class="slider-button slider-button-big slider-nav slider-nav-right">
        <i class="bi-chevron-right"></i>
    </div>
    <div style="text-align: center;">
<!--      <v-progress-linear v-show="showProgress" color="white" background-color="grey" height="5" :indeterminate="true"></v-progress-linear>-->
      <template v-if="!loading">
        <span @click="scrollPage(page)" class="slider-button slider-button-small mx-2" v-for="page in pagesCount" :key="page">
          <i :style="`color: ${getPageBtnColor(page)}`" class="bi-circle"></i>
        </span>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OmxSlider',

    data() {
      return {
        containerElement: null,
        currTranslate: 0,
        const: {
          MARGIN: 16,
          SCROLL_MULTIPLIER: 0.2,
        },
        widthVisible: null,
        widthTotal: null,
        loading: true,
        pageIndex: 1,
      };
    },

    props: {
      items: { type: Array, default() { return []; } },
      height: { type: Number, required: true },
      emptyText: { type: String, default: '' },
    },

    computed: {
      showProgress() {
        return this.enabled && this.loading;
      },

      itemsCount() {
        return this.items.length;
      },

      enabled() {
        return this.itemsCount > 0;
      },

      chevronScrollValue() {
        return Math.round(this.const.SCROLL_MULTIPLIER * this.widthVisible);
      },

      pagesCount() {
        if (!this.enabled) {
          return 1;
        }

        if (this.widthVisible && this.widthTotal) {
          return Math.ceil(this.widthTotal / this.widthVisible);
        }

        return 0;
      },

      translatePosEnd() {
        return this.widthTotal - this.widthVisible;
      },
    },

    methods: {
      getPageBtnColor(page) {
        return (page === this.pageIndex) ? 'white' : 'grey';
      },

      translate() {
        this.containerElement.style.transform = 'translateX(-' + this.currTranslate + 'px)';
      },

      scrollLeft() {
        if (this.enabled) {
          this.currTranslate -= this.chevronScrollValue;
          if (this.currTranslate < 0) {
            this.currTranslate = 0;
          }
          this.pageIndex = this.evalCurrPageIndex();
          this.translate();
        }
      },

      scrollRight() {
        if (this.enabled) {
          this.currTranslate += this.chevronScrollValue;
          if (this.currTranslate > this.translatePosEnd) {
            this.currTranslate = this.translatePosEnd;
          }
          this.pageIndex = this.evalCurrPageIndex();
          this.translate();
        }
      },

      scrollPage(page) {
        if (this.enabled) {
          this.pageIndex = page;
          this.currTranslate = (page === this.pagesCount) ? this.translatePosEnd : (page - 1) * this.widthVisible;
          this.translate();
        }
      },

      evalCurrPageIndex() {
        if (this.currTranslate === this.translatePosEnd) {
          return this.pagesCount;
        }

        return Math.floor(this.currTranslate / this.widthVisible) + 1;
      },

      loadImageData() {
        let images = Array.from(document.getElementsByClassName('slider-image'));
        let loading = false;
        images.forEach((item, i, arr) => {
          if (!item.width) {
            loading = true;
          }
        });
        if (loading) {
          setTimeout(this.loadImageData, 100);
        } else {
          this.loading = false;
          this.widthTotal = this.containerElement.scrollWidth;
        }
      }
    },

    mounted() {
      this.loading = true;
      setTimeout(() => {
        this.containerElement = document.getElementById('slider-container');
        this.widthVisible = this.containerElement.clientWidth;
        this.loadImageData();
      }, 0);
    }
  };
</script>

<style scoped lang="scss">
    .slider {
        width: 100%;
        overflow: hidden;
        padding: 10px 0;
        position: relative;

        .slider-container {
            text-align: center;
            white-space: nowrap;

            .empty-text {
                width: 100%;
                position: absolute;
                text-align: center;
                top: 50%;
                transform: translateY(calc(-50% - 20px));
            }

            .slider-image {
                cursor: pointer;
            }

            .left-margin {
                margin-left: 16px;
            }

            .right-margin {
                margin-right: 16px;
            }
        }

        .slider-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }

        .slider-nav-left {
            left: 20px;

            i {
                margin-left: 3px;
            }
        }

        .slider-nav-right {
            right: 20px;

            i {
                margin-left: 3px;
            }
        }

        .slider-button {
            color: white;
            cursor: pointer;
            line-height: 1;

            &:hover {
                background-color: #343a40;
                -webkit-border-radius: 50%;
                -moz-border-radius: 50%;
                border-radius: 50%;
            }
        }

        .slider-button-big {
            width: 40px;
            height: 40px;
            font-size: 30px;
        }

        .slider-button-small {
            width: 20px;
            height: 20px;
            font-size: 15px;
        }
    }
</style>
