import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { PaystackButton } from 'react-paystack';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isGIStudent, setIsGIStudent] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsGIStudent(user.isGIStudent);
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = () => {
    // dispatch update profile
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          isGIStudent,
        })
      );
  };
  return (
    <div>
      <ul className="form">
        <div>
          <h1>Register for GIS Practical Training</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Registered Successfully <Link to="/gis"><strong>Start Learning Now</strong></Link>
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Confirm Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter Account Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor='isGIStudent'><i>Check this box to confirm registration(important)</i></label>
              <input
                id="isGIStudent"
                type="checkbox"
                checked={isGIStudent}
                onChange={(e) => setIsGIStudent(e.target.checked)}
              ></input>
            </div>

            <div>
              <PaystackButton
              className="primary block"
              name={userInfo.name}
              publicKey='pk_live_e28467f5fc5eb832ef869ab13391165f4cba6fac'
              email={userInfo.email}
              text='Register'
              amount={7000*100}
              onSuccess={submitHandler}
              />
            </div>
            <div>
              <i><strong>Note:</strong> Full course is N7000 pay and start learning now</i>
            </div>
          </>
        )}
      </ul>
    </div>
  );
}
