<template>
  <p class="subheading">
    <a :href="urlLogin">{{ t('enterLabel')}}</a>
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

    props: {
      urlLogin: { type: String, required: true },
    },
  };
</script>
