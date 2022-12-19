<template>
	<h2>게시글 등록</h2>
	<hr class="ay-4" />
	<PostForm
		v-model:title="form.title"
		v-model:content="form.content"
		@submit.prevent="savePost"
	>
		<template #actions>
			<button type="button" class="btn btn-outline-dark" @click="goListPage">
				목록
			</button>
			<button class="btn btn-primary" @click="savePost">저장</button>
		</template>
	</PostForm>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';

const router = useRouter();
const form = ref({
	title: null,
	content: null,
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
