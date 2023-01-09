import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router';

export default ({updateUser, user}) => {
  return (
    <>
      <Header updateUser={updateUser} user={user} />
      <Outlet />
    </>
  );
};