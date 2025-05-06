'use client';
import React from 'react';
import ComponentCard from '../../common/ComponentCard';
import Input from '../input/InputField';
import Label from '../Label';
import { Controller } from 'react-hook-form';

export default function InputStates({
  selectedPages,
  form,
}: {
  selectedPages: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any;
}) {
  return (
    <ComponentCard title={`Form ${selectedPages}`}>
      <div className="space-y-5 sm:space-y-6">
        <div>
          <Label>
            {selectedPages === 'Add Genre'
              ? 'Name'
              : selectedPages === 'Edit Genre'
                ? 'Name'
                : selectedPages === 'Add Platform'
                  ? 'Name'
                  : selectedPages === 'Edit Platform'
                    ? 'Name'
                    : null}
          </Label>
          <Controller
            name="name"
            control={form.control}
            render={({ field }) => (
              <Input
                placeholder={
                  selectedPages === 'Add Genre'
                    ? 'Enter genre...'
                    : selectedPages === 'Edit Genre'
                      ? 'Enter genre...'
                      : selectedPages === 'Add Platform'
                        ? 'Enter platform...'
                        : selectedPages === 'Edit Platform'
                          ? 'Enter platform...'
                          : ''
                }
                {...field}
              />
            )}
          />
        </div>
        {selectedPages === 'Add Platform' ||
        selectedPages === 'Edit Platform' ? (
          <div>
            <Label>
              {selectedPages === 'Add Platform'
                ? 'Type'
                : selectedPages === 'Edit Platform'
                  ? 'Type'
                  : null}
            </Label>

            <Controller
              name="type"
              control={form.control}
              render={({ field }) => (
                <Input
                  placeholder={
                    selectedPages === 'Add Platform'
                      ? 'Enter type...'
                      : selectedPages === 'Edit Platform'
                        ? 'Enter type...'
                        : ''
                  }
                  {...field}
                />
              )}
            />
          </div>
        ) : null}
      </div>
    </ComponentCard>
  );
}
