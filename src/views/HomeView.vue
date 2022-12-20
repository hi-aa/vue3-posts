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

	<hr />
	<h2>{{ position }}</h2>
	<h2>x: {{ x }}, y: {{ y }}</h2>
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
import { ref, reactive, toRef, toRefs } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const items = ref(['사과', '배', '포도', '딸기']);

const goAboutPage = () => {
	router.push('/about');
};

// setup에서 사용하려면 provide/inject로 활용
// const person = inject('person');
// console.log('person: ', person);

const position = reactive({
	x: 100, // reactive 안에 있는 x, y 값을 반응형으로 가져올 때
	y: 1000,
});
// const x = ref(position.x); // 이렇게 쓸 수 없음 그냥 x는 반응형인 별개의 값
// toRef, toRefs를 사용할 수 있음
// const x = toRef(position, 'x'); // position 안에 있는 x와 연결한 반응형 변수
// const y = toRef(position, 'y');
const { x, y } = toRefs(position); // 구조분해 할당..
</script>

<style lang="scss" scoped></style>
