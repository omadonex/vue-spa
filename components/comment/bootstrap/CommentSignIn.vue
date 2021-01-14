<template>
  <p class="subheading">
<!--    <router-link :to="{ name: 'login'}" class="dx-router-link">-->
<!--      {{ t('enterLabel') }}-->
<!--    </router-link>-->
    <i class="bi-box-arrow-in-right" style="vertical-align: top;"></i>
  </p>
</template>

<script>
  import TranslateMixin from '../../../mixins/translate';

  export default {
    name: 'OmxCommentSignIn',
    mixins: [TranslateMixin],

    data() {
      return {
        translate__ns: {
          default: 'app.components.dxComments',
        },
      };
    },
  };
</script>
