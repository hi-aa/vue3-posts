<template>
	<!-- Alert을 여러개 호출할 때 -->
	<div class="app-alert">
		<TransitionGroup name="slide">
			<!-- object에서 일부 속성만 빼올 때 구조분해 할당을 쓰나 봄
        const {a, b} = new Object({a: '1', b: 'blabla', c: 'test'} -->
			<div
				v-for="({ message, type }, index) in items"
				:key="index"
				class="alert"
				:class="styleClass(type)"
				role="alert"
			>
				{{ message }}
			</div>
		</TransitionGroup>
	</div>
</template>

<script setup>
defineProps({
	items: { type: Array },
});

const styleClass = type => {
	return type === 'error' ? 'alert-danger' : 'alert-success';
};
</script>

<style scoped>
.app-alert {
	position: fixed;
	top: 20px;
	right: 20px;
}

.slide-enter-from,
.slide-leave-to {
	opacity: 0;
	transform: translateY(-30px);
}
.slide-enter-active,
.slide-leave-active {
	transition: all 0.5s ease;
}
.slide-enter-to,
.slide-leave-from {
	opacity: 1;
	transform: translateY(0px);
}
</style>
