'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  percent: number;
}

export default function ProgressBar({
  current,
  total,
  percent,
}: ProgressBarProps) {
  return (
    <div className='iv-progress-wrap'>
      <div className='iv-progress-info'>
        <span className='iv-progress-label'>
          Question {current} of {total}
        </span>
        <span className='iv-progress-pct'>{percent}% Complete</span>
      </div>
      <div className='iv-progress-track'>
        <div className='iv-progress-fill' style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
