import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'
function Footer(){
    return(
        <section className="section footer bg-dark text-white">
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h6>Finding People</h6>
                        <hr/>
                        <p className="text-white">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        </p>
                        <div className="footer-icons">
                            <a href="https://www.facebook.com/profile.php?id=100089832431065" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                            <a href="https://www.twitter.com/your-profile-link" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-twitter"></i>
                            </a>
                            <a href="https://www.instagram.com/your-profile-link" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-instagram"></i>
                            </a>
                            <a href="https://www.linkedin.com/in/bassa-mohamed-aba791297/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3BMMUCgmmzRQKqBlPhZOIjxg%3D%3D" target="_blank" rel="noopener noreferrer">
                                <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                        </div>


                    </div>
                    <div className="col-md-4">
                        <h6>Quick Links</h6>
                        <hr/>
                        <ul>
                            <li className="nav-item"><Link to="/">Home</Link></li>
                            <li className="nav-item"><Link to="/About">About</Link></li>
                            <li className="nav-item"><Link to="/Contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h6>Contact Inforamation</h6>
                        <hr/>
                        <p className="text-white">
                            <br/><i class="fa-solid fa-envelope"></i>  bassamohamed00@gmail.com <br/>
                            <br/><i class="fa-solid fa-phone"></i>   +1 (123) 456-7890 <br/>
                            <br/><i class="fa-solid fa-address-book"></i> 7685 Street Agdal, Rabat, Morocco
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Footer;