<script setup lang="ts">
import DummyChain from '@/components/molecule/DummyChain.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import { should } from 'vitest';
import { Mod, Moddable } from '@/data/moddable';
import { precision } from '../../util/util';

const chains = ref({});
const expectedDuplicates = {};
let currentId = 1;

function handleMount(data, id) {
  if (expectedDuplicates[id]) {
    const chainToDuplicate = chains.value[expectedDuplicates[id]];
    data.input.value = JSON.parse(JSON.stringify(chainToDuplicate.value.input));
    data.output.value = JSON.parse(JSON.stringify(chainToDuplicate.value.output));
    data.multiplier.value = JSON.parse(JSON.stringify(chainToDuplicate.value.multiplier));
    data.duration.value = JSON.parse(JSON.stringify(chainToDuplicate.value.duration));
    data.result.value = JSON.parse(JSON.stringify(chainToDuplicate.value.result));
    chains.value[id].value = data;
    chains.value[id].name = `Chain #${id}`;
    delete expectedDuplicates[id];
  } else {
    chains.value[id].value = data;
    chains.value[id].name = `Chain #${id}`;
  }
}
function addChain(event) {
  const id = currentId++;
  chains.value[id] = { id };
}

function duplicateChain(chainId) {
  const id = currentId++;
  expectedDuplicates[id] = chainId;
  chains.value[id] = { id };
}

function removeChain(chainId) {
  delete chains.value[chainId];
}

const aggregatedResults = computed(() => {
  const resourceMap = new Map();

  for (const _chain in chains.value) {
    const chain = chains.value[_chain];
    if (!chain.value) continue;
    const chainName = chain.name;
    const { duration, input, output, result } = chain.value;

    for (let i = 0; i < 4; i++) {
      const itemName = result[i].name;
      if (itemName) {
        const v = (resourceMap.get(itemName) as Moddable) ?? new Moddable(itemName, []);
        v.mods.push(new Mod(result[i].value * (i === 3 ? 1 : -1), chainName));
        resourceMap.set(itemName, v);
      }
    }
  }

  for (const [k, v] of resourceMap) {
    v.final = v.mods.reduce((acc, c) => {
      acc += c.value;
      return acc;
    }, 0);
  }

  return resourceMap;
});
</script>

<template>
  <div class="section">
    <h1>Production chains</h1>
    <div><button @click="addChain">Add new chain</button></div>
    <div v-for="ch in chains">
      <h1>{{ ch.name }}</h1>
      <div style="display: flex; gap: 1em">
        <DummyChain :key="ch.id" @mount="handleMount($event, ch.id)" style="flex-grow: 10" />
        <div style="align-self: center; flex-grow: 0; flex-basis: 10em; margin-bottom: 1.5em">
          <button @click="removeChain(ch.id)" style="width: 100%">Delete chain</button>
          <button @click="duplicateChain(ch.id)" style="width: 100%">Duplicate chain</button>
        </div>
      </div>
    </div>
  </div>
  <div class="section results-wrapper">
    <h1>Results</h1>
    <div class="results-wrapper_results">
      <div class="result-wrapper_result" v-for="[k, v] in aggregatedResults" :key="k">
        <span class="name">{{ k }}</span
        >:
        <span :class="{ positive: v.final >= 0, negative: v.final < 0 }">{{ precision(v.final, 2).toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
button {
  font-size: 1em;
}
.positive {
  color: lime;
}
.negative {
  color: red;
}
.name {
  color: gold;
}
.results-wrapper {
  &_results {
    display: flex;
    gap: 1em;
  }
}
</style>
