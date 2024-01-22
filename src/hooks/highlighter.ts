import { computed, reactive, ref } from 'vue';
import { forEach } from 'lodash';

export function useHighlight(initialHighlight?: string[]) {
  const highlights = ref(new Set([...(initialHighlight ? initialHighlight : [])]));

  const isHighlighting = computed(() => {
    return !!highlights.value.size;
  });
  const clx = ref({});

  const addHighlight = (...labels: string[]) => {
    labels.forEach((l) => highlights.value.add(l));
  };

  const setHighlight = (...labels: string[]) => {
    highlights.value.clear();
    labels.forEach((l) => highlights.value.add(l));
  };

  const removeHighlight = (...labels: string[]) => {
    labels.forEach((l) => highlights.value.delete(l));
  };

  const toggleHighlight = (...labels: string[]) => {
    labels.forEach((l) => (highlights.value.has(l) ? highlights.value.delete(l) : highlights.value.add(l)));
  };

  const clsx = (label: string, cls: string = 'highlight') => {
    return { [cls]: highlights.value.has(label) };
  };

  return {
    highlights,
    addHighlight,
    setHighlight,
    isHighlighting,
    clx,
    toggleHighlight,
    removeHighlight,
    clsx,
    set: highlights,
  };
}
