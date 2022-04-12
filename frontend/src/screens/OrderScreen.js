import Axios from 'axios';
import { PaystackButton } from 'react-paystack';
import { FlutterWaveButton } from 'flutterwave-react-v3';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants';

export default function OrderScreen(props) {
  const params = useParams();
  const { id: orderId } = params;

  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;



  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);


  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };
  const config = {
    public_key: 'FLWPUBK-b377287017f9aa54f634be015db036a0-X',
    tx_ref: Date.now(),
    amount: order.totalPrice / 420,
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
    text: 'Pay in $',
    callback: (response) => {
      console.log(response);
    },
    onClose: () => { },
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      {!order.isPaid && order.totalPrice > 1 ? (
        <div>
          <strong>
            <h1>
              Your download has being prepared and will cost <del>&#8358;</del>{order.itemsPrice}<br />
            </h1>
          </strong>
          <i>Your download begin after successful payment and sent to {userInfo.email}</i>
        </div>
      ) : (
        <></>
      )}
      <h1>Order Id: {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card2 card-body">
                <h2>Customer details</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Phone Number:</strong> {order.shippingAddress.phoneNumber} <br />
                  <strong>Specialization: </strong> {order.shippingAddress.address}
                </p>
                {order.isDelivered && order.isPaid && order.totalPrice > 1 ? (
                  <MessageBox variant="success">
                    Successfully Delivered. Your Item was sent to email: {userInfo.email}
                  </MessageBox>
                ) : !order.isDelivered && order.isPaid && order.totalPrice > 1 ? (
                  <MessageBox variant="success">
                    Successfully Paid. Your Item is delivered to email {userInfo.email}
                  </MessageBox>
                ) : order.isDelivered && !order.isPaid && order.totalPrice < 1 ? (
                  <MessageBox variant="success">
                    Item was Sent to {userInfo.email}... Check your inbox
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Downloaded </MessageBox>
                )}
              </div>
            </li>
            {order.totalPrice > 1 ? (
              <li>
                <div className="card2 card-body">
                  <h2>Payment</h2>
                  <p hidden>
                    <strong>Method:</strong> {order.paymentMethod}
                  </p>
                  {order.isPaid && !order.isDelivered ? (
                    <MessageBox variant="success">
                      Paid at {order.paidAt}, Your order receipt was sent to {userInfo.email}
                    </MessageBox>
                  ) : order.isPaid && order.isDelivered ? (
                    <MessageBox variant="success">Paid at {order.paidAt}, transaction is complete </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not paid</MessageBox>
                  )}
                </div>
              </li>

            ) : (
              <></>
            )}
            <li>
              <div className="card2 card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row" onContextMenu={(e) => e.preventDefault()}>
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        {order.totalPrice > 1 ? (
                          <div>
                            {item.qty} x <del>&#8358;</del>{item.price} = <del>&#8358;</del>{item.qty * item.price}
                          </div>
                        ) : (
                          <div>This Map is Free</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card2 card-body">
            <ul>
              <div>
                {order.totalPrice > 1 ? (
                  <li>
                    <h2>Order Summary</h2>
                  </li>
                ) : (
                  <></>
                )}
                <li>
                  <div className="row">
                    <div>Items Price</div>
                    <div><del>&#8358;</del>{order.itemsPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li hidden>
                  <div className="row">
                    <div>Vat</div>
                    <div><del>&#8358;</del>{order.taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  {order.totalPrice > 1 ? (
                    <div className="row">
                      <div>
                        <strong> Order Total</strong>
                      </div>
                      <div>
                        <strong><del>&#8358;</del>{order.itemsPrice.toFixed(2)}</strong>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}

                </li>
              </div>
              {order.totalPrice > 1 ? (
                !order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <>
                        {errorPay && (
                          <MessageBox variant="danger">{errorPay}</MessageBox>
                        )}
                        {loadingPay && <LoadingBox></LoadingBox>}
                        <div>
                          <strong>Payment Method: </strong><p>Card, Bank Transfer, USSD, QR Code</p>
                        </div>
                        <PaystackButton
                          className="primary block"
                          name={userInfo.name}
                          publicKey='pk_live_e28467f5fc5eb832ef869ab13391165f4cba6fac'
                          email={userInfo.email}
                          text='Pay in Naira'
                          amount={order.totalPrice * 100}
                          onSuccess={successPaymentHandler} /> <br />
                        <FlutterWaveButton
                          className="primary block"
                          {...fwConfig} />
                      </>
                    )}
                    {userInfo.isAdmin && !order.isDelivered && (
                      <li>
                        {loadingDeliver && <LoadingBox></LoadingBox>}
                        {errorDeliver && (
                          <MessageBox variant="danger">{errorDeliver}</MessageBox>
                        )}
                        <button
                          type="button"
                          className="primary block"
                          onClick={deliverHandler}
                        >
                          Deliver Order
                        </button>
                      </li>
                    )}
                  </li>
                )

              ) : (
                <>
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Send to Email
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}