'use client';

import { useState } from 'react';

interface AnswerInputProps {
  onSubmit: (answer: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function AnswerInput({
  onSubmit,
  isLoading,
  disabled = false,
}: AnswerInputProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (answer.trim() && !isLoading && !disabled) {
      onSubmit(answer.trim());
      setAnswer('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className='iv-answer-wrap animate-fade-in-up'>
      <textarea
        className='iv-answer-textarea'
        placeholder='Type your answer here…'
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading || disabled}
      />
      <div className='iv-answer-footer'>
        <span className='iv-char-count'>{answer.length} characters</span>
        <span className='iv-shortcut-hint'>
          <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to submit
        </span>
      </div>
      <div style={{ marginTop: '0.75rem' }}>
        <button
          className='iv-btn-primary'
          onClick={handleSubmit}
          disabled={isLoading || !answer.trim() || disabled}
        >
          {isLoading ? (
            <>
              <svg
                className='animate-spin-slow'
                width='16'
                height='16'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182'
                />
              </svg>
              Evaluating…
            </>
          ) : (
            <>
              <svg
                width='16'
                height='16'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
                />
              </svg>
              Submit Answer
            </>
          )}
        </button>
      </div>
    </div>
  );
}
