<template>
	<h2>{{ form.title }}</h2>
	<p>{{ form.content }}</p>
	<p class="text-muted">{{ form.createAt }}</p>
	<hr class="ay-4" />
	<div class="row g-2">
		<div class="col-auto">
			<button class="btn btn-outline-dark">이전글</button>
		</div>
		<div class="col-auto">
			<button class="btn btn-outline-dark">다음글</button>
		</div>
		<div class="col-auto me-auto"></div>
		<div class="col-auto">
			<button class="btn btn-outline-dark" @click="goListPage">목록</button>
		</div>
		<div class="col-auto">
			<button class="btn btn-outline-primary" @click="goEditPage">수정</button>
		</div>
		<div class="col-auto">
			<button class="btn btn-outline-danger">삭제</button>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { getPostById } from '@/api/posts.js';
import { useRouter } from 'vue-router';

const router = useRouter();
// const route = useRoute();
// const id = route.params.id;
// => route를 통해 가져오는 값을 props: true로 설정해서 props로 받게 할 수 있음
const props = defineProps({
	id: Number,
});

// ref
// 장) 객체할당 가능
// 단) .value 필요
// reactive
// 장) .value 필요 없음
// 단) 객체 할당 불가능
const form = ref({});

const fetchPost = () => {
	// const data = getPostById(id);
	const data = getPostById(props.id);
	form.value = { ...data }; // 객체 복사해서 대입
	// form을 ref가 아닌 reactive로 만들면
	// 여기서 값 대입 시 reactive 반응형을 잃게 됨 // 속성을 하나하나 대입해서 넣어줘야 함
};
fetchPost();

const goListPage = () => {
	router.push({ name: 'PostList' });
};
const goEditPage = () => {
	router.push({ name: 'PostEdit', params: { id: props.id } });
};
</script>

<style lang="scss" scoped></style>
