import { Needs } from '@/data/needs';

import humanIcon from '@/assets/images/168px-Human_circle.png';
import beaverIcon from '@/assets/images/168px-Beaver_circle.png';
import lizardIcon from '@/assets/images/168px-Lizard_circle.png';
import harpyIcon from '@/assets/images/168px-Harpy_circle.png';
import foxIcon from '@/assets/images/168px-Fox_circle.png';

export const Resilience = {
  LOW: 0,
  HIGH: 1,
};
export const Races = {
  human: {
    id: 'human',
    name: 'Human',
    restPeriodSec: 120,
    needs: [
      Needs.house,
      Needs.humanHouse,

      Needs.biscuits,
      Needs.pie,
      Needs.porridge,

      Needs.religion,
      Needs.leisure,

      Needs.cloaks,
    ],
    resolveBase: 15,
    resolveStep: 4,
    resilience: Resilience.LOW,
    hungerThreshold: 6,
    icon: humanIcon,
  },
  beaver: {
    id: 'beaver',
    name: 'Beaver',
    restPeriodSec: 120,
    needs: [
      Needs.house,
      Needs.beaverHouse,

      Needs.biscuits,
      Needs.pickles,

      Needs.education,
      Needs.luxury,
      Needs.leisure,

      Needs.cloaks,
    ],
    resolveBase: 10,
    resolveStep: 2,
    resilience: Resilience.LOW,
    hungerThreshold: 6,
    icon: beaverIcon,
  },
  lizard: {
    id: 'lizard',
    name: 'Lizard',
    restPeriodSec: 100,
    needs: [
      Needs.house,
      Needs.lizardHouse,

      Needs.jerky,
      Needs.pickles,
      Needs.pie,
      Needs.skewers,

      Needs.combat,
      Needs.religion,
    ],
    resolveBase: 5,
    resolveStep: 7,
    resilience: Resilience.HIGH,
    hungerThreshold: 12,
    icon: lizardIcon,
  },
  harpy: {
    id: 'harpy',
    name: 'Harpy',
    restPeriodSec: 100,
    needs: [
      Needs.house,
      Needs.harpyHouse,

      Needs.biscuits,
      Needs.jerky,
      Needs.pie,

      Needs.education,
      Needs.treatment,

      Needs.cloaks,
    ],
    resolveBase: 5,
    resolveStep: 3,
    resilience: Resilience.LOW,
    hungerThreshold: 4,
    icon: harpyIcon,
  },
  fox: {
    id: 'fox',
    name: 'Fox',
    restPeriodSec: 120,
    needs: [
      Needs.house,
      Needs.foxHouse,

      Needs.pickles,
      Needs.porridge,
      Needs.skewers,

      Needs.combat,
      Needs.treatment,
      Needs.luxury,
    ],
    resolveBase: 5,
    resolveStep: 5,
    resilience: Resilience.LOW,
    hungerThreshold: 3,
    icon: foxIcon,
  },
} as const;
