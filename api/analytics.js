import api from './api';

// Fetch analytics stats
export async function fetchAnalyticsStats() {
  const res = await api.get('/analytics/stats');
  return res.data;
}

// Fetch analytics chart data
export async function fetchAnalyticsChart() {
  const res = await api.get('/analytics/chart');
  return res.data;
} 