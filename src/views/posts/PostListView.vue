<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<form @submit.prevent>
			<div class="row g-3">
				<div class="col">
					<input
						type="text"
						class="form-control"
						v-model="listParams.title_like"
					/>
				</div>
				<div class="col">
					<select class="form-select" v-model="listParams._limit">
						<option value="3">3개씩 보기</option>
						<option value="6">6개씩 보기</option>
						<option value="9">9개씩 보기</option>
					</select>
				</div>
			</div>
		</form>
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

		<nav class="mt-5" aria-label="Page navigation example">
			<ul class="pagination justify-content-center">
				<li class="page-item" :class="{ disabled: !(listParams._page > 1) }">
					<a
						class="page-link"
						href="#"
						aria-label="Previous"
						@click.prevent="listParams._page--"
					>
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				<li
					class="page-item"
					v-for="p in pageCount"
					:key="p"
					:class="{ active: listParams._page === p }"
				>
					<a class="page-link" href="#" @click.prevent="listParams._page = p">
						{{ p }}
					</a>
				</li>
				<li
					class="page-item"
					:class="{ disabled: !(listParams._page < pageCount) }"
				>
					<a
						class="page-link"
						href="#"
						aria-label="Next"
						@click.prevent="listParams._page++"
					>
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>
		<!-- <hr class="my-4" />
		<AppCard>
			<PostDetailView :id="2"></PostDetailView>
		</AppCard> -->
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
// import PostDetailView from '@/views/posts/PostDetailView.vue';
// import AppCard from '@/components/AppCard.vue';
import { getPosts } from '@/api/posts.js';
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const posts = ref([]);

const listParams = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 3,
	title_like: '',
});
const totalCount = ref(0);
const pageCount = computed(() => {
	return Math.ceil(totalCount.value / listParams.value._limit);
});

const fetchPosts = async () => {
	try {
		const { data, headers } = await getPosts(listParams.value);
		// console.dir(headers);
		posts.value = data;
		totalCount.value = headers['x-total-count'];

		// 동일한 방법
		// ({ data: posts.value } = await getPosts());
	} catch (error) {
		console.log(error);
	}
};
// fetchPosts();
watchEffect(fetchPosts);
// watchEffect...!

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
