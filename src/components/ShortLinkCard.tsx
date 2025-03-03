import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { RefreshCw, Clipboard, ExternalLink, Trash, AlertCircle } from 'lucide-react';
import { ShortLink } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { getStatusColor } from '../utils/shortLinkUtils';

interface ShortLinkCardProps {
  link: ShortLink;
  baseUrl: string;
  onRefresh: (id: string) => void;
  onDelete: (id: string) => void;
}

const ShortLinkCard: React.FC<ShortLinkCardProps> = ({ link, baseUrl, onRefresh, onDelete }) => {
  const shortUrl = `${baseUrl}/${link.id}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert('短链接已复制到剪贴板！');
  };

  const handleRefresh = () => {
    onRefresh(link.id);
  };

  const handleDelete = () => {
    if (window.confirm('确定要删除这个短链接吗？')) {
      onDelete(link.id);
    }
  };

  const getRefreshText = () => {
    if (!link.refreshInterval) return '不自动刷新';
    
    if (link.nextRefreshAt) {
      return `下次刷新: ${formatDistanceToNow(link.nextRefreshAt, { addSuffix: true })}`;
    }
    
    const minutes = link.refreshInterval / (60 * 1000);
    if (minutes < 60) return `自动刷新: 每${minutes}分钟`;
    if (minutes === 60) return '自动刷新: 每小时';
    if (minutes === 1440) return '自动刷新: 每天';
    return `自动刷新: 每${minutes / 60}小时`;
  };

  const statusColor = getStatusColor(link.accessCount);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 truncate max-w-xs" title={link.originalUrl}>
              {link.originalUrl}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              创建时间: {formatDistanceToNow(link.createdAt, { addSuffix: true })}
            </p>
            <p className="text-sm text-gray-500">
              最后更新: {formatDistanceToNow(link.updatedAt, { addSuffix: true })}
            </p>
            <p className="text-sm text-blue-500 mt-1">
              {getRefreshText()}
            </p>
            <div className="flex items-center mt-2">
              <div className={`w-3 h-3 rounded-full bg-${statusColor}-500 mr-2`}></div>
              <p className="text-sm font-medium">
                访问量: <span className="font-bold">{link.accessCount}</span>
              </p>
              {statusColor !== 'green' && (
                <AlertCircle className={`h-4 w-4 ml-2 text-${statusColor}-500`} />
              )}
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleRefresh}
              className="p-1 rounded-full hover:bg-gray-100"
              title="刷新二维码"
            >
              <RefreshCw className="h-5 w-5 text-gray-500" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 rounded-full hover:bg-gray-100"
              title="删除短链接"
            >
              <Trash className="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex flex-col items-center">
        <div className="bg-white p-2 rounded-lg shadow-sm mb-4">
          <QRCodeSVG value={shortUrl} size={180} />
        </div>
        
        <div className="w-full">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 truncate max-w-xs" title={shortUrl}>
              {shortUrl}
            </span>
            <div className="flex space-x-2">
              <button
                onClick={copyToClipboard}
                className="p-1 rounded-full hover:bg-gray-100"
                title="复制到剪贴板"
              >
                <Clipboard className="h-5 w-5 text-gray-500" />
              </button>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-full hover:bg-gray-100"
                title="打开链接"
              >
                <ExternalLink className="h-5 w-5 text-gray-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortLinkCard;