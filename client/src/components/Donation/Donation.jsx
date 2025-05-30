import React, { useEffect, useState } from 'react';
import '../../css/donation.css';
import '../../css/alumniList.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import AlumniCard from '../Alumni/AlumniCard';
import ProsAndCons from './ProsAndCons.jsx';
import DonationImpactSection from './DonationImpactSection.jsx';
import DonationSubscription from './DonationSubscription.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFetchAlumniQuery } from '../../redux/api/alumniApiSlice.js';
import Loader from '../../utils/Loader.jsx';

const Donation = () => {
    const navigate = useNavigate();
    const { data: alumniData, isLoading, isError } = useFetchAlumniQuery();

    return (
        <div className='donation'>
            <div>
                <h1 style={{ textAlign: 'center', color: 'black' }}>General Purpose Donation</h1>
                <p className='text-dark text-center'>--------------------------------</p>
                <p className='donation-para-1'>
                    Your donation is important to the Association in carrying out its work. It will go a long way in serving the causes mentioned in the Permissible End Uses (Bold) list of activities appearing in this page.

                    Donation in this category will be auto-accepted and put in the mixed kitty for need-based utilization around the year.

                    Donation flow as in existing website and will be processed according to the rules and regulations.
                </p>
                <p className='donation-para-1'>
                    Donation amount – Rs. 2500 to Rs. 1 lac
                </p>
            </div>
            <Button className='donation-button' onClick={() => navigate('/donation-payment')} variant="primary">Donate now</Button>
            <DonationSubscription />

            {isLoading ? <Loader /> :
                <section className="alumni-list-section light">
                    <Container>
                        <h1 className="alumni-heading mb-5 text-center text-black">Our Distinguished Alumni</h1>
                        <Row>
                            {alumniData && alumniData.data.slice(0,6).map((alumni, i) => (
                                <Col xs={12} md={6} lg={4} className="mb-4" key={i}>
                                    <AlumniCard
                                        alumni={alumni}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>


            }
            <ProsAndCons />
            <DonationImpactSection />
        </div>
    );
};

export default Donation;
