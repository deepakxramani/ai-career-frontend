'use client';

import { useState } from 'react';
import JobDescriptionForm from './components/JobDescriptionForm';
import FitAnalysis from './components/FitAnalysis';
import HistorySection from './components/HistorySection';
import { useJobFit } from '@/src/hooks/useJobFit';

export default function JobFitPage() {
  const [jobDescription, setJobDescription] = useState('');

  const { analysis, loading, analyze } = useJobFit();

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      alert('Please paste a job description.');
      return;
    }

    await analyze(jobDescription);
  };

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] py-10 px-5">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-white">
            Job Fit Analyzer
          </h1>

          <p className="mt-2 max-w-2xl text-[var(--text-secondary)]">
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
          <FitAnalysis analysis={analysis} />
        )}

        {/* History */}
        <HistorySection />
      </div>
    </main>
  );
}