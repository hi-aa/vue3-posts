<template>
	<h2>게시글 등록</h2>
	<hr class="ay-4" />
	<PostForm
		v-model:title="form.title"
		v-model:content="form.content"
		@submit.prevent
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
import { useAlert } from '@/composables/alert';

const { vAlert, vSuccess } = useAlert();

const router = useRouter();
const form = ref({
	title: null,
	content: null,
});
// const alerts = ref([]);

const goListPage = () => {
	router.push({
		name: 'PostList',
	});
};

const savePost = () => {
	try {
		const data = {
			...form.value,
			createdAt: Date.now(),
			// createdAt: todayFormat,
		};
		createPost(data);
		vSuccess('등록이 완료되었습니다');
		// router.push({ name: 'PostList' });
	} catch (error) {
		// console.log(error);
		vAlert(error.message);
	}
};

// const vAlert = (message, type = 'error') => {
// 	alerts.value.push({ message, type });
// 	setTimeout(() => {
// 		alerts.value.shift();
// 	}, 3000);
// };
// const vSuccess = message => vAlert(message, 'success');
</script>

<style lang="scss" scoped></style>
