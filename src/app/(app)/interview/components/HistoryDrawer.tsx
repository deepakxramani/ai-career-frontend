'use client';

import { useEffect, useState } from 'react';
import type { InterviewSession } from '@/src/types/interview';
import { parseScore } from '@/src/utils/interview.utils';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: InterviewSession[];
  onFetch: () => void;
}

export default function HistoryDrawer({
  isOpen,
  onClose,
  sessions,
  onFetch,
}: HistoryDrawerProps) {
  const [selectedSession, setSelectedSession] = useState<InterviewSession | null>(
    null,
  );

  useEffect(() => {
    if (isOpen) {
      onFetch();
    } else {
      setSelectedSession(null);
    }
  }, [isOpen, onFetch]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <div
        className={`iv-drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <div className={`iv-drawer ${isOpen ? 'open' : ''}`}>
        <div className='iv-drawer-header'>
          <h3 className='iv-drawer-title'>
            {selectedSession ? 'Session Conversation' : 'Interview History'}
          </h3>
          <button className='iv-drawer-close' onClick={onClose}>
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
                d='M6 18 18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <div className='iv-drawer-body'>
          {selectedSession ? (
            <div>
              <button
                className='iv-btn-secondary'
                onClick={() => setSelectedSession(null)}
                style={{ marginBottom: '1.5rem', width: '100%', justifyContent: 'center' }}
              >
                ← Back to Sessions
              </button>
              <h4 className='iv-history-role'>{selectedSession.role}</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                {formatDate(selectedSession.createdAt)}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {selectedSession.messages?.map((msg, i) => {
                  let aiFeedbackText = '';
                  let aiScore = '';

                  // AI response can be a string or parsed ChatResponse object
                  if (typeof msg.ai === 'string') {
                    try {
                      const parsed = JSON.parse(msg.ai);
                      aiFeedbackText = parsed.feedback || parsed.next_question || '';
                      const parsedScore = parseScore(parsed.score);
                      aiScore = parsedScore ? `Score: ${parsedScore}/10` : '';
                    } catch {
                      aiFeedbackText = msg.ai;
                    }
                  } else if (msg.ai) {
                    aiFeedbackText = msg.ai.feedback || msg.ai.next_question || '';
                    const parsedScore = parseScore(msg.ai.score);
                    aiScore = parsedScore ? `Score: ${parsedScore}/10` : '';
                  }

                  return (
                    <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {/* User's Answer */}
                      <div
                        style={{
                          background: 'rgba(99, 102, 241, 0.1)',
                          border: '1px solid rgba(99, 102, 241, 0.2)',
                          padding: '0.75rem 1rem',
                          borderRadius: '0.75rem 0.75rem 0 0.75rem',
                          alignSelf: 'flex-end',
                          maxWidth: '90%',
                          fontSize: '0.85rem',
                        }}
                      >
                        <p style={{ margin: 0, fontWeight: 600, fontSize: '0.7rem', color: 'var(--accent-start)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                          Your Answer
                        </p>
                        <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.user}</p>
                      </div>

                      {/* AI Evaluation */}
                      {aiFeedbackText && (
                        <div
                          style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            padding: '0.75rem 1rem',
                            borderRadius: '0.75rem 0.75rem 0.75rem 0',
                            alignSelf: 'flex-start',
                            maxWidth: '90%',
                            fontSize: '0.85rem',
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                            <span style={{ fontWeight: 600, fontSize: '0.7rem', color: 'var(--accent-mid)', textTransform: 'uppercase' }}>
                              AI Interviewer
                            </span>
                            {aiScore && (
                              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--accent-end)' }}>
                                {aiScore}
                              </span>
                            )}
                          </div>
                          <p style={{ margin: 0 }}>{aiFeedbackText}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {sessions.length === 0 ? (
                <div className='iv-history-empty'>
                  <svg
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z'
                    />
                  </svg>
                  No interview sessions recorded.
                </div>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session._id}
                    className='iv-history-item'
                    onClick={() => setSelectedSession(session)}
                    style={{ cursor: 'pointer' }}
                  >
                    <h4 className='iv-history-role'>{session.role}</h4>
                    <div className='iv-history-meta'>
                      <span>{session.messages?.length || 0} rounds</span>
                      <span>{formatDate(session.createdAt)}</span>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
