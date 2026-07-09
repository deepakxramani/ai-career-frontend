export interface JobFitResponse {
    matchScore: number;
    matchLevel: 'Strong' | 'Moderate' | 'Weak';
    shouldApply: boolean;
    summary: string;
    estimatedATSScore: number;
    experienceMatch: string;
    educationMatch: string;
    strengths: string[];
    missingSkills: string[];
    recommendations: string[];
}

export interface JobFitHistory extends JobFitResponse {
    _id: string;
    createdAt: string;
    jobTitle?: string;
    company?: string;
    jobDescription?: string;
    role?: string;
}