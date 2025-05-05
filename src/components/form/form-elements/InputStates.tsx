'use client';
import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Input from '../input/InputField';
import Label from '../Label';

export default function InputStates({
  selectedPages,
}: {
  selectedPages: string;
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  // Simulate a validation check
  const validateEmail = (value: string) => {
    const isValidEmail =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    setError(!isValidEmail);
    return isValidEmail;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };
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
          <Input
            type="email"
            defaultValue={email}
            error={error}
            onChange={handleEmailChange}
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
            <Input
              type="type"
              defaultValue={''}
              error={error}
              onChange={handleEmailChange}
              placeholder={
                selectedPages === 'Add Platform'
                  ? 'Enter type...'
                  : selectedPages === 'Edit Platform'
                    ? 'Enter type...'
                    : ''
              }
            />
          </div>
        ) : null}
      </div>
    </ComponentCard>
  );
}
