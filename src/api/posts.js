// axios
import { posts } from '.';

export function getPosts(params) {
	return posts.get('/', { params });
}

export function getPostById(id) {
	// return posts.get('/', `/${id}`);
	return posts.get(id); // string이면 그냥 보낼 수 있음 // 둘다 가능
}

export function createPost(data) {
	return posts.post('/', data);
}

export function updatePost(id, data) {
	return posts.put(`/${id}`, data);
}

export function deletePost(id) {
	return posts.delete(`/${id}`);
}
