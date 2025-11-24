'use client';

import { FC, useState, useRef } from 'react';
import { Upload, X, FileImage, File, CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  maxSize?: number; // в MB
}

const FileUpload: FC<FileUploadProps> = ({
  onFilesChange,
  maxFiles = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'application/pdf'],
  maxSize = 10
}) => {
  const t = useTranslations('fileUpload');
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Проверка типа файла
    if (!acceptedTypes.includes(file.type)) {
      return t('errorFileType', { type: file.type, accepted: acceptedTypes.join(', ') });
    }

    // Проверка размера файла
    if (file.size > maxSize * 1024 * 1024) {
      return t('errorFileSize', { name: file.name, maxSize: maxSize.toString() });
    }

    return null;
  };

  const handleFiles = (newFiles: FileList) => {
    const fileArray = Array.from(newFiles);
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    // Проверка общего количества файлов
    if (files.length + fileArray.length > maxFiles) {
      newErrors.push(t('errorMaxFiles', { maxFiles: maxFiles.toString(), total: (files.length + fileArray.length).toString() }));
      setErrors(newErrors);
      return;
    }

    // Валидация каждого файла
    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setTimeout(() => setErrors([]), 5000); // Очистить ошибки через 5 секунд
    }

    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onFilesChange(updatedFiles);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <FileImage className="w-5 h-5 text-blue-500" />;
    }
    return <File className="w-5 h-5 text-gray-500" />;
  };

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-all duration-300 ${
          dragActive
            ? 'border-[#EA3C23] bg-[#EA3C23]/5 scale-[1.02]'
            : 'border-gray-300 dark:border-gray-700 hover:border-[#EA3C23]/50 hover:bg-gray-50/50 dark:hover:bg-gray-900/30'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <div className={`p-2.5 rounded-full transition-all duration-300 ${dragActive ? 'bg-[#EA3C23]/10 scale-110' : 'bg-gray-100 dark:bg-gray-800'}`}>
            <Upload className={`w-6 h-6 transition-colors ${dragActive ? 'text-[#EA3C23]' : 'text-gray-400'}`} />
          </div>
          <div className="space-y-1">
            <p
              className="text-gray-900 dark:text-white font-semibold text-base"
              style={{
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              {t('dragDropText')}
            </p>
            <p
              className="text-gray-500 dark:text-gray-400 text-xs"
              style={{
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              {t('supportedFormats', { maxSize: maxSize.toString() })}
            </p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-1 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 font-semibold text-sm cursor-pointer"
            style={{
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            {t('selectFilesButton')}
          </button>
        </div>
      </div>

      {/* Отображение ошибок */}
      {errors.length > 0 && (
        <div className="mt-2 space-y-1">
          {errors.map((error, index) => (
            <div key={index} className="text-red-500 text-sm">
              {error}
            </div>
          ))}
        </div>
      )}

      {/* Отображение загруженных файлов */}
      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          <p
            className="text-xs font-semibold text-gray-900 dark:text-white flex items-center gap-1.5"
            style={{
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            <CheckCircle className="w-3.5 h-3.5 text-green-500" />
            {t('uploadedFiles', { count: files.length.toString(), max: maxFiles.toString() })}
          </p>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all group"
            >
              <div className="flex items-center space-x-2.5 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-medium text-gray-900 dark:text-white truncate"
                    style={{
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                  >
                    {file.name}
                  </p>
                  <p
                    className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5"
                    style={{
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                  >
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group ml-2 cursor-pointer"
              >
                <X className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;