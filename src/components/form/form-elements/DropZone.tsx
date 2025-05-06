'use client';
import React, { useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller } from 'react-hook-form';
import ComponentCard from '../../common/ComponentCard';

interface DropzoneProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
}

const DropzoneComponent: React.FC<DropzoneProps> = ({ control, name }) => {
  const onChangeRef = useRef<(file: File) => void>(() => {});
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        'image/png': [],
        'image/jpeg': [],
        'image/webp': [],
        'image/svg+xml': [],
      },
      multiple: false,
    });

  // Gunakan useEffect di sini, secara sah
  useEffect(() => {
    if (acceptedFiles.length > 0 && onChangeRef.current) {
      onChangeRef.current(acceptedFiles[0]);
    }
  }, [acceptedFiles]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      render={({ field: { onChange, onBlur, value } }) => {
        // Simpan onChange di ref agar bisa diakses dari useEffect
        onChangeRef.current = onChange;

        return (
          <ComponentCard title="Screenshots">
            <div
              {...getRootProps()}
              className={`cursor-pointer rounded-xl border border-dashed p-7 transition lg:p-10 ${
                isDragActive
                  ? 'border-brand-500 bg-gray-100 dark:bg-gray-800'
                  : 'border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900'
              }`}
            >
              <input {...getInputProps()} onBlur={onBlur} />
              <div className="flex flex-col items-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                    📁
                  </div>
                </div>
                <h4 className="mb-2 font-semibold text-gray-800 dark:text-white/90">
                  {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                </h4>
                <span className="mb-1 text-sm text-gray-700 dark:text-gray-400">
                  PNG, JPG, WebP, SVG files only
                </span>
                <span className="text-brand-500 text-sm font-medium underline">
                  Browse File
                </span>
              </div>
            </div>
            {value && (
              <div className="mt-4 text-sm text-gray-500">{value.name}</div>
            )}
          </ComponentCard>
        );
      }}
    />
  );
};

export default DropzoneComponent;
