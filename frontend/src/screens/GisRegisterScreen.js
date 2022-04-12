import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { PaystackButton } from 'react-paystack';
import { FlutterWaveButton } from 'flutterwave-react-v3';


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

  const config = {
    public_key: 'FLWPUBK-b377287017f9aa54f634be015db036a0-X',
    tx_ref: Date.now(),
    amount: 20,
    currency: 'USD',
    payment_options: 'card, mobilemoney,ussd',
    customer: {
      email: userInfo.email,
      phonenumber: '',
      name: userInfo.name,
    },
    customizations: {
      title: 'Niger Maps',
      description: 'Payment for items in cart',
    },
  };

  const fwConfig = {
    ...config,
    text: 'International Payment',
    callback: (response) => {
      console.log(response);
    },
    onClose: () => { },
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
                text='Pay with Nigerian Bank'
                amount={7000 * 100}
                onSuccess={submitHandler}
              /><hr />
              <div className='row center'><strong>OR</strong></div>
              <FlutterWaveButton
                className="primary block"
                {...fwConfig} />
            </div>
            <div>
              <i><strong>Note:</strong> Payment of <del>&#8358;</del>7,000 or $20 before you start learning</i>
            </div>
          </>
        )}
      </ul>
    </div>
  );
}
