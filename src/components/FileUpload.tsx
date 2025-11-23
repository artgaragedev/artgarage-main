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
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-[#EA3C23] bg-[#EA3C23]/5'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
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
          <Upload className="w-10 h-10 text-gray-400 mb-2" />
          <p
            className="text-gray-600 dark:text-gray-400 font-medium"
            style={{
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            {t('dragDropText')}
          </p>
          <p
            className="text-gray-500 dark:text-gray-500 text-sm"
            style={{
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            {t('supportedFormats', { maxSize: maxSize.toString() })}
          </p>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-2 px-4 py-2 bg-[#EA3C23] text-white rounded-lg hover:bg-[#D63419] transition-colors"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 500
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
        <div className="mt-4 space-y-2">
          <p
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
            style={{
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            {t('uploadedFiles', { count: files.length.toString(), max: maxFiles.toString() })}
          </p>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {getFileIcon(file.type)}
                <div>
                  <p 
                    className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs"
                    style={{
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                  >
                    {file.name}
                  </p>
                  <p 
                    className="text-xs text-gray-500 dark:text-gray-400"
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
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;