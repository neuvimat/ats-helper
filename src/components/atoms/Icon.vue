<script setup lang="ts">
const { width, height, src } = defineProps({
  width: {
    type: [String, Number],
    default: '32px', // Default width if not specified
  },
  height: {
    type: [String, Number],
    default: '32px', // Default height if not specified
  },
  src: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <img :src="src" :width="width" :height="height" alt="Icon" />
</template>

<style scoped>
/* Add your component-specific styles here */
</style>
