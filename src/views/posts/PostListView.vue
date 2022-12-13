<template>
	<div>
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
		<!-- <hr class="my-4" />
		<AppCard>
			<PostDetailView :id="2"></PostDetailView>
		</AppCard> -->
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import { getPosts } from '@/api/posts.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const posts = ref([]);
// const fetchPosts = () => {
// 	getPosts()
// 		.then(response => {
// 			console.log(response);
// 			posts.value = response.data;
// 		})
// 		.catch(err => {
// 			console.log(err);
// 		});
// };
const fetchPosts = async () => {
	// const { data } = await getPosts();
	// console.dir(data);
	// posts.value = data;

	// 동일한 방법
	({ data: posts.value } = await getPosts());
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
