<template>
	<h2>게시글 목록</h2>
	<hr class="ay-4" />
	<div class="row g-3">
		<div v-for="post in posts" :key="post.id" class="col-4">
			<PostItem
				:title="post.title"
				:content="post.content"
				:created-at="post.createdAt"
				@click="goPage(post.id)"
			></PostItem>
		</div>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import { getPosts } from '@/api/posts.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const posts = ref([]);
const fetchPosts = () => {
	posts.value = getPosts();
};
fetchPosts();

const router = useRouter();
const goPage = id => {
	// 1. 그냥 url 입력해서 이동하는 방법
	// router.push(`/posts/${id}`);

	// 2. 객체 파라메터로 이동하는 방법
	router.push({
		name: 'PostDetail', // 이름을 가지는 라우트
		params: {
			id,
		},
		// query: { searchText: 'hello' },
		// hash: '#world',
	});
};
</script>

<style lang="scss" scoped></style>
