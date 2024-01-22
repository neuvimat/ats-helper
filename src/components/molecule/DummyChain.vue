<script setup lang="ts">
import ChainCell from '@/components/atoms/ChainCell.vue';
import { computed, onMounted, ref } from 'vue';
import ScrollableInput from '@/components/atoms/ScrollableInput.vue';
import { precision } from '@/util/util';

const input = ref([
  { name: '', count: 0 },
  { name: '', count: 0 },
  { name: '', count: 0 },
]);
const output = ref({ name: '', count: 0 });
const multiplier = ref(1);
const duration = ref('60');
const result = computed(() => {
  return [
    {
      value: precision(input.value[0].count * (60 / Number(duration.value)) * Number(multiplier.value), 2),
      name: input.value[0].name,
    },
    {
      value: precision(input.value[1].count * (60 / Number(duration.value)) * Number(multiplier.value), 2),
      name: input.value[1].name,
    },
    {
      value: precision(input.value[2].count * (60 / Number(duration.value)) * Number(multiplier.value), 2),
      name: input.value[2].name,
    },
    {
      value: precision(output.value.count * (60 / Number(duration.value)) * Number(multiplier.value), 2),
      name: output.value.name,
    },
  ];
});
const emit = defineEmits(['mount']);

onMounted(() => {
  emit('mount', { input, output, multiplier, duration, result });
});
</script>

<template>
  <div class="chain">
    <div class="align-self-center"><ScrollableInput min="1" step="1" v-model:value="multiplier" /> villagers</div>
    <div class="cell-wrapper">
      <ChainCell v-model:count="input[0].count" v-model:name="input[0].name" />
      <span>{{ result[0].value }}</span>
    </div>
    <div class="cell-wrapper">
      <ChainCell v-model:count="input[1].count" v-model:name="input[1].name" />
      <span>{{ result[1].value }}</span>
    </div>
    <div class="cell-wrapper">
      <ChainCell v-model:count="input[2].count" v-model:name="input[2].name" />
      <span>{{ result[2].value }}</span>
    </div>
    <div class="separator">
      <span> > </span>
    </div>
    <div class="cell-wrapper">
      <ChainCell v-model:count="output.count" v-model:name="output.name" />
      <span>{{ result[3].value }}</span>
    </div>
    <div class="align-self-center">
      <ScrollableInput :input-props="{ type: 'number' }" v-model:value="duration" /> seconds per production
    </div>
  </div>
</template>

<style scoped lang="scss">
.cell-wrapper {
  text-align: center;
}
.align-self {
  align-self: start;
}
.align-self-center {
  align-self: center;
  margin-bottom: 1.55em;
}
.duration {
  align-self: start;
  width: 90px;
}
.chain {
  display: flex;
  gap: 1em;
}
.separator {
  width: 32px;
  font-size: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 1em;
}
.cell {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 96px;
  border: 1px solid gray;
  border-radius: 50%;
}
</style>
