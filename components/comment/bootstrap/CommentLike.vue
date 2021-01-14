<template>
  <span>
    <button
        :disabled="!likesEnabled"
        class="ma-0"
        @click="likeIt">
      <i class="bi-hand-thumbs-up" style="font-size: 12px;"></i>
    </button>
    <span>{{ cnt }}</span>
  </span>
</template>

<script>
  import LikeMixin from '../../mixins/like';
  import TranslateMixin from '../../../mixins/translate';

  export default {
    name: 'OmxCommentLike',
    mixins: [LikeMixin, TranslateMixin],
  };
</script>
