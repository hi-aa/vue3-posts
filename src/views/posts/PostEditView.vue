<template>
	<h2>게시글 수정</h2>
	<hr class="ay-4" />
	<PostForm
		v-model:title="form.title"
		v-model:content="form.content"
		@submit.prevent
	>
		<template #actions>
			<button type="button" class="btn btn-outline-dark" @click="goDetailPage">
				취소
			</button>
			<button class="btn btn-primary" @click="edit">저장</button>
		</template>
	</PostForm>
</template>

<script setup>
import { getPostById, updatePost } from '@/api/posts';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';

const { vAlert, vSuccess } = useAlert();

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const form = ref({});
// const alerts = ref([]);

const fetchPost = async () => {
	try {
		const { data } = await getPostById(id);
		setPost(data);
	} catch (error) {
		// console.error(error);
		vAlert(error.message);
	}
};
fetchPost();

const setPost = ({ title, content, createdAt }) => {
	form.value.title = title;
	form.value.content = content;
	form.value.createdAt = createdAt;
};

const edit = async () => {
	try {
		await updatePost(id, { ...form.value });
		vSuccess('수정이 완료되었습니다.');
		router.push({ name: 'PostDetail', params: { id } });
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

const goDetailPage = () => {
	router.push({
		name: 'PostDetail',
		params: { id },
	});
};
</script>

<style lang="scss" scoped></style>
