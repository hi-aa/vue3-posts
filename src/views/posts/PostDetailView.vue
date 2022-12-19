<template>
	<h2>{{ post.title }}</h2>
	<p>{{ post.content }}</p>
	<p class="text-muted">{{ post.createAt }}</p>
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
			<button class="btn btn-outline-danger" @click="remove">삭제</button>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';
import { deletePost, getPostById } from '@/api/posts.js';
import { useRouter } from 'vue-router';

const router = useRouter();
// const route = useRoute();
// const id = route.params.id;
// => route를 통해 가져오는 값을 props: true로 설정해서 props로 받게 할 수 있음
const props = defineProps({
	id: [String, Number],
});

// ref
// 장) 객체할당 가능
// 단) .value 필요
// reactive
// 장) .value 필요 없음
// 단) 객체 할당 불가능
const post = ref({});

const fetchPost = async () => {
	try {
		const { data } = await getPostById(props.id);
		setPost(data);
	} catch (error) {
		console.error(error);
	}
};
fetchPost();

const setPost = ({ title, content, createdAt }) => {
	post.value.title = title;
	post.value.content = content;
	post.value.createdAt = createdAt;
};

const remove = async () => {
	try {
		if (confirm('삭제하시겠습니까?') === false) return;

		await deletePost(props.id);
		goListPage();
	} catch (error) {
		console.log(error);
	}
};

const goListPage = () => {
	router.push({ name: 'PostList' });
};
const goEditPage = () => {
	router.push({ name: 'PostEdit', params: { id: props.id } });
};
</script>

<style lang="scss" scoped></style>
