<template>
  <span :disabled="!likesEnabled" style="cursor: pointer;" @click="likeIt">
    <i class="bi-hand-thumbs-up" style="font-size: 12px;"></i>
    <span style="vertical-align: middle;">{{ cnt }}</span>
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
