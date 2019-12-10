<template>
  <svg v-if="visible" class="indicator" height="16" width="16">
    <circle cx="8" cy="8" r="8" :fill="fill" />
  </svg>
</template>

<script>
export default {
  props: {
    fill: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    }
  },
}
</script>

<style scoped>
.visible {
  visibility: visible;
}
.hidden {
  visibility: hidden;
}
</style>
