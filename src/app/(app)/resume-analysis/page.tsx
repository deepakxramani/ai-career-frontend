'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import API from '@/src/lib/api';
import '@/src/styles/dashboard/resume-analysis.css';

// ─── Types ────────────────────────────────────────────────────────
interface ResumeAnalysis {
  _id: string;
  userId: string;
  fileName: string;
  extractedText: string;
  analysis: {
    ats_score: number;
    ats_score_reason: string;
    experience_level: string;
    skills: {
      technical: string[];
      soft: string[];
      tools: string[];
    };
    strengths: string[];
    weaknesses: string[];
    missing_skills: string[];
    resume_issues: string[];
    improvement_suggestions: string[];
    project_suggestions: string[];
    recommended_roles: string[];
    market_readiness: string;
    keyword_optimization_tips: string[];
    salary_estimate: string;
    confidence_score: string;
    top_3_improvements_for_fast_growth: string[];
    rewrite_tips: {
      summary: string;
      experience: string;
      projects: string;
      skills_section: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

// ─── Helper ──────────────────────────────────────────────────────
function getScoreColor(score: number): string {
  if (score >= 80) return 'high';
  if (score >= 60) return 'mid';
  return 'low';
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// SVG ring helper
const RING_R = 14;
const RING_C = 2 * Math.PI * RING_R;
const BIG_R = 42;
const BIG_C = 2 * Math.PI * BIG_R;

// ─── Component ───────────────────────────────────────────────────
export default function ResumeAnalysisPage() {
  const { user, token } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [history, setHistory] = useState<ResumeAnalysis[]>([]);
  const [selected, setSelected] = useState<ResumeAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  // ── Fetch History ────────────────────────────────────────────
  const fetchHistory = useCallback(async (): Promise<void> => {
    const uid = user?._id || user?.id || user?.userId;
    if (!uid) return;
    try {
      setIsLoading(true);
      const res = await API.get<ResumeAnalysis[]>(`/resume/history/${uid}`);
      setHistory(res.data);
    } catch (err) {
      console.error('Error fetching resume history:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // ── Upload ───────────────────────────────────────────────────
  const handleUpload = async (): Promise<void> => {
    console.log('--- handleUpload triggered ---');
    console.log('user object from context:', user);
    console.log('selectedFile:', selectedFile);

    const uid = user?._id || user?.id || user?.userId;
    console.log('resolved uid:', uid);

    if (!selectedFile) {
      console.warn('Upload aborted: No selected file.');
      return;
    }

    if (!uid) {
      console.warn('Upload aborted: User ID could not be found.');
      alert('Could not find your User ID. Please log out and back in.');
      return;
    }

    console.log('Proceeding with upload...');
    setIsUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('type', 'File');
      formData.append('value', selectedFile.name);
      formData.append('userId', uid);

      await API.post('/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSelectedFile(null);
      await fetchHistory();
    } catch (err: unknown) {
      console.error('Full upload error details:', err);
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(
        axiosErr?.response?.data?.message || 'Upload failed. Please try again.',
      );
    } finally {
      console.log(
        'Upload process completed or failed, setting isUploading to false',
      );
      setIsUploading(false);
    }
  };

  // ── Drag & Drop ──────────────────────────────────────────────
  const handleDrag = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') setSelectedFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  // ── Select Handler ────────────────────────────────────────────
  const handleSelectItem = (item: ResumeAnalysis): void => {
    setSelected(item);
  };

  const handleBack = (): void => {
    setSelected(null);
  };

  // ─── Render: Uploading State ────────────────────────────────
  if (isUploading) {
    return (
      <div className='ra-analyzing animate-fade-in-up'>
        <div className='ra-analyzing-spinner' />
        <p className='ra-analyzing-text'>Analyzing your resume…</p>
        <p className='ra-analyzing-sub'>
          Our AI is evaluating your resume. This usually takes 15–30 seconds.
        </p>
      </div>
    );
  }

  // ─── Render: Detail View ────────────────────────────────────
  if (selected !== null) {
    const a = selected.analysis;
    const scoreColor = getScoreColor(a.ats_score);

    return (
      <div className='ra-detail animate-fade-in-up'>
        {/* Back + title */}
        <div className='ra-detail-header'>
          <div>
            <h2 className='ra-detail-title'>{selected.fileName}</h2>
            <span className='ra-detail-meta'>
              Analyzed on {formatDate(selected.createdAt)}
            </span>
          </div>
          <button className='ra-detail-back' onClick={handleBack}>
            <svg
              width='14'
              height='14'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5 8.25 12l7.5-7.5'
              />
            </svg>
            Back
          </button>
        </div>

        {/* Score Hero */}
        <div className='ra-score-hero'>
          <svg className='ra-score-big-ring' viewBox='0 0 100 100'>
            <circle className='ra-score-big-bg' cx='50' cy='50' r={BIG_R} />
            <circle
              className={`ra-score-big-fill ra-ring--${scoreColor}`}
              cx='50'
              cy='50'
              r={BIG_R}
              strokeDasharray={BIG_C}
              strokeDashoffset={BIG_C - (a.ats_score / 100) * BIG_C}
            />
            <text className='ra-score-big-text' x='50' y='46'>
              {a.ats_score}
            </text>
            <text className='ra-score-big-label mt-10' x='50' y='70'>
              ATS Score
            </text>
          </svg>
          <div className='ra-score-info'>
            <h3>ATS Compatibility Score</h3>
            <p>{a.ats_score_reason}</p>
            <div className='ra-score-badges'>
              <span className='ra-badge ra-badge--indigo'>
                {a.experience_level}
              </span>
              <span className='ra-badge ra-badge--emerald'>
                {a.market_readiness}
              </span>
              <span className='ra-badge ra-badge--amber'>
                Confidence: {a.confidence_score}
              </span>
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div className='ra-meta-row'>
          <div className='ra-meta-card'>
            <p className='ra-meta-label'>Salary Estimate</p>
            <p className='ra-meta-value'>{a.salary_estimate}</p>
          </div>
          <div className='ra-meta-card'>
            <p className='ra-meta-label'>Recommended Roles</p>
            <p className='ra-meta-value'>{a.recommended_roles.join(', ')}</p>
          </div>
        </div>

        {/* Detail Grid */}
        <div className='ra-grid' style={{ marginTop: '1.5rem' }}>
          {/* Skills */}
          <div className='ra-panel ra-grid-full'>
            <h4 className='ra-panel-title'>
              <svg
                className='ra-panel-icon'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z'
                />
              </svg>
              Skills
            </h4>
            <div style={{ marginBottom: '0.75rem' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Technical
              </span>
              <div className='ra-tags' style={{ marginTop: '0.35rem' }}>
                {a.skills.technical.map((s) => (
                  <span key={s} className='ra-tag ra-tag--tech'>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '0.75rem' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Soft Skills
              </span>
              <div className='ra-tags' style={{ marginTop: '0.35rem' }}>
                {a.skills.soft.map((s) => (
                  <span key={s} className='ra-tag ra-tag--soft'>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Tools
              </span>
              <div className='ra-tags' style={{ marginTop: '0.35rem' }}>
                {a.skills.tools.map((s) => (
                  <span key={s} className='ra-tag ra-tag--tool'>
                    {s}
                  </span>
                ))}
              </div>
            </div>
            {a.missing_skills.length > 0 && (
              <div style={{ marginTop: '0.75rem' }}>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Missing Skills
                </span>
                <div className='ra-tags' style={{ marginTop: '0.35rem' }}>
                  {a.missing_skills.map((s) => (
                    <span key={s} className='ra-tag ra-tag--missing'>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Strengths */}
          <div className='ra-panel'>
            <h4 className='ra-panel-title'>
              <svg
                className='ra-panel-icon'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              Strengths
            </h4>
            <ul className='ra-list'>
              {a.strengths.map((s, i) => (
                <li key={i}>
                  <span className='ra-list-dot ra-list-dot--green' />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className='ra-panel'>
            <h4 className='ra-panel-title'>
              <svg
                className='ra-panel-icon'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z'
                />
              </svg>
              Weaknesses
            </h4>
            <ul className='ra-list'>
              {a.weaknesses.map((s, i) => (
                <li key={i}>
                  <span className='ra-list-dot ra-list-dot--red' />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Resume Issues */}
          <div className='ra-panel'>
            <h4 className='ra-panel-title'>
              <svg
                className='ra-panel-icon'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z'
                />
              </svg>
              Resume Issues
            </h4>
            <ul className='ra-list'>
              {a.resume_issues.map((s, i) => (
                <li key={i}>
                  <span className='ra-list-dot ra-list-dot--amber' />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Improvement Suggestions */}
          <div className='ra-panel'>
            <h4 className='ra-panel-title'>
              <svg
                className='ra-panel-icon'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
                />
              </svg>
              Improvement Suggestions
            </h4>
            <ul className='ra-list'>
              {a.improvement_suggestions.map((s, i) => (
                <li key={i}>
                  <span className='ra-list-dot ra-list-dot--blue' />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Top 3 Fast Growth */}
          <div className='ra-panel'>
            <h4 className='ra-panel-title'>
              <svg
                className='ra-panel-icon'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z'
                />
              </svg>
              Top 3 for Fast Growth
            </h4>
            <ul className='ra-list'>
              {a.top_3_improvements_for_fast_growth.map((s, i) => (
                <li key={i}>
                  <span className='ra-list-dot ra-list-dot--cyan' />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Keyword Optimization */}
          <div className='ra-panel'>
            <h4 className='ra-panel-title'>
              <svg
                className='ra-panel-icon'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                />
              </svg>
              Keyword Optimization
            </h4>
            <ul className='ra-list'>
              {a.keyword_optimization_tips.map((s, i) => (
                <li key={i}>
                  <span className='ra-list-dot ra-list-dot--blue' />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Project Suggestions */}
          {a.project_suggestions.length > 0 && (
            <div className='ra-panel'>
              <h4 className='ra-panel-title'>
                <svg
                  className='ra-panel-icon'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z'
                  />
                </svg>
                Project Suggestions
              </h4>
              <ul className='ra-list'>
                {a.project_suggestions.map((s, i) => (
                  <li key={i}>
                    <span className='ra-list-dot ra-list-dot--green' />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Rewrite Tips */}
          <div className='ra-panel ra-grid-full'>
            <h4 className='ra-panel-title'>
              <svg
                className='ra-panel-icon'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                />
              </svg>
              Rewrite Tips
            </h4>
            <div className='ra-tips-grid'>
              {(Object.entries(a.rewrite_tips) as [string, string][]).map(
                ([key, value]) => (
                  <div key={key} className='ra-tip-card'>
                    <p className='ra-tip-label'>{key.replace('_', ' ')}</p>
                    <p className='ra-tip-text'>{value}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── Render: Main View (Upload + History) ───────────────────
  return (
    <div className='animate-fade-in-up'>
      {/* Page Header */}
      <div className='ra-page-header'>
        <div>
          <h1 className='ra-page-title'>
            Resume <span className='gradient-text'>Analysis</span>
          </h1>
          <p className='ra-page-subtitle'>
            Upload your resume and get AI-powered insights to improve your
            career prospects.
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`ra-upload-area ${dragActive ? 'ra-drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !selectedFile && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type='file'
          accept='.pdf'
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        <div className='ra-upload-icon'>
          <svg
            width='24'
            height='24'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={1.5}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5'
            />
          </svg>
        </div>

        {selectedFile ? (
          <>
            <div className='ra-selected-file'>
              <svg
                width='16'
                height='16'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
                />
              </svg>
              <span className='ra-selected-file-name'>{selectedFile.name}</span>
              <button
                className='ra-selected-file-remove'
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
              >
                <svg
                  width='14'
                  height='14'
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
            <button
              className='ra-upload-btn'
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Analyze Resume button clicked!');
                handleUpload();
              }}
              disabled={isUploading}
            >
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
                  d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z'
                />
              </svg>
              Analyze Resume
            </button>
          </>
        ) : (
          <>
            <p className='ra-upload-title'>
              {dragActive ? 'Drop your resume here' : 'Drag & drop your resume'}
            </p>
            <p className='ra-upload-subtitle'>or click to browse files</p>
          </>
        )}

        <p className='ra-upload-formats'>Supported format: PDF</p>
      </div>

      {error && (
        <p
          style={{
            color: '#f87171',
            fontSize: '0.82rem',
            marginTop: '0.75rem',
          }}
        >
          {error}
        </p>
      )}

      {/* History */}
      <h2 className='ra-section-title'>Past Analyses</h2>

      {isLoading ? (
        <div className='ra-empty'>
          <div className='ra-analyzing-spinner' />
          <p className='ra-empty-text'>Loading your resume history…</p>
        </div>
      ) : history.length === 0 ? (
        <div className='ra-empty'>
          <svg
            className='ra-empty-icon'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={1.5}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
            />
          </svg>
          <p className='ra-empty-text'>
            No analyses yet. Upload a resume to get started!
          </p>
        </div>
      ) : (
        <div className='ra-history-grid'>
          {history.map((item: ResumeAnalysis) => {
            const score = item.analysis.ats_score;
            const color = getScoreColor(score);
            return (
              <div
                key={item._id}
                className='ra-history-card'
                onClick={() => handleSelectItem(item)}
              >
                <div className='ra-history-top'>
                  <span className='ra-history-filename'>{item.fileName}</span>
                  <span className='ra-history-date'>
                    {formatDate(item.createdAt)}
                  </span>
                </div>
                <div className='ra-history-bottom'>
                  <div className='ra-history-score'>
                    <svg className='ra-score-ring' viewBox='0 0 36 36'>
                      <circle
                        className='ra-score-ring-bg'
                        cx='18'
                        cy='18'
                        r={RING_R}
                      />
                      <circle
                        className={`ra-score-ring-fill ra-ring--${color}`}
                        cx='18'
                        cy='18'
                        r={RING_R}
                        strokeDasharray={RING_C}
                        strokeDashoffset={RING_C - (score / 100) * RING_C}
                      />
                    </svg>
                    <span className='ra-score-value'>{score}/100</span>
                  </div>
                  <span className='ra-history-level'>
                    {item.analysis.experience_level}
                  </span>
                </div>
                <div className='ra-history-roles'>
                  {item.analysis.recommended_roles.map((role: string) => (
                    <span key={role} className='ra-history-role-tag'>
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
