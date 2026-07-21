import request from '@/services/request';
import { encryptPassword } from '@/utils/crypto';

export interface LoginParams {
  loginName: string;
  password: string;
  platform: string;
  forcedReplacement: number;
  rememberMe: number;
}

export interface LoginResult {
  token: string;
}

export function login(params: LoginParams): Promise<LoginResult> {
  const encrypted = encryptPassword(params.password);
  return request.post('/iam/api/auth/login', {
    ...params,
    password: encrypted,
  });
}

/**
 * Handle login with forced-replacement conflict.
 * If the server returns AUTH_CONFLICT_LOGING, prompt the user and retry with forcedReplacement=1.
 */
export async function loginWithConflictRetry(params: LoginParams): Promise<LoginResult> {
  try {
    const result = await login(params);
    localStorage.setItem('token', result.token);
    return result;
  } catch (error: unknown) {
    const err = error as { response?: { data?: { code?: string } } };
    if (err?.response?.data?.code === 'AUTH_CONFLICT_LOGIN') {
      const confirmed = window.confirm('该账号已在其他地方登录，是否强制登录？');
      if (confirmed) {
        const result = await login({ ...params, forcedReplacement: 1 });
        localStorage.setItem('token', result.token);
        return result;
      }
    }
    throw error;
  }
}
