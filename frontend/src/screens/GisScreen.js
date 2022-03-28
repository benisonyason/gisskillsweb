import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Countdown from 'react-countdown';
import { Helmet } from 'react-helmet-async';

export default function GiScreen() {
    const navigate = useNavigate();
    const userSignin = useSelector((state) => state.userSignin);

    const { userInfo } = userSignin;

    if (!userInfo) {
        navigate('/signin');
    }
    const Completionist = () => <span>You are good to go!</span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return <span>{days}days {hours}:{minutes}:{seconds}</span>;
        }
    };

    return (
        <div className="gallery">
            <Helmet>
                <title>GIS Maps</title>
                <meta name="description" content="Search and Download Maps for Places" />
                <link rel="canonical" href="/" />
            </Helmet>
            <div className='row center' style={{ 'fontSize': '30px', 'textAlign': 'center' }}>
                <div><p>Successfully registered For GIS Basic, Lessons begin in &nbsp;</p></div> <br />
                <strong><Countdown
                    date='2022-04-05T01:02:03'
                    renderer={renderer}
                />
                    </strong>
                <div><i>&nbsp;Kindly Check Back</i></div>

            </div>

        </div>
    );
}