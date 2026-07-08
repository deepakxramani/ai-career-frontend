'use client';

import type { InterviewQuestion } from '@/src/types/interview';

interface QuestionCardProps {
  question: InterviewQuestion;
  index: number;
  total: number;
}

export default function QuestionCard({
  question,
  index,
  total,
}: QuestionCardProps) {
  return (
    <div className='iv-live-card animate-fade-in-up'>
      <div className='iv-live-header'>
        <div className='iv-live-badge'>
          <span className='iv-live-q-num'>
            Q{index + 1} of {total}
          </span>
          <span className={`iv-category-tag iv-category-tag--${question.category}`}>
            {question.category}
          </span>
        </div>
      </div>
      <p className='iv-live-question'>{question.text}</p>
    </div>
  );
}
