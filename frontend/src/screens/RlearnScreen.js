import React from 'react';
import { useSelector } from 'react-redux';
import Countdown from 'react-countdown';
import { Helmet } from 'react-helmet-async';

export default function RlearnScreen() {
    const userSignin = useSelector((state) => state.userSignin);

    const { userInfo } = userSignin;

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
                <title>R Studio Learning</title>
                <meta name="description" content="Learn Basic Analysis with R Studio" />
                <link rel="canonical" href="/" />
            </Helmet>
            <div className='row center' style={{ 'fontSize': '25px', 'textAlign': 'center' }}>
                <div><p>Thanks for showing interest to learn R Studio Basics, Practical Lesson begin in &nbsp;</p></div> <br />
                <strong><Countdown
                    date='2022-04-15T01:02:03'
                    renderer={renderer}
                />
                </strong>
                <div><i>&nbsp;Training Schedules will be forwarded to your email: {userInfo.email}</i></div>
            </div>

        </div>
    );
}