import axios from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

const defaultConfig = {
	method: 'get',
};
const defaultOptions = {
	immediate: true,
};

// axios 호출 시 공통으로 하는 작업(loading bar, error, result 등등)
export const useAxios = (url, config = {}, options = {}) => {
	const response = ref(null);
	const data = ref(null);
	const error = ref(null);
	const loading = ref(false);

	// 구조분해 할당 시 ref가 아닌 reactive를 사용하면 값을 받긴 하는데 반응성이 끊어짐
	const { params } = config;
	const { onSuccess, onError, immediate } = { ...defaultOptions, ...options };

	const execute = body => {
		data.value = null;
		error.value = null;
		loading.value = true;
		axios(unref(url), {
			...defaultConfig,
			...config,
			// Composable 함수는 반응성에 의존하지 않아도 ref 파라메터를 입력값으로 받을 수 있음
			// 그래서 Composable 함수를 개발하는 경우 입력 파라메터가 ref인 경우를 처리하기 위해 unref를 사용
			params: unref(params),
			data: typeof body === 'object' ? body : {}, // watcheffect인 경우 data 빈값으로 설정
		})
			.then(res => {
				response.value = res;
				data.value = res.data;
				if (onSuccess) {
					onSuccess(res);
				}
			})
			.catch(err => {
				error.value = err;
				if (onError) {
					onError(err);
				}
			})
			.finally(() => {
				loading.value = false;
			});
	};

	// watch를 실행할지 여부
	if (isRef(params) || isRef(url)) {
		watchEffect(execute);
	} else {
		if (immediate) execute();
	}

	return { response, data, error, loading, execute };
};
