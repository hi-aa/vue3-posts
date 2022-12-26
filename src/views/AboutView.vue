<template>
	<h2>About View</h2>
	<p>{{ $route.path }}</p>
	<p>{{ $route.name }}</p>
	<button class="btn btn-primary" @click="$router.push('/')">
		Home으로 이동
	</button>

	<hr />
	<h2>Store</h2>
	<p>Counter: {{ store.counter }}</p>
	<p>Counter2: {{ counter }}</p>
	<!-- <p>DoubleCount: {{ store.doubleCount }}</p>
	<p>doubleCountPlusOne: {{ store.doubleCountPlusOne }}</p> -->
	<p>DoubleCount: {{ doubleCount }}</p>
	<p>doubleCountPlusOne: {{ doubleCountPlusOne }}</p>
	<!-- <button @click="store.increment">++</button> -->
	<button @click="increment">++</button>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useCounterStore } from '@/store/counter';
import { storeToRefs } from 'pinia';

const route = useRoute();
console.log(route);

// pinia
const store = useCounterStore();
// 구조분해 할당 시 반응성 끊어짐 => storeToRefs로 반응성 유지
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store);
const { increment } = store;
</script>

<style lang="scss" scoped></style>
