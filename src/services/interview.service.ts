import API from '@/src/lib/api';
import type {
  GeneratedQuestions,
  ChatResponse,
  InterviewSession,
} from '@/src/types/interview';

// ─── Interview API Service ──────────────────────────────────────

export async function generateInterview(payload: {
  resumeText: string;
  role: string;
}): Promise<GeneratedQuestions> {
  const res = await API.post<GeneratedQuestions>(
    '/interview/generate',
    payload,
  );
  return res.data;
}

export async function chatInterview(payload: {
  message: string;
  role: string;
  history: any[];
  userId: string;
}): Promise<ChatResponse> {
  const res = await API.post<ChatResponse>('/interview/chat', payload);
  return res.data;
}

export async function getInterviewHistory(
  userId: string,
): Promise<InterviewSession[]> {
  const res = await API.get<InterviewSession[]>(
    `/interview/history/${userId}`,
  );
  return res.data;
}
