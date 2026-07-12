'use client';

interface NextStepsCardProps {
    shouldApply: boolean;
}

export default function NextStepsCard({
    shouldApply,
}: NextStepsCardProps) {
    return (
        <section className="glass-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5 sm:p-6 shadow-lg">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-indigo-500/15 shrink-0">
                    <svg
                        className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 7l5 5-5 5M6 7l5 5-5 5"
                        />
                    </svg>
                </div>

                <div>
                    <h2 className="text-lg sm:text-xl font-semibold text-white">
                        Recommended Next Steps
                    </h2>

                    <p className="text-sm text-[var(--text-secondary)]">
                        Based on your AI analysis
                    </p>
                </div>
            </div>

            <div className="mt-5 sm:mt-6 grid gap-3 sm:gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-3 sm:p-5">
                    <h3 className="text-xs sm:text-sm font-semibold text-white">
                        {shouldApply
                            ? '🚀 Ready to Apply'
                            : '🛠 Improve First'}
                    </h3>

                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                        {shouldApply
                            ? 'Your profile is a good fit. Consider applying while continuing to improve your skills.'
                            : 'Strengthen the highlighted areas before applying to increase your chances.'}
                    </p>
                </div>

                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-3 sm:p-5">
                    <h3 className="text-xs sm:text-sm font-semibold text-white">
                        Resume Improvement
                    </h3>

                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                        Update your resume to include projects, measurable achievements,
                        and keywords that match this job description.
                    </p>
                </div>

                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-3 sm:p-5">
                    <h3 className="text-xs sm:text-sm font-semibold text-white">
                        Interview Preparation
                    </h3>

                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                        Practice interview questions based on this role to improve your
                        confidence before applying.
                    </p>
                </div>

                <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-3 sm:p-5">
                    <h3 className="text-xs sm:text-sm font-semibold text-white">
                        Keep Learning
                    </h3>

                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[var(--text-secondary)]">
                        Focus on the missing skills identified by AI and build at least one
                        portfolio project demonstrating those technologies.
                    </p>
                </div>
            </div>
        </section>
    );
}