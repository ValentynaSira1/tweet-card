import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import css from './Layout.module.css';
import styled from 'styled-components';
import { Suspense } from 'react';
import { Loader } from './components/Loader';

const StyledLink = styled(NavLink)`
  &.active {
    color: rgb(141, 4, 130);
  }
  &.active:hover,
  :focus {
    color: #b800a8;
  }
`;

export const Layout = () => {

  return (
    <div className={css.overlay}>
      <div className={css.nav_box}>
        <nav className={css.navigation}>
          <ul className={css.nav_list}>
            <li className={css.nav_item}>

            </li>
            <li className={css.nav_item}>
              <StyledLink to="/home" className={css.nav_link}>
                Home
              </StyledLink>
            </li>
            <li className={css.nav_item}>
              <StyledLink to="/tweets" className={css.nav_link}>
                Tweets
              </StyledLink>
            </li>
          </ul>
        </nav>
      </div>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};