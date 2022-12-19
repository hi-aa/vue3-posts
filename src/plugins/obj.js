const objPlugins = {
	install(app, options) {
		console.log('objPlugins: ', app, options);
		// 전역 컴포넌트 추가: app.component()
		// 전역 애플리케이션 인스턴트에 속성 추가: app.config.globalProperties
		// 커스텀 디렉티브 추가: app.directive
		// 리소스 추가: app.provide
	},
};
export default objPlugins;
