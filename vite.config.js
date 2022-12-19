import { fileURLToPath, URL } from 'node:url';
// 컴포넌트를 자동으로 전역으로 설정해줌
import Components from 'unplugin-vue-components/vite';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		Components({
			dirs: ['src/components/app'],
			dts: true, // enabled by default if `typescript` is installed
		}),
	],
	// mode: 'production', // 운영
	// envPrefix: '', // env 파일에 변수 앞에 붙는 VITE_를 수정 가능함
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
