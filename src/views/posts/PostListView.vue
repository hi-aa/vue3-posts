<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />

		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		></PostFilter>

		<hr class="ay-4" />
		<AppLoading v-if="loading" />

		<AppError :message="error.message" v-else-if="error" />

		<template v-else>
			<AppGrid :items="posts">
				<template v-slot="{ item }">
					<PostItem
						:title="item.title"
						:content="item.content"
						:created-at="item.createdAt"
						@click="goPage(item.id)"
						@modal="openModal(item)"
						@preview="selectPreview(item.id)"
					></PostItem>
				</template>
			</AppGrid>

			<AppPagination
				:current-page="params._page"
				:page-count="pageCount"
				@page="page => (params._page = page)"
			/>
		</template>
		<Teleport to="#modal">
			<PostModal
				v-model="show"
				:title="modalTitle"
				:content="modalContent"
				:created-at="modalCreatedAt"
			></PostModal>
		</Teleport>

		<template v-if="previewId">
			<hr class="my-4" />
			<AppCard>
				<PostDetailView :id="previewId" />
			</AppCard>
		</template>
	</div>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostItem from '@/components/posts/PostItem.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();

const previewId = ref(null);
const selectPreview = id => (previewId.value = id);

const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 3,
	title_like: '',
});
const pageCount = computed(() => {
	return Math.ceil(totalCount.value / params.value._limit);
});

// data를 posts에 바로 할당..
const {
	response,
	data: posts,
	error,
	loading,
} = useAxios('/posts', { method: 'get', params });
const totalCount = computed(() => response.value.headers['x-total-count']);

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

// modal
const dayjs = inject('dayjs');
const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');

const openModal = ({ title, content, createdAt }) => {
	show.value = true;
	modalTitle.value = title;
	modalContent.value = content;
	modalCreatedAt.value = dayjs(createdAt).format('YYYY.MM.DD HH:mm:ss');
};
</script>

<style lang="scss" scoped></style>
