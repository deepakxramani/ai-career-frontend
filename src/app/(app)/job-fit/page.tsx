'use client';

import { useRef, useState } from 'react';
import JobDescriptionForm from './components/JobDescriptionForm';
import FitAnalysis from './components/FitAnalysis';
import HistorySection from './components/HistorySection';
import { useJobFit } from '@/src/hooks/useJobFit';
import { JobFitHistory } from '@/src/types/job-fit';

export default function JobFitPage() {
  const [jobDescription, setJobDescription] = useState('');
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const analysisRef = useRef<HTMLDivElement>(null);

  const { analysis, loading, analyze, loadFromHistory, clearAnalysis } = useJobFit();

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      alert('Please paste a job description.');
      return;
    }

    setSelectedHistoryId(null);
    await analyze(jobDescription);

    // Scroll to analysis after it renders
    setTimeout(() => {
      analysisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleHistorySelect = (item: JobFitHistory) => {
    setSelectedHistoryId(item._id);
    loadFromHistory(item);

    // Scroll to the analysis section
    setTimeout(() => {
      analysisRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleHistoryDelete = (id: string) => {
    // If the deleted item is currently being viewed, clear the analysis
    if (selectedHistoryId === id) {
      setSelectedHistoryId(null);
      clearAnalysis();
    }
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] py-6 px-4 sm:py-10 sm:px-5">
      <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white">
            Job Fit Analyzer
          </h1>

          <p className="mt-2 max-w-2xl text-sm sm:text-base text-[var(--text-secondary)]">
            Analyze how well your resume matches any job description and
            receive AI-powered recommendations to improve your chances of
            getting shortlisted.
          </p>
        </div>

        {/* Job Description Form */}
        <JobDescriptionForm
          value={jobDescription}
          loading={loading}
          onChange={setJobDescription}
          onSubmit={handleAnalyze}
        />

        {/* Analysis */}
        {analysis && (
          <div ref={analysisRef}>
            <FitAnalysis analysis={analysis} />
          </div>
        )}

        {/* History */}
        <HistorySection
          onSelect={handleHistorySelect}
          onDelete={handleHistoryDelete}
          selectedId={selectedHistoryId ?? undefined}
        />
      </div>
    </main>
  );
}