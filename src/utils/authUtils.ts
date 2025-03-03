import { AuthState } from '../types';

// 存储认证状态的本地存储键
const AUTH_STORAGE_KEY = 'auth_state';

// 硬编码的认证凭据
const VALID_USERNAME = 'adminayi';
const VALID_PASSWORD = 'ayi888888';

// 获取认证状态
export const getAuthState = (): AuthState => {
  const authJson = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!authJson) {
    return { isAuthenticated: false, username: null };
  }
  
  try {
    return JSON.parse(authJson);
  } catch (e) {
    console.error('解析认证状态失败', e);
    return { isAuthenticated: false, username: null };
  }
};

// 保存认证状态
export const saveAuthState = (state: AuthState): void => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(state));
};

// 登录
export const login = (username: string, password: string): boolean => {
  // 验证用户名和密码
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    const authState: AuthState = {
      isAuthenticated: true,
      username: username
    };
    saveAuthState(authState);
    return true;
  }
  return false;
};

// 登出
export const logout = (): void => {
  saveAuthState({ isAuthenticated: false, username: null });
};

// 检查是否已认证
export const isAuthenticated = (): boolean => {
  return getAuthState().isAuthenticated;
};