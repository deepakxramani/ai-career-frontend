import { JobFitResponse } from '@/src/types/job-fit';
import AnalysisOverview from './AnalysisOverview';
import SkillList from './SkillList';
import RecommendationList from './RecommendationList';
import NextStepsCard from './NextStepsCard';

interface FitAnalysisProps {
    analysis: JobFitResponse;
}

export default function FitAnalysis({
    analysis,
}: FitAnalysisProps) {
    return (
        <section className="space-y-8 animate-fade-in-up">
            <AnalysisOverview analysis={analysis} />

            <div className="grid gap-6 lg:grid-cols-2">
                <SkillList
                    title="Your Strengths"
                    skills={analysis.strengths}
                />

                <SkillList
                    title="Missing Skills"
                    skills={analysis.missingSkills}
                    type="danger"
                />
            </div>

            <RecommendationList
                recommendations={analysis.recommendations}
            />

            <NextStepsCard
                shouldApply={analysis.shouldApply}
            />
        </section>
    );
}