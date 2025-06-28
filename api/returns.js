import api from './api';

// Fetch all returns
export async function fetchReturns() {
  const res = await api.get('/returns');
  return res.data;
}

// Fetch a single return by ID
export async function fetchReturnById(id) {
  const res = await api.get(`/returns/${id}`);
  return res.data;
}

// Create a new return
export async function createReturn(data) {
  const res = await api.post('/returns', data);
  return res.data;
}

// Update a return
export async function updateReturn(id, data) {
  const res = await api.put(`/returns/${id}`, data);
  return res.data;
}

// Delete a return
export async function deleteReturn(id) {
  const res = await api.delete(`/returns/${id}`);
  return res.data;
} 