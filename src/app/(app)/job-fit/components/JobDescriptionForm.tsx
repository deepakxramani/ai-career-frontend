'use client';

import { useMemo } from 'react';

interface JobDescriptionFormProps {
    value: string;
    loading: boolean;
    onChange: (value: string) => void;
    onSubmit: () => void;
}

const MAX_CHARACTERS = 10000;

export default function JobDescriptionForm({
    value,
    loading,
    onChange,
    onSubmit,
}: JobDescriptionFormProps) {
    const characters = useMemo(() => value.length, [value]);

    const disabled = loading || !value.trim();

    return (
        <section className="glass-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 shadow-lg">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white">
                    Paste Job Description
                </h2>

                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    Paste the complete job description from any company. We'll compare it
                    against your saved resume and provide personalized recommendations.
                </p>
            </div>

            {/* Textarea */}
            <div className="space-y-3">
                <textarea
                    rows={14}
                    value={value}
                    maxLength={MAX_CHARACTERS}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Paste the complete job description here..."
                    className="
            w-full
            resize-none
            rounded-xl
            border
            border-[var(--border-subtle)]
            bg-[var(--bg-primary)]
            p-4
            text-sm
            text-white
            outline-none
            transition
            duration-200
            placeholder:text-[var(--text-muted)]
            focus:border-[var(--accent-mid)]
            focus:ring-2
            focus:ring-[var(--accent-mid)]/20
          "
                />

                <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)]">
                        {characters.toLocaleString()} / {MAX_CHARACTERS.toLocaleString()} characters
                    </span>

                    <span className="text-xs text-[var(--text-muted)]">
                        Supports job descriptions from LinkedIn, Indeed, Naukri, Wellfound,
                        company career pages, and more.
                    </span>
                </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={onSubmit}
                    disabled={disabled}
                    className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-r
            from-indigo-600
            to-violet-600
            px-8
            py-3
            font-medium
            text-white
            transition-all
            duration-200
            hover:scale-[1.02]
            hover:shadow-lg
            disabled:cursor-not-allowed
            disabled:opacity-50
            disabled:hover:scale-100
          "
                >
                    {loading ? (
                        <>
                            <svg
                                className="mr-2 h-5 w-5 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-20"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />

                                <path
                                    className="opacity-90"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>

                            Analyzing...
                        </>
                    ) : (
                        'Analyze Job Fit'
                    )}
                </button>
            </div>
        </section>
    );
}