import React, { useEffect, useState } from 'react';
import { getLinkById, incrementAccessCount } from '../utils/shortLinkUtils';

interface RedirectPageProps {
  id: string;
}

const RedirectPage: React.FC<RedirectPageProps> = ({ id }) => {
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const link = getLinkById(id);
    
    if (!link) {
      setError('短链接未找到或已过期');
      return;
    }
    
    // 增加访问计数
    incrementAccessCount(id);
    
    // 开始倒计时
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = link.originalUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">错误</h1>
          <p className="text-gray-700">{error}</p>
          <a
            href="/"
            className="mt-6 block text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            返回首页
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">正在跳转...</h1>
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-700">
          将在 <span className="font-bold">{countdown}</span> 秒后跳转
        </p>
      </div>
    </div>
  );
};

export default RedirectPage;