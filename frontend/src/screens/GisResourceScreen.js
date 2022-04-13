import React from 'react';
import { Helmet } from 'react-helmet-async';


export default function GisResourceScreen(props) {
    return (
        <div>
            <Helmet>
                <title>Register for Niger Maps Account</title>
                <meta name="description" content="Register Now for Niger Maps account and download GIS Maps for all places in Nigeria" />
                <link rel="canonical" href="/register" />
            </Helmet>

            <div className='row center'>
                <h1 style={{ fontSize: '20px' }}>Tutorial Data Download</h1><br />
            </div>
            <div className='row center'>
                <p>Follow step by step guide as in your training manual with our example dataset.</p>
            </div>
            <ul className='row center'>
                <li><a href="https://paystack.com/pay/nigermapsbasicdata" ><button style={{ fontSize: '16px' }} className="primary">Download Basic GIS Tutorial Dataset <i>(<del>&#8358;</del>2,000)</i></button></a></li>
            </ul>
            <ul className='row center'>
                <li><a href="https://paystack.com/pay/nigermapsdata" ><button style={{ fontSize: '16px' }} className="primary">Download Advance GIS Tutorial Dataset <i>(<del>&#8358;</del>5,000)</i></button></a></li>
            </ul>
        </div>
    );
}
