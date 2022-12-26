<template>
	<AppLoading v-if="loading" />

	<AppError :message="error.message" v-else-if="error" />

	<div v-else>
		<h2>{{ post.title }}</h2>
		<p>{{ props.id }} , isOdd: {{ isOdd }}</p>
		<p>{{ post.content }}</p>
		<p class="text-muted">
			{{ $dayjs(post.createdAt).format('YYYY.MM.DD HH:mm:ss') }}
		</p>
		<hr class="ay-4" />
		<AppError :message="removeError.message" v-if="removeError" />

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
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<!-- <button class="btn btn-outline-danger" @click="remove">삭제</button> -->
				<button
					class="btn btn-outline-danger"
					@click="remove"
					:disabled="removeLoading"
				>
					<template v-if="removeLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							role="status"
							aria-hidden="true"
						></span>
						<span class="visually-hidden">Loading...</span>
					</template>
					<template v-else>삭제</template>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';
import { computed, toRef, toRefs } from 'vue';
import { useNumber } from '@/composables/number';

const { vAlert, vSuccess } = useAlert();

const router = useRouter();
const props = defineProps({
	id: [String, Number],
});

// 조회
const url = computed(() => `/posts/${props.id}`); // id 변경 시 재조회(반응형)
const { data: post, error, loading } = useAxios(url);

// toRef
// const { isOdd } = useNumber(`${props.id}`); // .id로 뽑아냈기 때문에 반응형을 잃음
// const idRef = toRef(props, 'id');

// toRefs
const { id: idRef } = toRefs(props);
const { isOdd } = useNumber(idRef);

// 삭제
const {
	error: removeError,
	loading: removeLoading,
	execute,
} = useAxios(
	`/posts/${props.id}`,
	{ method: 'delete' },
	{
		immediate: false,
		onSuccess: () => {
			vSuccess('삭제가 완료되었습니다');
			goListPage();
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);

const remove = async () => {
	if (confirm('삭제하시겠습니까?') === false) return;
	execute();
};

const goListPage = () => {
	router.push({ name: 'PostList' });
};
const goEditPage = () => {
	router.push({ name: 'PostEdit', params: { id: props.id } });
};

// 경로 변경 시 실행
onBeforeRouteUpdate(() => {
	console.log('onBeforeRouteUpdate');
});
// 페이지를 떠날 때 실행
onBeforeRouteLeave(() => {
	console.log('onBeforeRouteLeave');
});
</script>

<script>
export default {
	// 페이지 진입 시 실행
	beforeRouteEnter() {
		console.log('beforeRouteEnter');
	},
};
</script>

<style lang="scss" scoped></style>
