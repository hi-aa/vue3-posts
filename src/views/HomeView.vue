<template>
	<h2>Home View</h2>
	<p>{{ $route.path }}</p>
	<p>{{ $route.name }}</p>
	<button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>

	<hr />
	<AppGrid :items="items" v-slot="{ item }" col-class="col-6">
		<AppCard>{{ item }}</AppCard>
	</AppGrid>
	<!-- <hr />
	<h2>전역 config 플러그인</h2>
	<p>{{ $person.name }}</p>
	<p>{{ person.name }}</p> -->
</template>

<script>
export default {
	created() {
		// this로 인스턴스 접근
		// console.log(this.$person.name);
		// this.$person.say();
	},
};
</script>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const items = ref(['사과', '배', '포도', '딸기']);

const goAboutPage = () => {
	router.push('/about');
};

// setup에서 사용하려면 provide/inject로 활용
// const person = inject('person');
// console.log('person: ', person);
</script>

<style lang="scss" scoped></style>
