<template>
	<h2>Home View</h2>
	<p>{{ $route.path }}</p>
	<p>{{ $route.name }}</p>
	<button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>

	<hr />
	<AppGrid :items="items" v-slot="{ item }" col-class="col-6">
		<AppCard>{{ item }}</AppCard>
	</AppGrid>
</template>

<script setup>
import AppCard from '@/components/AppCard.vue';
import AppGrid from '@/components/AppGrid.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const items = ref(['사과', '배', '포도', '딸기']);

const goAboutPage = () => {
	router.push('/about');
};
</script>

<style lang="scss" scoped></style>
