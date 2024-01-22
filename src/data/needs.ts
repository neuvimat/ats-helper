import { Races } from '@/data/races';
import biscuitsIcon from '@/assets/images/120px-Icon_Resource_Biscuits.png';
import jerkyIcon from '@/assets/images/120px-Icon_Resource_Jerky.png';
import picklesIcon from '@/assets/images/120px-Icon_Resource_PickledGoods.png';
import pieIcon from '@/assets/images/120px-Icon_Resource_Pie.png';
import porridgeIcon from '@/assets/images/120px-Icon_Resource_Porridge.png';
import skewersIcon from '@/assets/images/120px-Icon_Resource_Skewers.png';
import houseIcon from '@/assets/images/Icon_Need_BasicHousing.png';
import humanHouseIcon from '@/assets/images/100px-Icon_Need_HumanHousing.png';
import beaverHouseIcon from '@/assets/images/100px-Icon_Need_BeaverHousing.png';
import lizardHouseIcon from '@/assets/images/Icon_Need_LizardHousing.png';
import harpyHouseIcon from '@/assets/images/100px-Icon_Need_HarpyHousing.png';
import foxHouseIcon from '@/assets/images/100px-Icon_Need_FoxHousing.png';
import leisureIcon from '@/assets/images/60px-Icon_Need_Leisure.png';
import luxuryIcon from '@/assets/images/60px-Icon_Need_Luxury.png';
import combatIcon from '@/assets/images/60px-Icon_Need_Brawling.png';
import religionIcon from '@/assets/images/60px-Icon_Need_Religion.png';
import educationIcon from '@/assets/images/60px-Icon_Need_Education.png';
import treatmentIcon from '@/assets/images/60px-Icon_Need_Treatment.png';
import cloaksIcon from '@/assets/images/120px-Icon_Resource_Coats.png';
import { invert } from 'lodash';

export const NeedType = {
  COMPLEX_FOOD: 0,
  SERVICE: 1,
  HOUSING: 2,
};

export const Needs = {
  biscuits: { id: 'biscuits', type: NeedType.COMPLEX_FOOD, resolve: 5, icon: biscuitsIcon },
  jerky: { id: 'jerky', type: NeedType.COMPLEX_FOOD, resolve: 4, icon: jerkyIcon },
  pickles: { id: 'pickles', type: NeedType.COMPLEX_FOOD, resolve: 8, icon: picklesIcon },
  pie: { id: 'pie', type: NeedType.COMPLEX_FOOD, resolve: 5, icon: pieIcon },
  porridge: { id: 'porridge', type: NeedType.COMPLEX_FOOD, resolve: 4, icon: porridgeIcon },
  skewers: { id: 'skewers', type: NeedType.COMPLEX_FOOD, resolve: 5, icon: skewersIcon },

  house: { id: 'house', type: NeedType.HOUSING, resolve: 3, icon: houseIcon },
  humanHouse: { id: 'humanHouse', type: NeedType.HOUSING, resolve: 3, icon: humanHouseIcon },
  beaverHouse: { id: 'beaverHouse', type: NeedType.HOUSING, resolve: 3, icon: beaverHouseIcon },
  lizardHouse: { id: 'lizardHouse', type: NeedType.HOUSING, resolve: 3, icon: lizardHouseIcon },
  harpyHouse: { id: 'harpyHouse', type: NeedType.HOUSING, resolve: 3, icon: harpyHouseIcon },
  foxHouse: { id: 'foxHouse', type: NeedType.HOUSING, resolve: 4, icon: foxHouseIcon },

  leisure: { id: 'leisure', type: NeedType.SERVICE, resolve: 8, icon: leisureIcon },
  luxury: { id: 'luxury', type: NeedType.SERVICE, resolve: 10, icon: luxuryIcon },
  combat: { id: 'combat', type: NeedType.SERVICE, resolve: 8, icon: combatIcon },
  religion: { id: 'religion', type: NeedType.SERVICE, resolve: 8, icon: religionIcon },
  education: { id: 'education', type: NeedType.SERVICE, resolve: 10, icon: educationIcon },
  treatment: { id: 'treatment', type: NeedType.SERVICE, resolve: 10, icon: treatmentIcon },

  cloaks: { id: 'cloaks', type: NeedType.SERVICE, resolve: 5, icon: cloaksIcon },
} as const;

export const ComplexFoods = Object.fromEntries(
  Object.entries(Needs).filter(([k, v]) => v.type === NeedType.COMPLEX_FOOD)
);

export const Services = Object.fromEntries(Object.entries(Needs).filter(([k, v]) => v.type === NeedType.SERVICE));
export const Housing = Object.fromEntries(Object.entries(Needs).filter(([k, v]) => v.type === NeedType.HOUSING));
