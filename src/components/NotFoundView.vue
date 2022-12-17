<template>
	<h2>Not Found</h2>
	<div class="text-muted">요청한 페이지를 찾을 수 없습니다</div>
	<!-- <p>
		{{ $route.params }}
	</p> -->
	<div class="mt-4">
		<RouterLink to="/">
			<button class="btn btn-primary">Home</button>
		</RouterLink>
	</div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped></style>
