import { Races } from '@/data/races';
import { Needs, NeedType } from '@/data/needs';
import { invert } from 'lodash';

export const ServiceByRace = Object.fromEntries(
  Object.entries(Races).map(([race, value]) => {
    const index = Object.fromEntries(
      value.needs.filter((need) => need.type === NeedType.SERVICE).map((o) => [o.id, o])
    );
    return [race, index];
  })
);

export const HousingByRace = Object.fromEntries(
  Object.entries(Races).map(([race, value]) => {
    const index = Object.fromEntries(
      value.needs.filter((need) => need.type === NeedType.HOUSING).map((o) => [o.id, o])
    );
    return [race, index];
  })
);

export const FoodByRace = Object.fromEntries(
  Object.entries(Races).map(([race, value]) => {
    const index = Object.fromEntries(
      value.needs.filter((need) => need.type === NeedType.COMPLEX_FOOD).map((o) => [o.id, o])
    );
    return [race, index];
  })
);

function invertIndex(index) {
  const newIndex = {};
  for (const race in index) {
    for (const need in index[race]) {
      if (!newIndex[need]) {
        newIndex[need] = [];
      }
      newIndex[need].push(race);
    }
  }
  return newIndex;
}

export const RaceByFood = invertIndex(FoodByRace);
export const RaceByService = invertIndex(ServiceByRace);
export const RaceByHousing = invertIndex(HousingByRace);
