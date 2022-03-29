import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Countdown from 'react-countdown';
import { Helmet } from 'react-helmet-async';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
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
            <div className='row center' >
                {!userInfo.isSeller ? (
                    <div style={{ 'fontSize': '25px', 'textAlign': 'center' }}>
                        <strong>
                            <Countdown
                                date='2022-04-05T01:02:03'
                                renderer={renderer}
                            />
                        </strong>
                        <div><i>&nbsp; Training Schedules will be forwarded to your email: {userInfo.email}</i></div>
                    </div>
                ) : (
                    <>

                        <Accordion>
                            <div>Basic Introduction</div>
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        <strong>Lesson 1: Introduction</strong>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>
                                        This course will build your skills in a range of geospatial tools, technologies, and techniques.
                                        Learn the basics of digital mapping and geovisualisation.
                                        Discover the art and science of designing and creating maps and other visualisations of spatial data.
                                        You’ll find out how to collect, manage and edit your own spatial data with this GIS course you can study in your spare time.


                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        <strong>Lesson 2: GIS Softwares</strong>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>
                                        <strong><i>With so many GIS software solutions available on the market, how do we even begin choosing which one to use? In this Section we will give you the background knowledge that you need in order to answer that questions for yourself.</i></strong>
                                        For those of you that have tried looking for GIS software for the first time, there’s one thing that you will know for sure: you aren’t short of choices.

                                        So I guess the first thing you want to know is which one is best? The answer is…

                                        <strong>There is no answer.</strong><br/>

                                        It’s best to think of GIS software like tools in a toolbox, you don’t want to use a screwdriver to bang in a nail. Often GIS solutions will involve a “software stack”.

                                        This means we use several tool in unison. For example, we use a desktop GIS system for creating and modifying our GIS data, then once the data is ready we upload it to a web GIS system in order to distribute the maps within our organization.
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                        </Accordion>
                    </>
                )}
            </div>

        </div>
    );
}