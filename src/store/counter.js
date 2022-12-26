import { defineStore } from 'pinia';

// naming은 use로 짓기
// defineStore의 첫번째 변수가 id
export const useCounterStore = defineStore('counter', {
	state: () => ({
		counter: 1,
	}),
	getters: {
		doubleCount: state => state.counter * 2,
		doubleCountPlusOne() {
			return this.doubleCount + 1; // 여기서도 this로 접근하려 할 때 화살표 함수 말고..
		},
	},
	actions: {
		increment() {
			// actions에서 화살표 함수를 쓰면 this로 store에 접근할 수 없게 됨
			this.counter++;
		},
	},
});
