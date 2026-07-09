import api from "@/src/lib/api";
import { JobFitResponse } from "@/src/types/job-fit";

export const analyzeJobFit = async (
    jobDescription: string,
    userId: string
): Promise<JobFitResponse> => {
    const res = await api.post("/jobs/match", {
        jobDescription,
        userId,
    });

    return res.data;
};

export const getJobFitHistory = async (userId: string) => {
    const res = await api.get(`/jobs/history/${userId}`);

    return res.data;
};

export const deleteJobFitRecord = async (id: string) => {
    const res = await api.delete(`/jobs/${id}`);

    return res.data;
};