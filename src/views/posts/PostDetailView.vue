<template>
	<h2>게시글 상세</h2>
	<hr class="ay-4" />
	<!-- 경로에 포함되어있는 id를 $route.params를 통해 받을 수 있음 -->
	<p>params: {{ $route.params }}</p>
	<!-- $route.query: querystring 확인 가능
  $route.hash: url 뒤에 #뒤에 붙은 값을 받을 수 있음 -->
	<p>query: {{ $route.query }}</p>
	<p>hash: {{ $route.hash }}</p>
</template>

<script setup></script>

<style lang="scss" scoped></style>
