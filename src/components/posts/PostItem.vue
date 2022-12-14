<template>
	<AppCard>
		<template v-slot:header>{{ title }}</template>
		<template>{{ content }}</template>
		<template v-slot:footer>{{ createdAt }}</template>
	</AppCard>
</template>

<script setup>
import AppCard from '../AppCard.vue';

defineProps({
	title: {
		type: String,
		required: true,
	},
	content: {
		type: String,
	},
	createdAt: {
		type: [String, Date, Number],
	},
});
</script>

<style lang="scss" scoped></style>
