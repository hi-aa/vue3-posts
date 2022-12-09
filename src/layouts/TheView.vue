<template>
	<main>
		<div class="container py-4">
			<!-- router 설정한 파일에서 경로에 맞는 view를 찾아 해당 위치에 넣어줌 -->
			<RouterView></RouterView>
		</div>
	</main>
</template>

<script>
import { RouterView } from 'vue-router';

export default {
	setup() {
		return {};
	},
	components: { RouterView },
};
</script>

<style lang="scss" scoped></style>
