import React from 'react';
import '../css/style.css';
import vet1 from '../assets/images/student.jpeg';
import vet2 from '../assets/images/student.jpeg';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className="carousel-header">
            <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-bs-target="#carouselId" data-bs-slide-to="0" className="active"></li>
                    <li data-bs-target="#carouselId" data-bs-slide-to="1"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                    <div className="carousel-item active">
                        <img src={vet1} className="img-fluid" alt="Caring for Pets" />
                        <div className="carousel-caption">
                            <div className="p-3" style={{ maxWidth: '900px', margin: '40px auto' }}>
                                <h4
                                    className="text-white text-uppercase fw-bold mb-4"
                                    style={{ letterSpacing: '3px' }}
                                >
                                    YOUR TRUSTED Marks Platform
                                </h4>
                                <h1 className="display-2 text-capitalize text-white mb-4">
                                    Comprehensive Marks Platform Services
                                </h1>
                                <p className="mb-5 fs-5">
                                    Providing exceptional Marks online  with cutting-edge Christian technology
                                    and compassionate service. Your Transcript's and happiness are our priority.
                                </p>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Link to='/services'
                                        className="btn-hover-bg btn btn-primary rounded-pill text-white py-3 px-5"
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src={vet2} className="img-fluid" alt="Veterinary Services" />
                        <div className="carousel-caption">
                            <div className="p-3" style={{ maxWidth: '900px' }}>
                                <h4
                                    className="text-white text-uppercase fw-bold mb-4"
                                    style={{ letterSpacing: '3px' }}
                                >
                                    EXPERT CARE FOR ALL ANIMALS
                                </h4>
                                <h1 className="display-2 text-capitalize text-white mb-4">
                                    Your Pet, Our Passion
                                </h1>
                                <p className="mb-5 fs-5">
                                    From routine check-ups to emergency care, we are here to ensure your pet's
                                    wellbeing at every stage of life.
                                </p>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Link to='/contact'
                                        className="btn-hover-bg btn btn-primary rounded-pill text-white py-3 px-5"
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselId"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon btn bg-primary" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselId"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon btn bg-primary" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Banner;
