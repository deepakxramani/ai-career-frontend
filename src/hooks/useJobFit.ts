import { useState } from 'react';
import { analyzeJobFit } from '@/src/services/job-fit.service';
import { JobFitResponse } from '@/src/types/job-fit';
import { useAuth } from '@/src/context/AuthContext';
import toast from 'react-hot-toast';

/**
 * Normalize AI response to match the JobFitResponse interface.
 * Handles snake_case keys and alternate field names from the API.
 */
function normalizeAnalysis(data: any): JobFitResponse {
    return {
        matchScore: data.matchScore ?? data.match_score ?? 0,
        matchLevel: data.matchLevel || data.match_level || deriveMatchLevel(data.matchScore ?? data.match_score ?? 0),
        shouldApply: data.shouldApply ?? data.should_apply ?? false,
        summary: data.summary || '',
        estimatedATSScore: data.estimatedATSScore ?? data.estimated_ats_score ?? data.atsScore ?? data.ats_score ?? 0,
        experienceMatch: data.experienceMatch || data.experience_match || '',
        educationMatch: data.educationMatch || data.education_match || '',
        strengths: data.strengths || [],
        missingSkills: data.missingSkills || data.missing_skills || [],
        recommendations: data.recommendations || data.suggestions || [],
    };
}

function deriveMatchLevel(score: number): 'Strong' | 'Moderate' | 'Weak' {
    if (score >= 70) return 'Strong';
    if (score >= 40) return 'Moderate';
    return 'Weak';
}

export function useJobFit() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [analysis, setAnalysis] =
        useState<JobFitResponse | null>(null);

    const analyze = async (jobDescription: string) => {
        const uid = user?._id || user?.id || user?.userId || 'demo-user';
        setLoading(true);

        const analysisPromise = analyzeJobFit(jobDescription, uid);

        toast.promise(analysisPromise, {
            loading: 'Analyzing your job fit...',
            success: 'Analysis completed successfully!',
            error: (err) => {
                const errMsg = err?.response?.data?.message || err?.message || 'Failed to analyze job description';
                return `Error: ${errMsg}`;
            }
        });

        try {
            const result = await analysisPromise;
            setAnalysis(normalizeAnalysis(result));
        } catch (error) {
            console.error('Failed to analyze job fit:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadFromHistory = (historyItem: any) => {
        setAnalysis(normalizeAnalysis(historyItem));
    };

    const clearAnalysis = () => {
        setAnalysis(null);
    };

    return {
        loading,
        analysis,
        analyze,
        loadFromHistory,
        clearAnalysis,
    };
}