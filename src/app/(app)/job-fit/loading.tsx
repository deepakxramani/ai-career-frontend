export default function Loading() {
    return (
        <main className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
            <div className="glass-card rounded-2xl p-10 max-w-lg w-full text-center">

                <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />

                <h2 className="mt-8 text-3xl font-bold text-white">
                    AI is analyzing...
                </h2>

                <p className="mt-3 text-[var(--text-secondary)]">
                    Comparing your resume with the job description.
                </p>

                <div className="mt-8 space-y-4 text-left">

                    {[
                        'Reading job description',
                        'Comparing technical skills',
                        'Checking ATS keywords',
                        'Evaluating experience',
                        'Generating recommendations',
                    ].map((step) => (
                        <div
                            key={step}
                            className="flex items-center gap-3"
                        >
                            <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />

                            <span className="text-sm text-[var(--text-secondary)]">
                                {step}
                            </span>
                        </div>
                    ))}

                </div>
            </div>
        </main>
    );
}