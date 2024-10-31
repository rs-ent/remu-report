// src/components/Navbar.tsx

import React from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar bg-primary text-white shadow-md">
      <div className="flex-1">
        <Link href="/" className="text-gray-300">
          IPO 리포트
        </Link>
      </div>
      <div className="flex-none">
        {/* 데스크톱 메뉴 */}
        <ul className="menu menu-horizontal px-1 hidden lg:flex ">
          <li>
            <Link href="/" className="text-gray-300">
              REPORTS
            </Link>
          </li>
          <li>
            <Link href="/create" className="text-gray-300">
              CREATE
            </Link>
          </li>
        </ul>
        {/* 모바일 메뉴 */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            {/* 햄버거 아이콘 */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 text-dark rounded-box w-52">
            <li>
              <Link href="/">
                REPORTS
              </Link>
            </li>
            <li>
              <Link href="/create">
                CREATE
              </Link>
            </li>
          </ul>
        </div>
        {/* 테마 전환 버튼 */}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
