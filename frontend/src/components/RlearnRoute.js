import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RlearnRoute = ({ children }) => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return userInfo && userInfo.isRStudent ? children : <Navigate to="/rregister" />;//or navigate to pay for R Learning
};

export default RlearnRoute;
