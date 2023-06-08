import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import css from './Layout.module.css';

import { Suspense } from 'react';
import { Loader } from './components/Loader';

export default function Layout () {

  return (
    <div className={css.box}>
      <header className={css.header}>
        <nav className={css.navigation}>
          <ul className={css.nav_list}>
            <li className={css.nav_item}>

            </li>
            <li className={css.nav_item}>
              <NavLink to="/home" className={css.nav_link}>
                Home
              </NavLink>
            </li>
            <li className={css.nav_item}>
              <NavLink to="/tweets" className={css.nav_link}>
                Tweets
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};