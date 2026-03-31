'use client';

import DashboardSidebar from '../../components/dashboard/Sidebar';
import '../../styles/dashboard/dashboard.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='dashboard-layout'>
      <DashboardSidebar />
      <main className='dashboard-main'>
        {/* Ambient orbs */}
        <div className='dashboard-orb dashboard-orb--1' />
        <div className='dashboard-orb dashboard-orb--2' />
        {children}
      </main>
    </div>
  );
}
