'use client';

interface SkillListProps {
    title: string;
    skills: string[];
    type?: 'success' | 'danger';
}

export default function SkillList({
    title,
    skills,
    type = 'success',
}: SkillListProps) {
    const icon =
        type === 'success' ? (
            <svg
                className="h-5 w-5 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                />
            </svg>
        ) : (
            <svg
                className="h-5 w-5 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        );

    return (
        <section className="glass-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 shadow-lg">
            <h3 className="mb-5 text-xl font-semibold text-white">
                {title}
            </h3>

            {skills?.length === 0 ? (
                <p className="text-sm text-[var(--text-muted)]">
                    No data available.
                </p>
            ) : (
                <div className="flex flex-wrap gap-3">
                    {skills?.map((skill) => (
                        <div
                            key={skill}
                            className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--border-subtle)]
                bg-[var(--bg-primary)]
                px-4
                py-2
                transition-all
                duration-200
                hover:border-[var(--accent-mid)]
                hover:-translate-y-0.5
              "
                        >
                            {icon}

                            <span className="text-sm text-white">
                                {skill}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}