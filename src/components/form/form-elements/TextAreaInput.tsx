'use client';
import React from 'react';
import ComponentCard from '../../common/ComponentCard';
import TextArea from '../input/TextArea';
import { Controller } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TextAreaInput({ form }: { form: any }) {
  return (
    <ComponentCard title="Game Description">
      <div className="space-y-6">
        <div>
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => <TextArea rows={6} {...field} />}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
