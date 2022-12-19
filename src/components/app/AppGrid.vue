<template>
	<div class="row g-3">
		<div
			v-for="(item, index) in items"
			:key="index"
			class="col-4"
			:class="colClass"
		>
			<slot :item="item" :index="index"></slot>
			<!-- item, index를 부모에서 v-slot 속성으로 가져다 쓸 수 있는듯 -->
		</div>
	</div>
</template>

<script setup>
defineProps({
	items: {
		type: Array,
		required: true,
	},
	colClass: {
		type: String,
		default: 'col-4',
	},
});
</script>

<style lang="scss" scoped></style>
