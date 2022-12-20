import { ref } from 'vue';

// 비지니스 로직 관련된 것은 컴포저블
// composables, hooks 등 폴더 명은 프로젝트에 맞게 생성할 것

const alerts = ref([]);
export function useAlert() {
	const vAlert = (message, type = 'error') => {
		alerts.value.push({ message, type });
		setTimeout(() => {
			alerts.value.shift();
		}, 3000);
	};
	const vSuccess = message => vAlert(message, 'success');
	return {
		alerts,
		vAlert,
		vSuccess,
	};
}
