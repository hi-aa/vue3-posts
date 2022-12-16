<template>
	<h2>게시글 등록</h2>
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
				@click="goListPage"
			>
				목록
			</button>
			<button class="btn btn-primary" @click="savePost">저장</button>
		</div>
	</form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';

const router = useRouter();
const form = ref({
	title: '',
	content: '',
});

const goListPage = () => {
	router.push({
		name: 'PostList',
	});
};

const savePost = () => {
	try {
		const today = new Date();
		const todayFormat = [
			today.getFullYear(),
			(today.getMonth() + 1 + '').padStart(2, '0'),
			(today.getDate() + '').padStart(2, '0'),
		].join('-');

		const data = {
			...form.value,
			// createdAt: Date.now(),
			createdAt: todayFormat,
		};
		createPost(data);
		router.push({ name: 'PostList' });
	} catch (error) {
		console.log(error);
	}
};
</script>

<style lang="scss" scoped></style>
