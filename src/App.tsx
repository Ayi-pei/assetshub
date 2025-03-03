import React, { useState, useEffect } from 'react';
import { Link2, QrCode, LogOut } from 'lucide-react';
import ShortLinkForm from './components/ShortLinkForm';
import ShortLinkCard from './components/ShortLinkCard';
import RedirectPage from './components/RedirectPage';
import LoginPage from './components/LoginPage';
import { ShortLink, ShortLinkFormData } from './types';
import {
  createShortLink,
  addLink,
  getLinks,
  refreshQRCode,
  deleteLink,
  processAutoRefreshLinks
} from './utils/shortLinkUtils';
import { isAuthenticated, logout, getAuthState } from './utils/authUtils';

function App() {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [redirectId, setRedirectId] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  
  // 检查是否在重定向页面
  useEffect(() => {
    const path = window.location.pathname;
    if (path.length > 1) {
      const id = path.substring(1); // 移除前导斜杠
      setRedirectId(id);
    }
  }, []);

  // 检查认证状态
  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  // 从localStorage加载链接
  useEffect(() => {
    if (authenticated) {
      setLinks(getLinks());
    }
  }, [authenticated]);

  // 设置自动刷新检查间隔
  useEffect(() => {
    if (authenticated) {
      const checkInterval = setInterval(() => {
        const refreshedIds = processAutoRefreshLinks();
        if (refreshedIds.length > 0) {
          // 如果有链接被刷新，更新状态
          setLinks(getLinks());
        }
      }, 60000); // 每分钟检查一次
      
      return () => clearInterval(checkInterval);
    }
  }, [authenticated]);

  const handleCreateShortLink = (data: ShortLinkFormData) => {
    const refreshInterval = data.refreshInterval === 'none' 
      ? null 
      : parseInt(data.refreshInterval) * 60 * 1000; // 将分钟转换为毫秒
    
    const newLink = createShortLink(data.originalUrl, refreshInterval);
    addLink(newLink);
    setLinks(getLinks());
  };

  const handleRefreshQRCode = (id: string) => {
    refreshQRCode(id);
    setLinks(getLinks());
  };

  const handleDeleteLink = (id: string) => {
    deleteLink(id);
    setLinks(getLinks());
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  // 获取短链接的基础URL
  const getBaseUrl = () => {
    return `${window.location.protocol}//${window.location.host}`;
  };

  // 如果在重定向页面，显示重定向组件
  if (redirectId) {
    return <RedirectPage id={redirectId} />;
  }

  // 如果未认证，显示登录页面
  if (!authenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // 获取当前用户名
  const authState = getAuthState();
  const username = authState.username || '';

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center text-blue-600">
                <Link2 className="h-8 w-8 mr-2" />
                <QrCode className="h-8 w-8" />
              </div>
              <h1 className="ml-3 text-3xl font-bold text-gray-900">
                AYI 易码云
              </h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 mr-4">欢迎，{username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-600 hover:text-red-600"
                title="退出登录"
              >
                <LogOut className="h-5 w-5 mr-1" />
                退出
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              创建新的短链接
            </h2>
            <ShortLinkForm onSubmit={handleCreateShortLink} />
          </div>
          
          {links.length > 0 ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                您的短链接
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {links.map((link) => (
                  <ShortLinkCard
                    key={link.id}
                    link={link}
                    baseUrl={getBaseUrl()}
                    onRefresh={handleRefreshQRCode}
                    onDelete={handleDeleteLink}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">暂无短链接</h3>
              <p className="mt-1 text-sm text-gray-500">
                使用上方表单创建您的第一个短链接。
              </p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            AYI 易码云 - URL短链接与二维码生成器 © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;