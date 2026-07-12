'use client';

interface RecommendationListProps {
    recommendations: string[];
}

export default function RecommendationList({
    recommendations,
}: RecommendationListProps) {
    return (
        <section className="glass-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5 sm:p-6 shadow-lg">
            <div className="mb-4 sm:mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-yellow-500/15 shrink-0">
                    <svg
                        className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3a7 7 0 00-4 12.75V18a1 1 0 001 1h6a1 1 0 001-1v-2.25A7 7 0 0012 3z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 21h6"
                        />
                    </svg>
                </div>

                <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">
                        AI Recommendations
                    </h3>

                    <p className="text-sm text-[var(--text-secondary)]">
                        Improve your chances of getting shortlisted.
                    </p>
                </div>
            </div>

            {recommendations?.length === 0 ? (
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                    No recommendations available.
                </p>
            ) : (
                <div className="space-y-3 sm:space-y-4">
                    {recommendations?.map((recommendation, index) => (
                        <div
                            key={index}
                            className="
                flex
                items-start
                gap-3 sm:gap-4
                rounded-xl
                border
                border-[var(--border-subtle)]
                bg-[var(--bg-primary)]
                p-3 sm:p-4
                transition-all
                duration-200
                hover:border-[var(--accent-mid)]
                hover:-translate-y-0.5
              "
                        >
                            <div className="mt-0.5 flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/15">
                                <span className="text-xs sm:text-sm font-bold text-indigo-400">
                                    {index + 1}
                                </span>
                            </div>

                            <p className="text-xs sm:text-base leading-5 sm:leading-7 text-[var(--text-secondary)]">
                                {recommendation}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}