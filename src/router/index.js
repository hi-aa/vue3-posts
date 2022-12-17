import {
	createRouter,
	// createWebHashHistory,
	createWebHistory,
} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import NotFoundView from '@/components/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'About',
		component: AboutView,
	},
	{
		path: '/posts',
		name: 'PostList',
		component: PostListView,
	},
	{
		path: '/posts/create',
		name: 'PostCreate',
		component: PostCreateView,
	},
	{
		path: '/posts/:id',
		name: 'PostDetail',
		component: PostDetailView,
		props: true, // id를 props로 보낼 수 있음
		// props: route => ({
		// 	id: parseInt(route.params.id), // 속성이나 객체로 넘길수도 있음
		// }),
	},
	{
		path: '/posts/:id/edit',
		name: 'PostEdit',
		component: PostEditView,
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundView,
		// component: () => import('@/components/posts/NotFoundView.vue'),
	},
	{
		path: '/nested',
		name: 'Nested',
		component: NestedView,
		children: [
			// 중첩 라우트
			{
				path: '',
				name: 'NestedHome',
				component: NestedHomeView,
			},
			{
				path: 'one', // 슬러시('/')를 넣으면 절대경로가 됨
				name: 'NestedOne',
				component: NestedOneView,
			},
			{
				path: 'two',
				name: 'NestedTwo',
				component: NestedTwoView,
			},
		],
	},
];

const router = createRouter({
	// 첫번째 인수를 넣으면 url 기본 경로로 동작함
	history: createWebHistory(), // 히스토리 모드로 동작
	// history: createWebHashHistory(), // Hash 모드
	routes,
});

/**
 * SAP페이지
 *
 */

export default router;
