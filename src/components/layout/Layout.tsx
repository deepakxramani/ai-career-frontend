'use client';
import { useState } from 'react';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/Sidebar';
import styles from '../../styles/shared/layout.module.scss';

const Layout = ({ children }: { children: any }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.layout}>
      {/* Top Navbar */}
      <Navbar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
      />

      {/* Sidebar + Page Content */}
      <div className={styles.body}>
        <Sidebar collapsed={collapsed} />

        <main
          className={`${styles.content} ${collapsed ? styles.collapsed : ''}`}
        >
          <div className={styles.pageInner}>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
