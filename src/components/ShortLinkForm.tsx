import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'lucide-react';
import { ShortLinkFormData } from '../types';

interface ShortLinkFormProps {
  onSubmit: (data: ShortLinkFormData) => void;
}

const ShortLinkForm: React.FC<ShortLinkFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ShortLinkFormData>({
    defaultValues: {
      originalUrl: '',
      refreshInterval: 'none',
    },
  });

  const onFormSubmit = (data: ShortLinkFormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="w-full max-w-lg">
      <div className="mb-6">
        <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700 mb-1">
          原始URL
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            id="originalUrl"
            className={`block w-full pl-10 pr-3 py-2 border ${
              errors.originalUrl ? 'border-red-300' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            placeholder="https://example.com"
            {...register('originalUrl', {
              required: 'URL是必填项',
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                message: '请输入有效的URL',
              },
            })}
          />
        </div>
        {errors.originalUrl && (
          <p className="mt-1 text-sm text-red-600">{errors.originalUrl.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="refreshInterval" className="block text-sm font-medium text-gray-700 mb-1">
          自动刷新二维码
        </label>
        <select
          id="refreshInterval"
          className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          {...register('refreshInterval')}
        >
          <option value="none">不自动刷新</option>
          <option value="5">每5分钟</option>
          <option value="15">每15分钟</option>
          <option value="30">每30分钟</option>
          <option value="60">每小时</option>
          <option value="1440">每天</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        生成短链接和二维码
      </button>
    </form>
  );
};

export default ShortLinkForm;