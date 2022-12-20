<template>
	<h2>게시글 등록</h2>
	<hr class="ay-4" />
	<AppError :message="error.message" v-if="error" />

	<PostForm
		v-model:title="form.title"
		v-model:content="form.content"
		@submit.prevent="savePost"
	>
		<template #actions>
			<button type="button" class="btn btn-outline-dark" @click="goListPage">
				목록
			</button>

			<button class="btn btn-primary" :disabled="loading">
				<template v-if="loading">
					<span
						class="spinner-grow spinner-grow-sm"
						role="status"
						aria-hidden="true"
					></span>
					<span class="visually-hidden">Loading...</span>
				</template>
				<template v-else>저장</template>
			</button>
		</template>
	</PostForm>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const { vAlert, vSuccess } = useAlert();

const router = useRouter();
const form = ref({
	title: null,
	content: null,
});

// const loading = ref(false);
// const error = ref(null);

const goListPage = () => {
	router.push({
		name: 'PostList',
	});
};

const { error, loading, execute } = useAxios(
	`/posts`,
	{
		method: 'post',
		// data: { ...form.value, createdAt: Date.now() },
	},
	{
		immediate: false,

		onSuccess: () => {
			vSuccess('등록이 완료되었습니다');
			router.push({ name: 'PostList' });
		},
		onError: err => {
			vAlert(err.message);
		},
	},
);
const savePost = async () => {
	execute({ ...form.value, createdAt: Date.now() });
};

// const savePost = async () => {
// 	try {
// 		loading.value = true;
// 		const data = {
// 			...form.value,
// 			createdAt: Date.now(),
// 			// createdAt: todayFormat,
// 		};
// 		await createPost(data);
// 		vSuccess('등록이 완료되었습니다');
// 		loading.value = false;

// 		router.push({ name: 'PostList' });
// 	} catch (err) {
// 		// console.log(error);
// 		vAlert(err.message);
// 		error.value = err;
// 	} finally {
// 		loading.value = false;
// 	}
// };

// const vAlert = (message, type = 'error') => {
// 	alerts.value.push({ message, type });
// 	setTimeout(() => {
// 		alerts.value.shift();
// 	}, 3000);
// };
// const vSuccess = message => vAlert(message, 'success');
</script>

<style lang="scss" scoped></style>
