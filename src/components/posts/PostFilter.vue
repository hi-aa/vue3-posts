<template>
	<form @submit.prevent>
		<div class="row g-3">
			<div class="col">
				<input
					type="text"
					class="form-control"
					:value="title"
					@input="changeTitle"
				/>
				<!-- @input="$emit('update:title', $event.target.value)" -->
			</div>
			<div class="col">
				<select
					class="form-select"
					:value="limit"
					@input="$emit('update:limit', $event.target.value)"
				>
					<option value="3">3개씩 보기</option>
					<option value="6">6개씩 보기</option>
					<option value="9">9개씩 보기</option>
				</select>
			</div>
		</div>
	</form>
</template>

<script setup>
defineProps({
	title: String,
	limit: Number,
});
const emit = defineEmits(['update:title', 'update:limit']);

const changeTitle = e => {
	setTimeout(() => {
		emit('update:title', e.target.value);
	}, 500);
};
</script>

<style lang="scss" scoped></style>
