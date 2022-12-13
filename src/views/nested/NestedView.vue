<template>
	<div>
		<ul class="nav nav-pills">
			<li class="nav-item">
				<!-- RouterLink to 속성을 쓰면 중첩라우트 뷰도 히스토리에 똑같이 쌓이므로
				replace: true로 주기 // 현재 페이지 컴포넌트를 대체함 (해당 페이지는  히스토리에 여러게 쌓이지 않음)-->
				<!-- <RouterLink to="/nested/one" class="nav-link" active-class="active"> -->
				<RouterLink
					:to="{ name: 'NestedOne', replace: true }"
					class="nav-link"
					active-class="active"
				>
					Nested one
				</RouterLink>
			</li>
			<li class="nav-item">
				<RouterLink
					:to="{ name: 'NestedTwo', replace: true }"
					class="nav-link"
					active-class="active"
				>
					Nested Two
				</RouterLink>
			</li>
		</ul>

		<hr class="my-4" />
		<!-- 중첩된 페이지 표시하기 위한 라우터 뷰 -->
		<RouterView> </RouterView>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
