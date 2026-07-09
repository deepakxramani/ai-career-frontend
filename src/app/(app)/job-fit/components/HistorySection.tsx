import { useEffect, useState } from 'react';
import { getJobFitHistory } from '@/src/services/job-fit.service';
import { JobFitHistory } from '@/src/types/job-fit';
import { useAuth } from '@/src/context/AuthContext';

export default function HistorySection() {
    const { user } = useAuth();
    const [history, setHistory] = useState<JobFitHistory[]>([]);
    const [loading, setLoading] = useState(true);

    const uid = user?._id || user?.id || user?.userId;

    useEffect(() => {
        if (uid) {
            fetchHistory(uid);
        } else {
            setLoading(false);
        }
    }, [uid]);

    const fetchHistory = async (userId: string) => {
        try {
            const data = await getJobFitHistory(userId);
            setHistory(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="glass-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6">
                <div className="h-6 w-56 animate-pulse rounded bg-[var(--bg-primary)]" />

                <div className="mt-6 space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-24 animate-pulse rounded-xl bg-[var(--bg-primary)]"
                        />
                    ))}
                </div>
            </section>
        );
    }

    if (!history.length) {
        return (
            <section className="glass-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-10 text-center">
                <h2 className="text-2xl font-semibold text-white">
                    Previous Analyses
                </h2>

                <p className="mt-4 text-[var(--text-secondary)]">
                    No previous Job Fit analyses found.
                </p>
            </section>
        );
    }

    return (
        <section className="glass-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-6 shadow-lg">

            <div className="mb-6 flex items-center justify-between">

                <h2 className="text-2xl font-semibold text-white">
                    Previous Analyses
                </h2>

                <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs text-indigo-400">
                    {history.length} Analyses
                </span>

            </div>

            <div className="space-y-4">

                {history.map((item) => {
                    const matchScore = item.matchScore ?? (item as any).result?.matchScore ?? 0;
                    const jobTitle = item.role || item.jobTitle || (item as any).result?.jobTitle || 'Unknown Role';
                    const company = item.company || (item as any).result?.company || 'Unknown Company';
                    
                    return (
                        <div
                            key={item._id}
                            className="
                  rounded-xl
                  border
                  border-[var(--border-subtle)]
                  bg-[var(--bg-primary)]
                  p-5
                  transition-all
                  duration-200
                  hover:border-indigo-500/50
                  hover:-translate-y-1
                "
                        >
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                <div>

                                    <h3 className="text-lg font-semibold text-white">
                                        {jobTitle}
                                    </h3>

                                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                                        {company}
                                    </p>

                                    <p className="mt-3 text-xs text-[var(--text-muted)]">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </p>

                                </div>

                                <div className="text-center">

                                    <div className="text-4xl font-bold text-indigo-400">
                                        {matchScore}%
                                    </div>

                                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                                        Match Score
                                    </p>

                                </div>

                            </div>
                        </div>
                    );
                })}

            </div>
        </section>
    );
}