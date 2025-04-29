// src/components/Navbar.tsx

import React from 'react';
import { LuCircleUser } from "react-icons/lu";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'dashboard', href: '/dashboard' },
  { label: 'Compare', href: '/compare' },
  { label: 'search', href: '/search' },
  { label: 'Mypage', href: '/mypage' },
  { label: 'Logout', href: '/home' },
];

const Navbar: React.FC = () => {
  return (
    <nav style={styles.navbar}>
      <a href="/dashboard" style={styles.logo}>MyLogo</a>
      <div style={styles.menu}>
        {navItems.map((item) => (
          <a key={item.label} href={item.href} style={styles.menuItem}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0f2f4f',
    padding: '1rem 2rem',
  },
  logo: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  menu: {
    display: 'flex',
    gap: '1.5rem',
  },
  menuItem: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s',
  },
};

export default Navbar;