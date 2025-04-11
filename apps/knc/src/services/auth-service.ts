import API from '@/utils/API';

export async function getUserInfo() {
  const response = await API.get('https://www.examples.com');
  return await response.data;
}
