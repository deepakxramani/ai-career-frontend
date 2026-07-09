'use client';

import type { ChatResponse } from '@/src/types/interview';
import { parseScore } from '@/src/utils/interview.utils';

interface FeedbackCardProps {
  feedback: ChatResponse;
  onNext: () => void;
  isLast: boolean;
}

export default function FeedbackCard({
  feedback,
  onNext,
  isLast,
}: FeedbackCardProps) {
  console.log("FeedbackCard - raw feedback:", feedback);
  console.log("FeedbackCard - feedback.score:", feedback?.score);
  const score = parseScore(feedback?.score);
  console.log("FeedbackCard - parsed score:", score);

  // Determine score color category
  const scoreClass =
    score >= 8
      ? 'iv-score-badge--high'
      : score >= 5
        ? 'iv-score-badge--mid'
        : 'iv-score-badge--low';

  return (
    <div className='iv-feedback-card animate-fade-in-up'>
      <div className='iv-feedback-header'>
        <div className='iv-feedback-title'>
          <svg
            width='18'
            height='18'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z'
            />
          </svg>
          Evaluation & Feedback
        </div>
        <span className={`iv-score-badge ${scoreClass}`}>
          Score: {score}/10
        </span>
      </div>
      <p className='iv-feedback-text'>{feedback.feedback}</p>
      <div className='iv-feedback-actions'>
        <button className='iv-btn-primary' onClick={onNext}>
          {isLast ? 'Finish Interview' : 'Next Question'}
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
              d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
