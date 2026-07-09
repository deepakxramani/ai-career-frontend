import { useState } from 'react';
import { analyzeJobFit } from '@/src/services/job-fit.service';
import { JobFitResponse } from '@/src/types/job-fit';
import { useAuth } from '@/src/context/AuthContext';

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
        try {
            setLoading(true);

            const result = await analyzeJobFit(jobDescription, uid);

            setAnalysis(normalizeAnalysis(result));
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        analysis,
        analyze,
    };
}