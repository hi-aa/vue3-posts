<template>
	<h2>게시글 수정</h2>
	<hr class="ay-4" />
	<PostForm
		v-model:title="form.title"
		v-model:content="form.content"
		@submit.prevent="edit"
	>
		<template #actions>
			<button type="button" class="btn btn-outline-dark" @click="goDetailPage">
				취소
			</button>
			<button class="btn btn-primary" @click="edit">저장</button>
		</template>
	</PostForm>

	<AppAlert
		:show="showAlert"
		:message="alertMessage"
		:type="alertType"
	></AppAlert>
</template>

<script setup>
import { getPostById, updatePost } from '@/api/posts';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PostForm from '@/components/posts/PostForm.vue';
import AppAlert from '@/components/AppAlert.vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const form = ref({});

const showAlert = ref(false);
const alertMessage = ref('');
const alertType = ref('');

const fetchPost = async () => {
	try {
		const { data } = await getPostById(id);
		setPost(data);
	} catch (error) {
		console.error(error);
		vAlert('네트워크 오류', 'error');
	}
};
fetchPost();

const setPost = ({ title, content, createdAt }) => {
	form.value.title = title;
	form.value.content = content;
	form.value.createdAt = createdAt;
};

const edit = async () => {
	await updatePost(id, { ...form.value });
	// router.push({ name: 'PostDetail', params: { id } });
	vAlert('수정이 완료되었습니다.', 'success');
};

const vAlert = (message, type = 'error') => {
	showAlert.value = true;
	alertMessage.value = message;
	alertType.value = type;
	setTimeout(() => {
		showAlert.value = false;
	}, 3000);
};

const goDetailPage = () => {
	router.push({
		name: 'PostDetail',
		params: { id },
	});
};
</script>

<style lang="scss" scoped></style>
