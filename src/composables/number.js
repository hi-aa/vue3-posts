import { computed, unref } from 'vue';

export const useNumber = number => {
	const isOdd = computed(() => unref(number) % 2 === 1);
	const isEven = computed(() => unref(number) % 2 === 0);

	return { isOdd, isEven };
};
