<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import FoodConsumptionCalculator from '@/components/molecule/FoodConsumptionCalculator.vue';
import DummyChain from '@/components/molecule/DummyChain.vue';
import { ref } from 'vue';
import DummyChainOrganism from '@/components/organism/DummyChainOrganism.vue';

const chainsNumber = ref(1);
</script>

<template>
  <header>
    <h1>Against the Storm helper</h1>
  </header>
  <section>
    <FoodConsumptionCalculator />
    <DummyChainOrganism />
  </section>

  <RouterView />
</template>

<style scoped></style>
