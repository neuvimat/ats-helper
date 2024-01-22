<script setup lang="ts">
import { Races } from '@/data/races';
import { computed, reactive, ref } from 'vue';
import { ComplexFoods, Housing, Needs, NeedType, Services } from '@/data/needs';
import Icon from '@/components/atoms/Icon.vue';
import { RaceByFood, ServiceByRace, FoodByRace, HousingByRace, RaceByService, RaceByHousing } from '@/data/dataIndices';
import { useHighlight } from '@/hooks/highlighter';
import { precision } from '@/util/util';

const initialRaceCount: { [X in keyof typeof Races]: number } = Object.keys(Races).reduce((acc, c) => {
  acc[c] = 0;
  return acc;
}, {});

function scroll(e: WheelEvent, k: keyof typeof Races) {
  e.preventDefault();
  const shiftMultiplier = e.shiftKey ? 5 : 1;
  raceCount[k] = Math.max(0, raceCount[k] + Math.sign(-e.deltaY) * shiftMultiplier);
}

const raceCount = reactive(initialRaceCount);

function computeWithRace(raceCount, index1, index2) {
  const entries = Object.keys(index1)
    .map((index1Key) => {
      return [
        index1Key,
        index2[index1Key]
          .map((race) => raceCount[race] * (1 / ((Races[race].restPeriodSec + additionalRestDelay.value) / 60)))
          .reduce((acc, p) => acc + p, 0),
      ];
    })
    .map(([k, v]) => {
      return [k, Math.round(v * 100) / 100];
    });

  return Object.fromEntries(entries);
}

const foodResult = computed(() => {
  return computeWithRace(raceCount, ComplexFoods, RaceByFood);
});
const serviceResult = computed(() => {
  return computeWithRace(raceCount, Services, RaceByService);
});
const housingResult = computed(() => {
  const tmp = {};
  for (const housing in RaceByHousing) {
    tmp[housing] = 0;
    RaceByHousing[housing].forEach((race) => (tmp[housing] += 0.5 * raceCount[race]));
  }
  tmp['house'] /= 1.5;
  return tmp;
});

const additionalRestDelay = ref(10);

const { isHighlighting, highlights, removeHighlight, setHighlight, toggleHighlight, addHighlight, clx, clsx, set } =
  useHighlight();

const highlightedRaces = ref(new Set<keyof typeof Races>());
function highlightRace(race: keyof typeof Races) {
  if (highlightedRaces.value.has(race)) {
    highlightedRaces.value.delete(race);
    removeRacialHighlights(race);
    for (const r of highlightedRaces.value.values()) {
      addRacialHighlights(r);
    }
  } else {
    highlightedRaces.value.add(race);
    addRacialHighlights(race);
  }
}
function addRacialHighlights(race: keyof typeof Races) {
  addHighlight(...Object.values(Races[race].needs).map((need) => need.id));
}
function removeRacialHighlights(race: keyof typeof Races) {
  removeHighlight(...Object.values(Races[race].needs).map((need) => need.id));
}
</script>

<template>
  <div class="food-consumption-calculator">
    <div class="section">
      <h1>Villagers</h1>
      <div class="race-count">
        <div :key="k" v-for="(v, k) in Races" class="race-count-specific">
          <div>{{ v.name }}</div>
          <div class="image-wrapper" @wheel="scroll($event, k)" :class="{ highlight: highlightedRaces.has(v.id) }">
            <img class="race-image" :src="v.icon" @click="highlightRace(v.id)" />
          </div>
          <div class="needs-wrapper">
            <div class="food-icon-wrapper">
              <span :key="v.id" v-for="v in FoodByRace[k]">
                <Icon height="32" width="32" :src="v.icon" :class="{ ...clsx(v.id) }" @click="toggleHighlight(v.id)"
              /></span>
            </div>
            <div class="need-icon-wrapper">
              <span :key="v.id" v-for="v in ServiceByRace[k]">
                <Icon height="32" width="32" :src="v.icon" :class="{ ...clsx(v.id) }" @click="toggleHighlight(v.id)"
              /></span>
            </div>
            <div class="house-icon-wrapper">
              <span :key="v.id" v-for="v in HousingByRace[k]">
                <Icon height="32" width="32" :src="v.icon" :class="{ ...clsx(v.id) }" @click="toggleHighlight(v.id)"
              /></span>
            </div>
          </div>
          <input type="number" step="1" min="0" v-model="raceCount[k]" @wheel="scroll($event, k)" />
        </div>
      </div>
    </div>
    <div class="section">
      <h1>Additional settings</h1>
      <div class="additional-settings">
        Additional rest delay in seconds:
        <input
          type="number"
          min="0"
          step="1"
          v-model="additionalRestDelay"
          @wheel.prevent="
            additionalRestDelay = Math.max(
              0,
              additionalRestDelay + Math.sign(-$event.deltaY) * ($event.shiftKey ? 5 : 1)
            )
          "
        />
      </div>
    </div>
    <div class="section">
      <h1>Results</h1>
      <div class="result">
        <div>
          <div v-for="(v, k) in foodResult">
            <Icon
              :src="ComplexFoods[k].icon"
              height="48"
              width="48"
              :class="{ ...clsx(k) }"
              @click="toggleHighlight(k)"
            />
            {{ v }}
          </div>
        </div>
        <div>
          <div v-for="(v, k) in serviceResult">
            <Icon :src="Services[k].icon" height="48" width="48" :class="{ ...clsx(k) }" @click="toggleHighlight(k)" />
            {{ v }}
          </div>
        </div>
        <div>
          <div v-for="(v, k) in housingResult">
            <Icon :src="Housing[k].icon" height="48" width="48" :class="{ ...clsx(k) }" @click="toggleHighlight(k)" />
            {{ Math.ceil(v) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.highlight {
  border: 1px solid lime !important;
  box-shadow: lime 0px 0px 5px 0px;
}
input[type='number'] {
  width: 6em;
  font-size: 1.25em;
}
.additional-settings {
  margin: 1em 0;
}
.result {
  font-size: 1.25em;
  > div {
    margin: 1em 0em;
    display: flex;
    > div {
      min-width: 120px;
      margin: 0 0.3em;
    }
  }
  img {
    vertical-align: middle;
    margin-right: 1rem;
  }
}
.needs-wrapper {
  display: flex;
  flex-flow: column;
  align-items: center;
  > div {
    margin: 0.4em 0;
  }
  img {
    vertical-align: middle;
    margin: 1px;
    border: 1px solid gray;
  }
}

.food-consumption-calculator {
  margin: 1em auto;
}
.image-wrapper {
  border-radius: 50%;
  width: 168px;
  height: 168px;
  overflow: hidden;
}
.race-image {
  width: 100%; /* Make the image fill the container horizontally */
  height: 100%; /* Make the image fill the container vertically */
  object-fit: cover;
}
.race-count {
  //justify-content: center;
  display: flex;
  flex-direction: row;
}
.race-count-specific {
  margin: 0 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
