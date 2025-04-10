import { getUserInfo } from '@/services/auth';

export function* fetchUserInfo() {
  const aa: Awaited<ReturnType<typeof getUserInfo>> = yield getUserInfo();
  console.log(aa);
}
