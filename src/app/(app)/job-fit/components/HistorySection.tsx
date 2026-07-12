'use client';

import { useEffect, useState } from 'react';
import { getJobFitHistory, deleteJobFitRecord } from '@/src/services/job-fit.service';
import { JobFitHistory } from '@/src/types/job-fit';
import { useAuth } from '@/src/context/AuthContext';
import ConfirmModal from '@/src/components/shared/ConfirmModal';
import toast from 'react-hot-toast';

interface HistorySectionProps {
    onSelect?: (item: JobFitHistory) => void;
    onDelete?: (id: string) => void;
    selectedId?: string;
}

export default function HistorySection({
    onSelect,
    onDelete,
    selectedId,
}: HistorySectionProps) {
    const { user } = useAuth();
    const [history, setHistory] = useState<JobFitHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [recordIdToDelete, setRecordIdToDelete] = useState<string | null>(null);

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

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation(); // Prevent triggering onSelect
        setRecordIdToDelete(id);
        setIsConfirmOpen(true);
    };

    const executeDelete = async () => {
        if (!recordIdToDelete) return;

        try {
            setDeletingId(recordIdToDelete);
            setIsConfirmOpen(false); // Close modal early for smooth feedback
            await deleteJobFitRecord(recordIdToDelete);
            setHistory((prev) => prev.filter((item) => item._id !== recordIdToDelete));
            onDelete?.(recordIdToDelete);
            toast.success('Analysis record deleted successfully');
        } catch (error) {
            console.error('Failed to delete record:', error);
            toast.error('Failed to delete analysis record. Please try again.');
        } finally {
            setDeletingId(null);
            setRecordIdToDelete(null);
        }
    };

    if (loading) {
        return (
            <section className="glass-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4 sm:p-6">
                <div className="h-5 w-48 animate-pulse rounded bg-[var(--bg-primary)]" />

                <div className="mt-5 space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-16 sm:h-24 animate-pulse rounded-xl bg-[var(--bg-primary)]"
                        />
                    ))}
                </div>
            </section>
        );
    }

    if (!history.length) {
        return (
            <section className="glass-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4 sm:p-10 text-center">
                <h2 className="text-lg sm:text-2xl font-semibold text-white">
                    Previous Analyses
                </h2>

                <p className="mt-3 text-xs sm:text-base text-[var(--text-secondary)]">
                    No previous Job Fit analyses found.
                </p>
            </section>
        );
    }

    return (
        <section className="glass-card rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5 sm:p-6 shadow-lg">

            <div className="mb-5 sm:mb-6 flex items-center justify-between">

                <h2 className="text-xl sm:text-2xl font-semibold text-white">
                    Previous Analyses
                </h2>

                <span className="rounded-full bg-indigo-500/15 px-3 py-1 text-xs text-indigo-400">
                    {history.length} Analyses
                </span>

            </div>

            <div className="space-y-4">

                {history.map((item) => {
                    const matchScore = item.matchScore ?? 0;
                    const jobTitle = item.jobTitle || 'Unknown Role';
                    const company = item.company || 'Unknown Company';
                    const isSelected = selectedId === item._id;
                    const isDeleting = deletingId === item._id;

                    return (
                        <div
                            key={item._id}
                            onClick={() => onSelect?.(item)}
                            className={`
                  group
                  relative
                  rounded-xl
                  border
                  p-5
                  transition-all
                  duration-200
                  hover:-translate-y-1
                  ${onSelect ? 'cursor-pointer' : ''}
                  ${isSelected
                                    ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/30'
                                    : 'border-[var(--border-subtle)] bg-[var(--bg-primary)] hover:border-indigo-500/50'
                                }
                  ${isDeleting ? 'pointer-events-none opacity-50' : ''}
                `}
                        >
                        <div className="flex items-center justify-between gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">

                                <div className="flex-1 min-w-0">

                                    <h3 className="text-sm sm:text-lg font-semibold text-white truncate">
                                        {jobTitle}
                                    </h3>

                                    <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-[var(--text-secondary)] truncate">
                                        {company}
                                    </p>

                                    <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-[var(--text-muted)]">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </p>

                                </div>

                                <div className="flex items-center gap-2 sm:gap-4 shrink-0">

                                    <div className="text-center">

                                        <div className="text-2xl sm:text-4xl font-bold text-indigo-400">
                                            {matchScore}%
                                        </div>

                                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                                            Match
                                        </p>

                                    </div>

                                    {/* Delete button — always visible on touch, hover-only on desktop */}
                                    <button
                                        onClick={(e) => handleDelete(e, item._id)}
                                        disabled={isDeleting}
                                        title="Delete analysis"
                                        className="
                      flex h-9 w-9 shrink-0 items-center justify-center
                      rounded-lg border border-transparent
                      text-[var(--text-muted)]
                      opacity-100 sm:opacity-0 sm:group-hover:opacity-100
                      transition-all duration-200
                      hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400
                      focus:opacity-100 focus:outline-none focus:ring-1 focus:ring-red-500/30
                    "
                                    >
                                        {isDeleting ? (
                                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        )}
                                    </button>

                                    {onSelect && (
                                        <div className="flex items-center">
                                            <svg
                                                className={`h-5 w-5 transition-colors ${isSelected ? 'text-indigo-400' : 'text-[var(--text-muted)]'}`}
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </div>
                                    )}

                                </div>

                            </div>
                        </div>
                    );
                })}

            </div>

            <ConfirmModal
                isOpen={isConfirmOpen}
                title="Delete Job Fit Analysis?"
                message="Are you sure you want to delete this job fit analysis record? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={executeDelete}
                onCancel={() => {
                    setIsConfirmOpen(false);
                    setRecordIdToDelete(null);
                }}
                isLoading={deletingId !== null && deletingId === recordIdToDelete}
            />
        </section>
    );
}