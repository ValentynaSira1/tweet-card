import React, { useEffect, useState, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';

import { fetchUser, putUser } from '../../services/FetchUser';

import { TweetCard } from '../../components/TweetCard/TweetCard';
import { Loader } from '../../components/Loader';

import Notiflix from 'notiflix';

import css from './Tweets.module.css';

export default function Tweets() {
  const location = useLocation();
  const toBack = useRef(location.state?.from ?? '/');

  const [users, setUsers] = useState([]);
  const [visibleUsers, setVisibleUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const usersPrewPage = 6;

  useEffect(() => {
    const fetchAllUsers = async () => {
      setIsLoading(true);
      try {
        const users = await fetchUser();
        setUsers(users);
        setVisibleUsers(users.slice(0, usersPrewPage));
        setLoadMore(users.length > usersPrewPage);
      } catch (error) {
        Notiflix.Notify.failure('Oops. Something went wrong...');
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllUsers();
  }, []);

  const loadMoreUsers = () => {
    const nextPage = currentPage + 1;
    const endIndex = nextPage * usersPrewPage;
    const newVisibleUsers = users.slice(0, endIndex);
    setVisibleUsers(newVisibleUsers);
    setCurrentPage(nextPage);
    setLoadMore(newVisibleUsers.length < users.length);
  };

  const onFollow = async (id) => {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      const user = updatedUsers[userIndex];
      if (user.follow) {
        user.follow = false;
        user.followers -= 1;
      } else {
        user.follow = true;
        user.followers += 1;
      }
      await putUser(id, user);
      setUsers(updatedUsers);
    }
  };

  return (
    <div>
      <Link to={toBack.current} className={css.backBtn}>
        Back
      </Link>
      <ul className={css.list}>
        {visibleUsers.map((user) => (
          <TweetCard
            key={user.id}
            user={user}
            onFollow={onFollow}
            visibleUsers={visibleUsers}
            setVisibleUsers={setVisibleUsers}
          />
        ))}
      </ul>
      {isLoading ? (
        <Loader />
      ) : (
        !isError && loadMore && (
          <button type="button" onClick={loadMoreUsers} className={css.button}>
            Load More
          </button>
        )
      )}
    </div>
  );
}