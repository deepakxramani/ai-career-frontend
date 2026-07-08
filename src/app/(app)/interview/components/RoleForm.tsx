'use client';

import type { ExperienceLevel } from '@/src/types/interview';

const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  'Fresher',
  'Junior',
  'Mid-Level',
  'Senior',
];

const ROLE_SUGGESTIONS = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Data Scientist',
  'Mobile Developer',
  'UI/UX Designer',
  'Cloud Architect',
];

interface RoleFormProps {
  role: string;
  setRole: (role: string) => void;
  experience: ExperienceLevel;
  setExperience: (exp: ExperienceLevel) => void;
  resumeText: string;
  setResumeText: (text: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export default function RoleForm({
  role,
  setRole,
  experience,
  setExperience,
  resumeText,
  setResumeText,
  onGenerate,
  isLoading,
}: RoleFormProps) {
  return (
    <div className='iv-setup-card animate-fade-in-up'>
      {/* Role Input */}
      <div className='iv-form-group'>
        <label className='iv-form-label'>Job Role</label>
        <input
          className='iv-form-input'
          type='text'
          placeholder='e.g. Senior Frontend Developer'
          value={role}
          onChange={(e) => setRole(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isLoading) onGenerate();
          }}
        />
        <div className='iv-role-suggestions'>
          {ROLE_SUGGESTIONS.map((r) => (
            <button
              key={r}
              className='iv-role-chip'
              onClick={() => setRole(r)}
              type='button'
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className='iv-form-group'>
        <label className='iv-form-label'>Experience Level</label>
        <div className='iv-exp-grid'>
          {EXPERIENCE_LEVELS.map((level) => (
            <button
              key={level}
              className={`iv-exp-btn ${experience === level ? 'active' : ''}`}
              onClick={() => setExperience(level)}
              type='button'
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Resume Text (Optional) */}
      <div className='iv-form-group'>
        <label className='iv-form-label'>
          Resume Text
          <span className='iv-optional-tag'>(optional — improves relevance)</span>
        </label>
        <textarea
          className='iv-form-textarea'
          placeholder='Paste your resume text here for more personalized questions...'
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
        />
      </div>

      {/* Generate Button */}
      <button
        className='iv-btn-primary'
        onClick={onGenerate}
        disabled={isLoading || !role.trim()}
      >
        {isLoading ? (
          <>
            <svg
              className='animate-spin-slow'
              width='16'
              height='16'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182'
              />
            </svg>
            Generating…
          </>
        ) : (
          <>
            <svg
              width='16'
              height='16'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z'
              />
            </svg>
            Generate Interview
          </>
        )}
      </button>
    </div>
  );
}
