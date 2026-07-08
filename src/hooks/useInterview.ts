'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import {
  generateInterview,
  chatInterview,
  getInterviewHistory,
} from '@/src/services/interview.service';
import type {
  InterviewStep,
  ExperienceLevel,
  InterviewQuestion,
  ChatResponse,
  InterviewSession,
  GeneratedQuestions,
} from '@/src/types/interview';

// ─── Flatten generated questions into a tagged list ─────────────
function flattenQuestions(data: GeneratedQuestions): InterviewQuestion[] {
  const list: InterviewQuestion[] = [];

  (data.technical_questions || []).forEach((q) =>
    list.push({ text: q, category: 'Technical' }),
  );
  (data.hr_questions || []).forEach((q) =>
    list.push({ text: q, category: 'HR' }),
  );
  (data.coding_questions || []).forEach((q) =>
    list.push({ text: q, category: 'Coding' }),
  );

  return list;
}

// ─── Hook ───────────────────────────────────────────────────────
export function useInterview() {
  const { user } = useAuth();

  // Step machine
  const [step, setStep] = useState<InterviewStep>('setup');

  // Setup state
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState<ExperienceLevel>('Fresher');
  const [resumeText, setResumeText] = useState('');

  // Questions state
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Interview state
  const [feedback, setFeedback] = useState<ChatResponse | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  // History
  const [history, setHistory] = useState<InterviewSession[]>([]);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // ── Generate Questions ──────────────────────────────────────
  const handleGenerate = useCallback(async () => {
    if (!role.trim()) {
      setError('Please enter a job role.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await generateInterview({
        resumeText: resumeText || `Role: ${role}, Experience: ${experience}`,
        role,
      });

      const flat = flattenQuestions(data);

      if (flat.length === 0) {
        setError('No questions generated. Please try a different role.');
        return;
      }

      setQuestions(flat);
      setStep('questions');
    } catch (err: any) {
      console.error('Generate error:', err);
      setError(
        err?.response?.data?.message ||
          'Failed to generate questions. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [role, resumeText, experience]);

  // ── Start Interview ─────────────────────────────────────────
  const handleStartInterview = useCallback(() => {
    setCurrentIndex(0);
    setScores([]);
    setChatHistory([]);
    setFeedback(null);
    setStep('interview');
  }, []);

  // ── Submit Answer ───────────────────────────────────────────
  const handleSubmitAnswer = useCallback(
    async (answer: string) => {
      if (!answer.trim()) return;

      const uid = user?._id || user?.id || user?.userId || 'demo-user';

      setIsLoading(true);
      setError('');

      try {
        const res = await chatInterview({
          message: `Question: ${questions[currentIndex].text}\n\nMy Answer: ${answer}`,
          role,
          history: chatHistory,
          userId: uid,
        });

        setFeedback(res);
        setScores((prev) => [...prev, Number(res.score) || 0]);
        setChatHistory((prev) => [
          ...prev,
          { user: answer, ai: res },
        ]);
      } catch (err: any) {
        console.error('Chat error:', err);
        setError(
          err?.response?.data?.message ||
            'Failed to get feedback. Please try again.',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [questions, currentIndex, role, chatHistory, user],
  );

  // ── Next Question ───────────────────────────────────────────
  const handleNextQuestion = useCallback(() => {
    setFeedback(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setStep('completed');
    }
  }, [currentIndex, questions.length]);

  // ── Retake ──────────────────────────────────────────────────
  const handleRetake = useCallback(() => {
    setStep('setup');
    setQuestions([]);
    setCurrentIndex(0);
    setFeedback(null);
    setScores([]);
    setChatHistory([]);
    setError('');
  }, []);

  // ── Fetch History ───────────────────────────────────────────
  const fetchHistory = useCallback(async () => {
    const uid = user?._id || user?.id || user?.userId;
    if (!uid) return;

    try {
      const data = await getInterviewHistory(uid);
      setHistory(data);
    } catch (err) {
      console.error('History fetch error:', err);
    }
  }, [user]);

  // ── Computed values ─────────────────────────────────────────
  const averageScore =
    scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

  const totalQuestions = questions.length;
  const progressPercent =
    totalQuestions > 0
      ? Math.round(((currentIndex + (feedback ? 1 : 0)) / totalQuestions) * 100)
      : 0;

  return {
    // State
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

    // Computed
    averageScore,
    totalQuestions,
    progressPercent,
    currentQuestion: questions[currentIndex] || null,

    // Actions
    handleGenerate,
    handleStartInterview,
    handleSubmitAnswer,
    handleNextQuestion,
    handleRetake,
    fetchHistory,
  };
}
