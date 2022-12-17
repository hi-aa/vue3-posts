// axios
import { posts } from '.';

export function getPosts(params) {
	return posts.get('/', { params });
}

export function getPostById(id) {
	return posts.get(`/${id}`);
}

export function createPost(data) {
	return posts.post('', data);
}

export function updatePost(id, data) {
	// return posts.put(`/${id}`, data); // 전체 값수정
	return posts.patch(`/${id}`, data); // 일부 값 수정
}

export function deletePost(id) {
	return posts.delete(`/${id}`);
}
