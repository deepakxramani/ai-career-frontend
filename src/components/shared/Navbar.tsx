import styles from '../../styles/shared/navbar.module.scss';

// ─── SVG Icons ───────────────────────────────────────────────────
const MenuIcon = () => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
  >
    <line x1='3' y1='6' x2='21' y2='6' />
    <line x1='3' y1='12' x2='21' y2='12' />
    <line x1='3' y1='18' x2='15' y2='18' />
  </svg>
);

const SearchIcon = () => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
  >
    <circle cx='11' cy='11' r='8' />
    <line x1='21' y1='21' x2='16.65' y2='16.65' />
  </svg>
);

const BellIcon = () => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
  >
    <path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
    <path d='M13.73 21a2 2 0 0 1-3.46 0' />
  </svg>
);

const MoonIcon = () => (
  <svg
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
  >
    <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
  </svg>
);

// ─── Component ───────────────────────────────────────────────────
const Navbar = ({ collapsed, onToggle }: { collapsed: any; onToggle: any }) => {
  return (
    <nav className={`${styles.navbar} ${collapsed ? styles.collapsed : ''}`}>
      {/* Logo */}
      <div className={`${styles.logo} ${collapsed ? styles.collapsed : ''}`}>
        <div className={styles.logoIcon}>⚡</div>
        <span className={styles.logoText}>
          Nexus<span>UI</span>
        </span>
      </div>

      {/* Body */}
      <div className={styles.navBody}>
        {/* Toggle button */}
        <button
          className={styles.toggleBtn}
          onClick={onToggle}
          aria-label='Toggle sidebar'
        >
          <MenuIcon />
        </button>

        {/* Search */}
        <div className={styles.searchBar}>
          <SearchIcon />
          <input type='text' placeholder='Search anything...' />
          <kbd>⌘K</kbd>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.navActions}>
        <button className={styles.iconBtn}>
          <MoonIcon />
        </button>
        <button className={styles.iconBtn}>
          <BellIcon />
          <span className={styles.badge} />
        </button>
        <div className={styles.avatar} title='Jam'>
          JM
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
