'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/src/context/AuthContext';
import '../../styles/dashboard/dashboard.css';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const userName = user?.username || user?.name || 'User';
  const userEmail = user?.email || '';
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

  const navItems = [
    {
      label: 'Dashboard',
      active: true,
      icon: (
        <svg
          className='sidebar-link-icon'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z'
          />
        </svg>
      ),
    },
    {
      label: 'Resume Analysis',
      active: false,
      icon: (
        <svg
          className='sidebar-link-icon'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
          />
        </svg>
      ),
    },
    {
      label: 'Job Matching',
      active: false,
      icon: (
        <svg
          className='sidebar-link-icon'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59'
          />
        </svg>
      ),
    },
    {
      label: 'Career Insights',
      active: false,
      icon: (
        <svg
          className='sidebar-link-icon'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z'
          />
        </svg>
      ),
    },
    {
      label: 'Interview Prep',
      active: false,
      icon: (
        <svg
          className='sidebar-link-icon'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a23.54 23.54 0 0 0-2.688 6.413A48.44 48.44 0 0 0 12 22.58a48.44 48.44 0 0 0 8.429-2.02 23.54 23.54 0 0 0-2.688-6.413m-15.482 0C7.357 8.56 9.628 7.5 12 7.5c2.372 0 4.643 1.06 5.74 2.647M12 2.25c-2.485 0-4.5 4.03-4.5 9S9.515 20.25 12 20.25s4.5-4.03 4.5-9-2.015-9-4.5-9Z'
          />
        </svg>
      ),
    },
    {
      label: 'Settings',
      active: false,
      icon: (
        <svg
          className='sidebar-link-icon'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={1.5}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.214 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
          />
        </svg>
      ),
    },
  ];

  const statsData = [
    {
      label: 'Resume Score',
      value: '85',
      suffix: '/100',
      trend: '+12',
      trendType: 'up' as const,
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
      ringPercent: 85,
    },
    {
      label: 'Jobs Matched',
      value: '24',
      trend: '+5',
      trendType: 'up' as const,
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
      label: 'Applications',
      value: '12',
      trend: '+3',
      trendType: 'up' as const,
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
            d='M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
          />
        </svg>
      ),
    },
    {
      label: 'Profile Strength',
      value: '72',
      suffix: '%',
      trend: 'Steady',
      trendType: 'steady' as const,
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
      label: 'Career Insights',
      desc: 'Data-driven career guidance',
      variant: 'emerald',
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
    {
      label: 'Interview Prep',
      desc: 'Practice with AI mock interviews',
      variant: 'cyan',
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
  ];

  const activities = [
    {
      text: 'Resume analyzed — scored <strong>85/100</strong>',
      time: '2 hours ago',
      dotVariant: 'indigo',
    },
    {
      text: 'Matched with <strong>5 new jobs</strong> in Full-Stack Development',
      time: '5 hours ago',
      dotVariant: 'emerald',
    },
    {
      text: 'Application sent to <strong>TechCorp Inc.</strong>',
      time: 'Yesterday',
      dotVariant: 'purple',
    },
    {
      text: 'Completed <strong>Interview Prep</strong> — React session',
      time: '2 days ago',
      dotVariant: 'amber',
    },
    {
      text: 'Profile strength increased to <strong>72%</strong>',
      time: '3 days ago',
      dotVariant: 'indigo',
    },
  ];

  const skills = [
    { name: 'React / Next.js', percent: 90, variant: 'indigo' },
    { name: 'Node.js', percent: 78, variant: 'emerald' },
    { name: 'TypeScript', percent: 85, variant: 'purple' },
    { name: 'Python', percent: 60, variant: 'cyan' },
    { name: 'AWS / Cloud', percent: 45, variant: 'amber' },
  ];

  // SVG ring calculations
  const ringRadius = 20;
  const ringCircumference = 2 * Math.PI * ringRadius;

  return (
    <div className='dashboard-layout'>
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

      {/* Mobile menu button */}
      <button
        className='mobile-menu-btn'
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label='Toggle menu'
      >
        <svg
          width='22'
          height='22'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          {sidebarOpen ? (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18 18 6M6 6l12 12'
            />
          ) : (
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
            />
          )}
        </svg>
      </button>

      {/* Sidebar overlay (mobile) */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'sidebar-overlay--visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ── Sidebar ─────────────────────────────── */}
      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        <div className='sidebar-brand'>
          <div className='sidebar-brand-icon'>
            <svg
              width='20'
              height='20'
              fill='none'
              viewBox='0 0 24 24'
              stroke='white'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A18.168 18.168 0 0 1 12 21a18.168 18.168 0 0 1-7.363-1.453c-1.717-.293-2.3-2.379-1.067-3.61L5 14.5'
              />
            </svg>
          </div>
          <span className='sidebar-brand-text'>AI Career</span>
        </div>

        <nav className='sidebar-nav'>
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`sidebar-link ${item.active ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className='sidebar-user'>
          <div className='sidebar-avatar'>{initials}</div>
          <div className='sidebar-user-info'>
            <div className='sidebar-user-name'>{userName}</div>
            <div className='sidebar-user-email'>{userEmail}</div>
          </div>
          <button
            className='sidebar-logout-btn'
            onClick={logout}
            title='Logout'
          >
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
                d='M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9'
              />
            </svg>
          </button>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────── */}
      <main className='dashboard-main'>
        {/* Ambient orbs */}
        <div className='dashboard-orb dashboard-orb--1' />
        <div className='dashboard-orb dashboard-orb--2' />

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
              className={`stat-card animate-fade-in-up dash-delay-${i + 1}`}
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
                        mounted
                          ? ringCircumference -
                            (stat.ringPercent! / 100) * ringCircumference
                          : ringCircumference
                      }
                    />
                  </svg>
                ) : (
                  <span
                    className={`stat-card-trend stat-card-trend--${stat.trendType}`}
                  >
                    {stat.trendType === 'up' && '↑'} {stat.trend}
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
            <div
              key={action.label}
              className={`quick-action-card animate-fade-in-up dash-delay-${i + 5}`}
              style={{ opacity: mounted ? 1 : 0 }}
            >
              <div
                className={`quick-action-icon quick-action-icon--${action.variant}`}
              >
                {action.icon}
              </div>
              <span className='quick-action-label'>{action.label}</span>
              <p className='quick-action-desc'>{action.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Two-Column */}
        <div className='dashboard-bottom'>
          {/* Recent Activity */}
          <div
            className='dashboard-panel animate-fade-in-up dash-delay-7'
            style={{ opacity: mounted ? 1 : 0 }}
          >
            <div className='dashboard-panel-header'>
              <h3 className='dashboard-panel-title'>Recent Activity</h3>
              <span className='panel-badge'>Last 7 days</span>
            </div>
            <div className='activity-list'>
              {activities.map((a, i) => (
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
              ))}
            </div>
          </div>

          {/* Skill Progress */}
          <div
            className='dashboard-panel animate-fade-in-up dash-delay-8'
            style={{ opacity: mounted ? 1 : 0 }}
          >
            <div className='dashboard-panel-header'>
              <h3 className='dashboard-panel-title'>Skill Proficiency</h3>
              <span className='panel-badge'>Top Skills</span>
            </div>
            <div className='skills-list'>
              {skills.map((skill) => (
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
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
