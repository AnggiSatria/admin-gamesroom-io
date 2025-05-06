'use client';
import React from 'react';
import ComponentCard from '../../common/ComponentCard';
import FileInput from '../input/FileInput';
import { Controller } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FileInputExample({ form }: { form: any }) {
  return (
    <ComponentCard title="Cover Image">
      <div>
        <Controller
          name="coverImage"
          control={form.control}
          render={({ field }) => (
            <FileInput
              className="custom-class"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  field.onChange(files[0]);
                }
              }}
            />
          )}
        />
      </div>
    </ComponentCard>
  );
}
