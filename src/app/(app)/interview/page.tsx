'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { useInterview } from '@/src/hooks/useInterview';
import RoleForm from './components/RoleForm';
import QuestionCard from './components/QuestionCard';
import AnswerInput from './components/AnswerInput';
import FeedbackCard from './components/FeedbackCard';
import ProgressBar from './components/ProgressBar';
import HistoryDrawer from './components/HistoryDrawer';
import API from '@/src/lib/api';
import '@/src/styles/dashboard/interview.css';

export default function InterviewPage() {
  const { user } = useAuth();
  const {
    step,
    role,
    setRole,
    experience,
    setExperience,
    resumeText,
    setResumeText,
    questions,
    currentIndex,
    feedback,
    scores,
    history,
    isLoading,
    error,
    averageScore,
    totalQuestions,
    progressPercent,
    currentQuestion,
    handleGenerate,
    handleStartInterview,
    handleSubmitAnswer,
    handleNextQuestion,
    handleRetake,
    fetchHistory,
  } = useInterview();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [loadingResume, setLoadingResume] = useState(false);

  // Auto-fetch latest resume text on mount
  useEffect(() => {
    async function loadLatestResume() {
      const uid = user?._id || user?.id || user?.userId;
      if (!uid) return;
      setLoadingResume(true);
      try {
        const res = await API.get<any[]>(`/resume/history/${uid}`);
        if (res.data && res.data.length > 0) {
          // Sort by creation time just in case, first item is latest
          const latest = res.data[0];
          if (latest.extractedText) {
            setResumeText(latest.extractedText);
          }
        }
      } catch (err) {
        console.error('Failed to load latest resume:', err);
      } finally {
        setLoadingResume(false);
      }
    }
    loadLatestResume();
  }, [user, setResumeText]);

  // Determine score color circle
  const scoreClass =
    averageScore >= 8
      ? 'iv-score-fill--high'
      : averageScore >= 5
        ? 'iv-score-fill--mid'
        : 'iv-score-fill--low';

  const strokeDashOffset = 314 - (averageScore / 10) * 314;

  return (
    <div className='animate-fade-in-up' style={{ position: 'relative', minHeight: '80vh' }}>
      {/* Page Header */}
      <div className='iv-page-header'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className='iv-page-title'>
              Interview <span className='gradient-text'>Prep</span>
            </h1>
            <p className='iv-page-subtitle'>
              Practice mock interviews with AI. Receive real-time evaluations, score cards, and structural feedback.
            </p>
          </div>
          {step === 'setup' && (
            <button
              className='iv-btn-secondary'
              onClick={() => setIsDrawerOpen(true)}
            >
              <svg
                width='16'
                height='16'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
                style={{ marginRight: '0.25rem' }}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25'
                />
              </svg>
              View History
            </button>
          )}
        </div>
      </div>

      {error && <div className='iv-error'>{error}</div>}

      {/* Render Steps */}
      {step === 'setup' && (
        <RoleForm
          role={role}
          setRole={setRole}
          experience={experience}
          setExperience={setExperience}
          resumeText={resumeText}
          setResumeText={setResumeText}
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />
      )}

      {step === 'questions' && (
        <div className='animate-fade-in-up'>
          <div className='iv-questions-header'>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                Generated Curriculum for <span className='gradient-text'>{role}</span>
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                Preview the topics before starting the mock interview.
              </p>
            </div>
            <span className='iv-questions-count'>{totalQuestions} Questions</span>
          </div>

          <div className='iv-questions-grid'>
            {questions.map((q, idx) => (
              <div key={idx} className='iv-question-preview stagger-1'>
                <div className='iv-question-num'>{idx + 1}</div>
                <div className='iv-question-content'>
                  <p className='iv-question-text'>{q.text}</p>
                  <span className={`iv-category-tag iv-category-tag--${q.category}`}>
                    {q.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className='iv-btn-primary' onClick={handleStartInterview}>
              Start Mock Interview
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
                  d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z'
                />
              </svg>
            </button>
            <button className='iv-btn-secondary' onClick={handleRetake}>
              Back
            </button>
          </div>
        </div>
      )}

      {step === 'interview' && currentQuestion && (
        <div className='animate-fade-in-up'>
          <ProgressBar
            current={currentIndex + 1}
            total={totalQuestions}
            percent={progressPercent}
          />

          <QuestionCard
            question={currentQuestion}
            index={currentIndex}
            total={totalQuestions}
          />

          {!feedback ? (
            <AnswerInput onSubmit={handleSubmitAnswer} isLoading={isLoading} />
          ) : (
            <FeedbackCard
              feedback={feedback}
              onNext={handleNextQuestion}
              isLast={currentIndex === totalQuestions - 1}
            />
          )}
        </div>
      )}

      {step === 'completed' && (
        <div className='iv-completion animate-fade-in-up'>
          <div className='iv-completion-hero'>
            <span className='iv-completion-emoji'>🎉</span>
            <h2 className='iv-completion-title'>Mock Interview Completed!</h2>
            <p className='iv-completion-sub'>
              You have completed the full session. Here is your evaluation breakdown:
            </p>

            <div className='iv-score-circle-wrap'>
              <div className='iv-score-circle'>
                <svg className='iv-score-svg' viewBox='0 0 120 120'>
                  <circle className='iv-score-bg' cx='60' cy='60' r='50' />
                  <circle
                    className={`iv-score-fill ${scoreClass}`}
                    cx='60'
                    cy='60'
                    r='50'
                    strokeDasharray='314'
                    strokeDashoffset={strokeDashOffset}
                  />
                </svg>
                <div className='iv-score-value'>
                  <span className='iv-score-number'>{averageScore}</span>
                  <span className='iv-score-of'>Average Score</span>
                </div>
              </div>
            </div>

            <div className='iv-completion-actions'>
              <button className='iv-btn-primary' onClick={handleRetake}>
                New Session
              </button>
              <button
                className='iv-btn-secondary'
                onClick={() => {
                  setIsDrawerOpen(true);
                }}
              >
                View Past History
              </button>
            </div>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Question Wise Score Card
          </h3>
          <div className='iv-scores-grid'>
            {questions.map((q, idx) => {
              const score = scores[idx] || 0;
              const badgeClass =
                score >= 8
                  ? 'iv-score-badge--high'
                  : score >= 5
                    ? 'iv-score-badge--mid'
                    : 'iv-score-badge--low';

              return (
                <div key={idx} className='iv-score-item'>
                  <span className='iv-score-item-label' title={q.text}>
                    Q{idx + 1}: {q.text}
                  </span>
                  <span className={`iv-score-item-value ${badgeClass}`}>{score}/10</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* History Drawer */}
      <HistoryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        sessions={history}
        onFetch={fetchHistory}
      />
    </div>
  );
}
