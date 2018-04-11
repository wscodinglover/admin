import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

export function fetch({ page }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}

export function search(params) {
  return request(`/api/users?id=${params}`);
}

export function remove(id) {
  return request(`/api/users/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  return request(`/api/users/${id}`, {
    method: 'PATCH',
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request('/api/users', {
    method: 'POST',
    headers:{"Content-Type":"application/json"},
    body: JSON.stringify(values),
  });
}
