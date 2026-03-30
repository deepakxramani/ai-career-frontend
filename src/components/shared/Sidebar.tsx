import { useState } from 'react';
import styles from '../../styles/shared/sidebar.module.scss';

// ─── Icons ───────────────────────────────────────────────────────
const icons = {
  dashboard: (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
    >
      <rect x='3' y='3' width='7' height='7' rx='1' />
      <rect x='14' y='3' width='7' height='7' rx='1' />
      <rect x='3' y='14' width='7' height='7' rx='1' />
      <rect x='14' y='14' width='7' height='7' rx='1' />
    </svg>
  ),
  analytics: (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
    >
      <polyline points='22 12 18 12 15 21 9 3 6 12 2 12' />
    </svg>
  ),
  projects: (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
    >
      <path d='M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' />
    </svg>
  ),
  team: (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
    >
      <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
      <path d='M16 3.13a4 4 0 0 1 0 7.75' />
    </svg>
  ),
  messages: (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
    >
      <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
    </svg>
  ),
  tasks: (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
    >
      <polyline points='9 11 12 14 22 4' />
      <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' />
    </svg>
  ),
  settings: (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
    >
      <circle cx='12' cy='12' r='3' />
      <path d='M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14' />
    </svg>
  ),
  docs: (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
    >
      <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
      <polyline points='14 2 14 8 20 8' />
      <line x1='16' y1='13' x2='8' y2='13' />
      <line x1='16' y1='17' x2='8' y2='17' />
      <polyline points='10 9 9 9 8 9' />
    </svg>
  ),
  more: (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={1.8}
      strokeLinecap='round'
    >
      <circle cx='12' cy='12' r='1' />
      <circle cx='19' cy='12' r='1' />
      <circle cx='5' cy='12' r='1' />
    </svg>
  ),
};

// ─── Nav Data ─────────────────────────────────────────────────────
const navSections = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'analytics', label: 'Analytics', icon: 'analytics', badge: 'New' },
    ],
  },
  {
    label: 'Workspace',
    items: [
      { id: 'projects', label: 'Projects', icon: 'projects', badge: '4' },
      { id: 'tasks', label: 'Tasks', icon: 'tasks', badge: '12' },
      { id: 'messages', label: 'Messages', icon: 'messages', badge: '3' },
      { id: 'team', label: 'Team', icon: 'team' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { id: 'docs', label: 'Docs', icon: 'docs' },
      { id: 'settings', label: 'Settings', icon: 'settings' },
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────
const Sidebar = ({ collapsed }: { collapsed: any }) => {
  const [active, setActive] = useState('dashboard');

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {navSections.map((section) => (
        <div key={section.label} className={styles.navSection}>
          <p className={styles.sectionLabel}>{section.label}</p>
          <ul className={styles.navList}>
            {section.items.map((item) => (
              <li key={item.id}>
                <button
                  className={`${styles.navItem} ${active === item.id ? styles.active : ''}`}
                  onClick={() => setActive(item.id)}
                >
                  <span className={styles.itemIcon}>
                    {icons[item.icon as keyof typeof icons]}
                  </span>
                  <span className={styles.itemLabel}>{item.label}</span>
                  {item.badge && (
                    <span className={styles.itemBadge}>{item.badge}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* User Card */}
      <div
        className={`${styles.userCard} ${collapsed ? styles.collapsed : ''}`}
      >
        <div className={styles.userAvatar}>JM</div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>Jam</span>
          <span className={styles.userRole}>Frontend Dev</span>
        </div>
        <div className={styles.userMore}>{icons.more}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
