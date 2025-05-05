'use client';
import React, { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import TextArea from '../input/TextArea';

export default function TextAreaInput() {
  const [message, setMessage] = useState('');
  return (
    <ComponentCard title="Game Description">
      <div className="space-y-6">
        {/* Default TextArea */}
        <div>
          <TextArea
            value={message}
            onChange={(value) => setMessage(value)}
            rows={6}
          />
        </div>
      </div>
    </ComponentCard>
  );
}
