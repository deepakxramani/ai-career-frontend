import api from "@/src/lib/api";

export interface DashboardData {
    stats: {
        resumeScore: number;
        jobsMatched: number;
        interviewsPracticed: number;
        profileStrength: number;
    };
    skills: Array<{
        name: string;
        percent: number;
        variant: string;
    }>;
    activities: Array<{
        text: string;
        time: string;
        dotVariant: string;
    }>;
}

export const getDashboardStats = async (userId: string): Promise<DashboardData> => {
    const res = await api.get(`/dashboard/stats/${userId}`);
    return res.data;
};
