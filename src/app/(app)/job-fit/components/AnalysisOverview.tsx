'use client';

import { JobFitResponse } from '@/src/types/job-fit';

interface AnalysisOverviewProps {
    analysis: JobFitResponse;
}

export default function AnalysisOverview({
    analysis,
}: AnalysisOverviewProps) {
    const getMatchBadge = () => {
        switch (analysis.matchLevel) {
            case 'Strong':
                return 'bg-green-500/15 text-green-400 border-green-500/30';

            case 'Moderate':
                return 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30';

            case 'Weak':
                return 'bg-red-500/15 text-red-400 border-red-500/30';

            default:
                return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
        }
    };

    const StatCard = ({
        title,
        value,
        color,
    }: {
        title: string;
        value: string | number;
        color?: string;
    }) => (
        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-3 sm:p-5">
            <p className="text-xs sm:text-sm text-[var(--text-muted)]">{title}</p>

            <h3 className={`mt-1 sm:mt-2 text-lg sm:text-2xl font-bold ${color ?? 'text-white'}`}>
                {value}
            </h3>
        </div>
    );

    return (
        <section className="glass-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5 sm:p-8 shadow-lg">

            {/* Header */}

            <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs sm:text-sm font-medium ${getMatchBadge()}`}
                    >
                        {analysis.matchLevel} Match
                    </span>

                    <h2 className="mt-2 sm:mt-4 text-3xl sm:text-5xl font-extrabold text-white">
                        {analysis.matchScore ?? 0}%
                    </h2>

                    <p className="mt-1 sm:mt-2 text-xs sm:text-base text-[var(--text-secondary)]">
                        Overall Resume Fit
                    </p>

                </div>

                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-4 sm:px-6 py-4 sm:py-5">

                    <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                        Recommendation
                    </p>

                    <h3
                        className={`mt-1 sm:mt-2 text-base sm:text-2xl font-bold ${analysis.shouldApply
                                ? 'text-green-400'
                                : 'text-red-400'
                            }`}
                    >
                        {analysis.shouldApply
                            ? '✅ Apply'
                            : '❌ Improve Before Applying'}
                    </h3>

                </div>

            </div>

            {/* Stats */}

            <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">

                <StatCard
                    title="ATS Score"
                    value={`${analysis.estimatedATSScore ?? 0}%`}
                    color="text-indigo-400"
                />

                <StatCard
                    title="Experience Match"
                    value={analysis.experienceMatch || 'N/A'}
                    color="text-cyan-400"
                />

                <StatCard
                    title="Education Match"
                    value={analysis.educationMatch || 'N/A'}
                    color="text-purple-400"
                />

            </div>

            {/* Summary */}

            <div className="mt-5 sm:mt-8 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4 sm:p-6">

                <h3 className="text-sm sm:text-lg font-semibold text-white">
                    AI Summary
                </h3>

                <p className="mt-2 sm:mt-3 text-xs sm:text-base leading-6 sm:leading-7 text-[var(--text-secondary)]">
                    {analysis.summary}
                </p>

            </div>

        </section>
    );
}