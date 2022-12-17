<template>
	<div class="app-alert alert" :class="styleClass" role="alert" v-if="show">
		{{ message }}
	</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	show: {
		type: Boolean,
		default: false,
	},
	message: { type: String, required: true },
	type: {
		type: String,
		default: 'error',
		validator: value => ['success', 'error'].includes(value),
	},
});

const styleClass = computed(() => {
	return props.type === 'error' ? 'alert-danger' : 'alert-success';
});
</script>

<style scoped>
.app-alert {
	position: fixed;
	top: 20px;
	right: 20px;
}
</style>
