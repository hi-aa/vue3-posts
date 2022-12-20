import dayjs from 'dayjs';

export default {
	install(app) {
		// 플러그인 전역 설정해서 추가
		app.config.globalProperties.$dayjs = dayjs;
		app.provide('dayjs', dayjs);
	},
};
