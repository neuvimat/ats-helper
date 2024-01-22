<script setup lang="ts">
import { useAttrs } from 'vue';

const props = defineProps<{ value: String; shiftMultiplier?: Number }>();
const emit = defineEmits(['update:value']);
const attrs = useAttrs();

const wheel = (event) => {
  const { min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, step = 1 } = attrs;

  const rawValue =
    Number(props.value) + Math.sign(-event.deltaY) * step * (event.shiftKey ? props.shiftMultiplier ?? 5 : 1);
  const maxedValue = Math.max(min, rawValue);
  const minnedValue = Math.min(max, maxedValue);

  const arg =
    '' +
    Math.min(
      Math.max(
        min ?? Number.MIN_VALUE,
        Number(props.value) + Math.sign(-event.deltaY) * step * (event.shiftKey ? props.shiftMultiplier ?? 5 : 1)
      ),
      max
    );

  emit('update:value', arg);
};
</script>

<template>
  <input
    v-bind="attrs"
    type="number"
    :value="value"
    @input="$emit('update:value', $event.target.value)"
    @wheel.prevent="wheel($event)"
  />
</template>

<style scoped></style>
