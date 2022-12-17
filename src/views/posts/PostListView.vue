<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<PostFilter
			v-model:title="listParams.title_like"
			v-model:limit="listParams._limit"
		></PostFilter>

		<hr class="ay-4" />
		<AppGrid :items="posts">
			<template v-slot="{ item }">
				<PostItem
					:title="item.title"
					:content="item.content"
					:created-at="item.createdAt"
					@click="goPage(item.id)"
				></PostItem>
			</template>
		</AppGrid>

		<AppPagination
			:current-page="listParams._page"
			:page-count="pageCount"
			@page="page => (listParams._page = page)"
		>
		</AppPagination>
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
import AppGrid from '@/components/AppGrid.vue';
import { getPosts } from '@/api/posts.js';
import { ref, computed, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import AppPagination from '@/components/posts/AppPagination.vue';
import PostFilter from '@/components/posts/PostFilter.vue';

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
