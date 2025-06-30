import api from "./api";

// Fetch all items needing image verification
export async function fetchImageVerifications() {
  const res = await api.get("/image-verification");
  return res.data;
}

// Approve an image verification
export async function approveImageVerification(id, comment) {
  const res = await api.post(`/image-verification/${id}/approve`, { comment });
  return res.data;
}

// Reject an image verification
export async function rejectImageVerification(id, comment) {
  const res = await api.post(`/image-verification/${id}/reject`, { comment });
  return res.data;
}
