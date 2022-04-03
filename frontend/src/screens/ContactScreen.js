import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { contact } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';



export default function ContactScreen(props) {
    const [firstname, setfirstName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    const contactRegister = useSelector((state) => state.contactRegister);
    const {  loading, error } = contactRegister;
  
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if (email === '') {
          alert('email not supplied');
        } else {
          dispatch(contact(firstname, lastname, email, message));
        }
      };
    

    return (
        <div>
            <Helmet>
                <title>Register for Niger Maps Account</title>
                <meta name="description" content="Register Now for Niger Maps account and download GIS Maps for all places in Nigeria" />
                <link rel="canonical" href="/register" />
            </Helmet>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Contact Us</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        id="firstname"
                        required
                        placeholder="Your name.."
                        onChange={(e) => setfirstName(e.target.value)} />

                </div>
                <div>
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        id="lastname"
                        required
                        placeholder="Your last name.."
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        required
                        placeholder="enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </input>
                </div>
                <div>
                    <label htmlFor="message">Subject</label>
                    <textarea
                        id="subject"
                        placeholder="Write your message.."
                        required
                        onChange={(e)=> setMessage(e.target.value)}
                        style={{ height: '100px' }}
                    >
                    </textarea>

                </div>
                <div>
                    <input className="primary" type="submit" />

                </div>
                <div>
                    <p><strong>Our Email:</strong> support@nigermaps.com</p>
                    <p><strong>Our Phone:</strong> +2348075224314, +2348150495750</p>
                </div>
            </form>
        </div>

    )
}
