'use client';

import { useState } from 'react';
import { signInWithGoogle } from '../../lib/googleLogin';
import { useAuth } from '@/src/context/AuthContext';
import API from '../../lib/api';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError('');
  };

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      if (isSignUp) {
        const res = await API.post('/auth/register', { name, email, password });
        login(res.data.token, res.data.user);
      } else {
        const res = await API.post('/auth/login', { email, password });
        login(res.data.token, res.data.user);
      }
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          'Something went wrong. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      setError('');

      const firebaseUser = await signInWithGoogle();

      const res = await API.post('/auth/google', {
        token: firebaseUser.token,
      });

      login(res.data.token, res.data.user);
    } catch (error) {
      console.error('Google login failed', error);
      setError('Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col lg:flex-row overflow-hidden'>
      {/* ── Left Hero Panel ─────────────────────────── */}
      <div className='relative flex-1 flex flex-col items-center justify-center p-8 lg:p-16 overflow-hidden'>
        {/* Animated gradient background */}
        <div className='absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#12122a] to-[#1a0a2e]' />

        {/* Floating orbs */}
        <div className='absolute top-[15%] left-[10%] w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.15),transparent_70%)] animate-float' />
        <div className='absolute bottom-[20%] right-[5%] w-96 h-96 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.12),transparent_70%)] animate-float-slow' />
        <div
          className='absolute top-[55%] left-[55%] w-48 h-48 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.1),transparent_70%)] animate-float'
          style={{ animationDelay: '2s' }}
        />

        {/* Grid overlay */}
        <div
          className='absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Content */}
        <div className='relative z-10 max-w-lg text-center lg:text-left animate-fade-in-up'>
          {/* Logo */}
          <div className='flex items-center gap-3 justify-center lg:justify-start mb-8'>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)]'>
              <svg
                className='w-6 h-6 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611l-.772.134A18.168 18.168 0 0 1 12 21a18.168 18.168 0 0 1-7.363-1.453l-.772-.134c-1.717-.293-2.3-2.379-1.067-3.61L5 14.5'
                />
              </svg>
            </div>
            <span className='text-2xl font-bold gradient-text'>AI Career</span>
          </div>

          {/* Tagline */}
          <h1 className='text-4xl lg:text-5xl font-extrabold leading-tight mb-4 text-white'>
            Your AI-Powered
            <br />
            <span className='gradient-text'>Career Companion</span>
          </h1>
          <p className='text-[var(--text-secondary)] text-lg mb-12 leading-relaxed'>
            Leverage artificial intelligence to analyze your resume, match with
            dream jobs, and accelerate your career growth.
          </p>

          {/* Feature pills */}
          <div className='flex flex-col gap-4'>
            {[
              {
                icon: (
                  <svg
                    className='w-5 h-5'
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
                title: 'AI Resume Analysis',
                desc: 'Get instant, detailed feedback on your resume',
              },
              {
                icon: (
                  <svg
                    className='w-5 h-5'
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
                title: 'Smart Job Matching',
                desc: 'AI-curated opportunities tailored to your skills',
              },
              {
                icon: (
                  <svg
                    className='w-5 h-5'
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
                title: 'Career Insights',
                desc: 'Data-driven guidance to navigate your career path',
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className={`flex items-center gap-4 glass-card px-5 py-4 opacity-0 animate-fade-in-up stagger-${i + 3}`}
              >
                <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#6366f1]/20 to-[#a855f7]/20 flex items-center justify-center text-[var(--accent-mid)] shrink-0'>
                  {feature.icon}
                </div>
                <div className='text-left'>
                  <h3 className='text-sm font-semibold text-white'>
                    {feature.title}
                  </h3>
                  <p className='text-xs text-[var(--text-secondary)]'>
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Login Panel ───────────────────────── */}
      <div className='relative flex items-center justify-center p-8 lg:p-16 lg:w-[480px] xl:w-[520px]'>
        {/* Subtle background */}
        <div className='absolute inset-0 bg-[var(--bg-secondary)]' />
        <div className='absolute inset-0 bg-gradient-to-t from-[rgba(99,102,241,0.03)] to-transparent' />

        {/* Login card */}
        <div className='relative z-10 w-full max-w-sm animate-fade-in-up stagger-2'>
          {/* Heading */}
          <div className='text-center mb-8'>
            <h2 className='text-3xl font-bold text-white mb-2'>
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className='text-[var(--text-secondary)] text-sm'>
              {isSignUp
                ? 'Sign up to start your career journey'
                : 'Sign in to continue your career journey'}
            </p>
          </div>

          {/* ── Email / Password Form ─────────────────── */}
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            {/* Name (Sign Up only) */}
            {isSignUp && (
              <div className='flex flex-col gap-1.5'>
                <label
                  htmlFor='name'
                  className='text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider'
                >
                  Full Name
                </label>
                <div className='relative'>
                  <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]'>
                    <svg
                      className='w-4 h-4'
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
                  </span>
                  <input
                    id='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder='John Doe'
                    className='w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-white text-sm placeholder:text-[var(--text-muted)] outline-none transition-all duration-200 focus:border-[var(--accent-start)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]'
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className='flex flex-col gap-1.5'>
              <label
                htmlFor='email'
                className='text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider'
              >
                Email Address
              </label>
              <div className='relative'>
                <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]'>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75'
                    />
                  </svg>
                </span>
                <input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder='you@example.com'
                  className='w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-white text-sm placeholder:text-[var(--text-muted)] outline-none transition-all duration-200 focus:border-[var(--accent-start)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]'
                />
              </div>
            </div>

            {/* Password */}
            <div className='flex flex-col gap-1.5'>
              <label
                htmlFor='password'
                className='text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider'
              >
                Password
              </label>
              <div className='relative'>
                <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]'>
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
                    />
                  </svg>
                </span>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder='••••••••'
                  className='w-full pl-10 pr-11 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-white text-sm placeholder:text-[var(--text-muted)] outline-none transition-all duration-200 focus:border-[var(--accent-start)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer'
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
                      />
                    </svg>
                  ) : (
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up only) */}
            {isSignUp && (
              <div className='flex flex-col gap-1.5'>
                <label
                  htmlFor='confirmPassword'
                  className='text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider'
                >
                  Confirm Password
                </label>
                <div className='relative'>
                  <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]'>
                    <svg
                      className='w-4 h-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z'
                      />
                    </svg>
                  </span>
                  <input
                    id='confirmPassword'
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    placeholder='••••••••'
                    className='w-full pl-10 pr-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-white text-sm placeholder:text-[var(--text-muted)] outline-none transition-all duration-200 focus:border-[var(--accent-start)] focus:shadow-[0_0_0_3px_rgba(99,102,241,0.15)]'
                  />
                </div>
              </div>
            )}

            {/* Forgot password (Login only) */}
            {!isSignUp && (
              <div className='flex justify-end'>
                <button
                  type='button'
                  className='text-xs text-[var(--accent-mid)] hover:text-[var(--accent-end)] transition-colors cursor-pointer'
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className='flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20'>
                <svg
                  className='w-4 h-4 text-red-400 shrink-0'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z'
                  />
                </svg>
                <p className='text-xs text-red-400'>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              disabled={loading}
              className='w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[var(--accent-start)] via-[var(--accent-mid)] to-[var(--accent-end)] text-white font-semibold text-sm transition-all duration-300 cursor-pointer hover:shadow-[0_0_30px_rgba(99,102,241,0.35)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none'
            >
              {loading ? (
                <>
                  <svg
                    className='w-5 h-5 animate-spin'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    />
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                    />
                  </svg>
                  <span>{isSignUp ? 'Creating account…' : 'Signing in…'}</span>
                </>
              ) : (
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              )}
            </button>
          </form>

          {/* ── Divider ───────────────────────────────── */}
          <div className='flex items-center gap-4 my-6'>
            <div className='flex-1 h-px bg-[var(--border-subtle)]' />
            <span className='text-xs text-[var(--text-muted)] uppercase tracking-widest'>
              or
            </span>
            <div className='flex-1 h-px bg-[var(--border-subtle)]' />
          </div>

          {/* ── Google Sign-In ────────────────────────── */}
          <button
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className='group relative w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-white text-gray-800 font-semibold text-sm transition-all duration-300 cursor-pointer hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none'
          >
            {googleLoading ? (
              <>
                <svg
                  className='w-5 h-5 animate-spin text-gray-500'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                  />
                </svg>
                <span>Connecting…</span>
              </>
            ) : (
              <>
                {/* Google Icon */}
                <svg className='w-5 h-5' viewBox='0 0 24 24'>
                  <path
                    fill='#4285F4'
                    d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z'
                  />
                  <path
                    fill='#34A853'
                    d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z'
                  />
                  <path
                    fill='#FBBC05'
                    d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A11.96 11.96 0 0 0 1 12c0 1.94.46 3.77 1.18 5.02l3.66-2.93Z'
                  />
                  <path
                    fill='#EA4335'
                    d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.93c.87-2.6 3.3-4.62 6.16-4.62Z'
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>

          {/* ── Toggle Sign Up / Sign In ──────────────── */}
          <p className='text-center text-sm text-[var(--text-secondary)] mt-8'>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type='button'
              onClick={toggleMode}
              className='text-[var(--accent-mid)] font-semibold hover:text-[var(--accent-end)] transition-colors cursor-pointer'
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>

          {/* Footer */}
          <div className='mt-8 flex items-center justify-center gap-6 text-xs text-[var(--text-muted)]'>
            <a
              href='#'
              className='hover:text-[var(--accent-mid)] transition-colors'
            >
              Terms
            </a>
            <span>·</span>
            <a
              href='#'
              className='hover:text-[var(--accent-mid)] transition-colors'
            >
              Privacy
            </a>
            <span>·</span>
            <a
              href='#'
              className='hover:text-[var(--accent-mid)] transition-colors'
            >
              Help
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
