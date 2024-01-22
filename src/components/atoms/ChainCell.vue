<script setup lang="ts">
import ScrollableInput from '@/components/atoms/ScrollableInput.vue';

defineProps(['name', 'count']);
defineEmits(['update:name', 'update:count']);
</script>

<template>
  <div class="cell ingredient">
    <div><input :value="name" @input="$emit('update:name', $event.target.value)" /></div>
    <div>
      <ScrollableInput :value="count" @update:value="$emit('update:count', $event)" :min="0" />
    </div>
  </div>
</template>

<style scoped lang="scss">
input {
  text-align: center;
  width: 100%;
}
.cell {
  > div {
    width: 75%;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 96px;
  border: 1px solid gray;
  border-radius: 50%;
}
</style>
