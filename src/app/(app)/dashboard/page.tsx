'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import { getDashboardStats, DashboardData } from '@/src/services/dashboard.service';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const uid = user?._id || user?.id || user?.userId;

  useEffect(() => {
    setMounted(true);
    if (uid) {
      fetchDashboard(uid);
    } else {
      setLoading(false);
    }
  }, [uid]);

  const fetchDashboard = async (userId: string) => {
    try {
      setLoading(true);
      const res = await getDashboardStats(userId);
      setData(res);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      toast.error('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const userName = user?.username || user?.name || 'User';
  const initials = userName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  })();

  // Render stats cards based on fetched data or defaults
  const statsData = [
    {
      label: 'Resume Score',
      value: loading ? '...' : (data?.stats?.resumeScore || 0).toString(),
      suffix: '/100',
      iconVariant: 'indigo',
      icon: (
        <svg
          width='20'
          height='20'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
          />
        </svg>
      ),
      hasRing: true,
      ringPercent: data?.stats?.resumeScore || 0,
    },
    {
      label: 'Jobs Matched',
      value: loading ? '...' : (data?.stats?.jobsMatched || 0).toString(),
      iconVariant: 'purple',
      icon: (
        <svg
          width='20'
          height='20'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0'
          />
        </svg>
      ),
    },
    {
      label: 'Interviews Practiced',
      value: loading ? '...' : (data?.stats?.interviewsPracticed || 0).toString(),
      iconVariant: 'emerald',
      icon: (
        <svg
          width='20'
          height='20'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z'
          />
        </svg>
      ),
    },
    {
      label: 'Profile Strength',
      value: loading ? '...' : (data?.stats?.profileStrength || 10).toString(),
      suffix: '%',
      iconVariant: 'amber',
      icon: (
        <svg
          width='20'
          height='20'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
          />
        </svg>
      ),
    },
  ];

  const quickActions = [
    {
      label: 'Upload Resume',
      desc: 'Get AI-powered feedback instantly',
      variant: 'indigo',
      href: '/resume-analysis',
      icon: (
        <svg
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5'
          />
        </svg>
      ),
    },
    {
      label: 'Browse Jobs',
      desc: 'Explore AI-curated job matches',
      variant: 'purple',
      href: '/job-fit',
      icon: (
        <svg
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
      ),
    },
    {
      label: 'Mock Interviews',
      desc: 'Practice with AI mock interviews',
      variant: 'cyan',
      href: '/interview',
      icon: (
        <svg
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z'
          />
        </svg>
      ),
    },
    {
      label: 'Job Match History',
      desc: 'View all past matching analyses',
      variant: 'emerald',
      href: '/job-fit',
      icon: (
        <svg
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941'
          />
        </svg>
      ),
    },
  ];

  const activities = data?.activities || [];
  const skills = data?.skills || [];

  // SVG ring calculations
  const ringRadius = 20;
  const ringCircumference = 2 * Math.PI * ringRadius;

  return (
    <>
      {/* SVG Gradient Defs */}
      <svg width='0' height='0' style={{ position: 'absolute' }}>
        <defs>
          <linearGradient
            id='progressGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='0%'
          >
            <stop offset='0%' stopColor='var(--accent-start)' />
            <stop offset='100%' stopColor='var(--accent-end)' />
          </linearGradient>
        </defs>
      </svg>

      {/* Header */}
      <header className='dashboard-header animate-fade-in-up'>
        <div className='dashboard-greeting'>
          <h1>
            {greeting}, <span className='gradient-text'>{userName}</span> 👋
          </h1>
          <p>Here&apos;s what&apos;s happening with your career today.</p>
        </div>
        <div className='dashboard-header-actions'>
          <div className='dashboard-search'>
            <svg
              className='dashboard-search-icon'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
            <input type='text' placeholder='Search jobs, skills...' />
          </div>
          <button className='header-icon-btn' aria-label='Notifications'>
            <svg
              width='18'
              height='18'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={1.5}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0'
              />
            </svg>
            <span className='notification-dot' />
          </button>
          <div className='header-avatar'>{initials}</div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className='stats-grid'>
        {statsData.map((stat, i) => (
          <div
            key={stat.label}
            className={`stat-card animate-fade-in-up dash-delay-${i + 1} ${loading ? 'animate-pulse' : ''}`}
            style={{ opacity: mounted ? 1 : 0 }}
          >
            <div className='stat-card-header'>
              <div
                className={`stat-card-icon stat-card-icon--${stat.iconVariant}`}
              >
                {stat.icon}
              </div>
              {stat.hasRing ? (
                <svg className='progress-ring' viewBox='0 0 48 48'>
                  <circle
                    className='progress-ring-bg'
                    cx='24'
                    cy='24'
                    r={ringRadius}
                  />
                  <circle
                    className='progress-ring-fill'
                    cx='24'
                    cy='24'
                    r={ringRadius}
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={
                      mounted && !loading
                        ? ringCircumference -
                          (stat.ringPercent / 100) * ringCircumference
                        : ringCircumference
                    }
                  />
                </svg>
              ) : (
                <span className="stat-card-trend stat-card-trend--up">
                  Active
                </span>
              )}
            </div>
            <p className='stat-card-value'>
              {stat.value}
              {stat.suffix && (
                <span
                  style={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {stat.suffix}
                </span>
              )}
            </p>
            <p className='stat-card-label'>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className='quick-actions-title animate-fade-in-up dash-delay-5'>
        Quick Actions
      </h2>
      <div className='quick-actions-grid'>
        {quickActions.map((action, i) => (
          <Link
            key={action.label}
            href={action.href}
            className={`quick-action-card animate-fade-in-up dash-delay-${i + 5} cursor-pointer block hover:scale-[1.02] active:scale-[0.98] transition-all`}
            style={{ opacity: mounted ? 1 : 0 }}
          >
            <div
              className={`quick-action-icon quick-action-icon--${action.variant}`}
            >
              {action.icon}
            </div>
            <span className='quick-action-label'>{action.label}</span>
            <p className='quick-action-desc'>{action.desc}</p>
          </Link>
        ))}
      </div>

      {/* Bottom Two-Column */}
      <div className='dashboard-bottom'>
        {/* Recent Activity */}
        <div
          className={`dashboard-panel animate-fade-in-up dash-delay-7 ${loading ? 'animate-pulse' : ''}`}
          style={{ opacity: mounted ? 1 : 0 }}
        >
          <div className='dashboard-panel-header'>
            <h3 className='dashboard-panel-title'>Recent Activity</h3>
            <span className='panel-badge'>Realtime logs</span>
          </div>
          <div className='activity-list'>
            {loading ? (
              // Simple loading skeleton list
              [1, 2, 3].map((n) => (
                <div key={n} className='activity-item'>
                  <div className='activity-dot-col'>
                    <div className='activity-dot activity-dot--indigo' />
                    <div className='activity-line' />
                  </div>
                  <div className='activity-content space-y-2 py-1'>
                    <div className='h-4 w-3/4 rounded bg-[var(--bg-primary)]' />
                    <div className='h-3 w-1/4 rounded bg-[var(--bg-primary)]' />
                  </div>
                </div>
              ))
            ) : activities.length > 0 ? (
              activities.map((a, i) => (
                <div key={i} className='activity-item'>
                  <div className='activity-dot-col'>
                    <div
                      className={`activity-dot activity-dot--${a.dotVariant}`}
                    />
                    {i < activities.length - 1 && (
                      <div className='activity-line' />
                    )}
                  </div>
                  <div className='activity-content'>
                    <p
                      className='activity-text'
                      dangerouslySetInnerHTML={{ __html: a.text }}
                    />
                    <span className='activity-time'>{a.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--text-muted)] py-4">No recent activities found.</p>
            )}
          </div>
        </div>

        {/* Skill Progress */}
        <div
          className={`dashboard-panel animate-fade-in-up dash-delay-8 ${loading ? 'animate-pulse' : ''}`}
          style={{ opacity: mounted ? 1 : 0 }}
        >
          <div className='dashboard-panel-header'>
            <h3 className='dashboard-panel-title'>Skill Proficiency</h3>
            <span className='panel-badge'>Top Skills</span>
          </div>
          <div className='skills-list'>
            {loading ? (
              // Simple loading skeleton list
              [1, 2, 3].map((n) => (
                <div key={n} className='skill-item space-y-2'>
                  <div className='flex justify-between'>
                    <div className='h-4 w-1/3 rounded bg-[var(--bg-primary)]' />
                    <div className='h-4 w-10 rounded bg-[var(--bg-primary)]' />
                  </div>
                  <div className='h-2 w-full rounded bg-[var(--bg-primary)]' />
                </div>
              ))
            ) : skills.length > 0 ? (
              skills.map((skill) => (
                <div key={skill.name} className='skill-item'>
                  <div className='skill-header'>
                    <span className='skill-name'>{skill.name}</span>
                    <span className='skill-percent'>{skill.percent}%</span>
                  </div>
                  <div className='skill-bar'>
                    <div
                      className={`skill-bar-fill skill-bar-fill--${skill.variant}`}
                      style={{ width: mounted ? `${skill.percent}%` : '0%' }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-[var(--text-muted)] py-4">Upload a resume to extract your skills.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
