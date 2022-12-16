<template>
	<h2>게시글 수정</h2>
	<hr class="ay-4" />
	<form @submit.prevent="">
		<div class="mb-3">
			<label for="title" class="form-label">제목</label>
			<input type="text" class="form-control" id="title" v-model="form.title" />
		</div>
		<div class="mb-3">
			<label for="content" class="form-label">내용</label>
			<textarea
				class="form-control"
				id="content"
				rows="3"
				v-model="form.content"
			></textarea>
		</div>
		<div class="pt-4">
			<button
				type="button"
				class="btn btn-outline-dark me-2"
				@click="goDetailPage"
			>
				취소
			</button>
			<button class="btn btn-primary" @click="edit">저장</button>
		</div>
	</form>
</template>

<script setup>
import { getPostById, updatePost } from '@/api/posts';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const form = ref({});

const fetchPost = async () => {
	try {
		const { data } = await getPostById(id);
		setPost(data);
	} catch (error) {
		console.error(error);
	}
};
fetchPost();

const setPost = ({ title, content, createdAt }) => {
	form.value.title = title;
	form.value.content = content;
	form.value.createdAt = createdAt;
};

const edit = async () => {
	await updatePost(id, { ...form.value });
	router.push({ name: 'PostDetail', params: { id } });
};

const goDetailPage = () => {
	router.push({
		name: 'PostDetail',
		params: { id },
	});
};
</script>

<style lang="scss" scoped></style>
