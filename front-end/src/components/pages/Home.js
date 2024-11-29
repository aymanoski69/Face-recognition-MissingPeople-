import React from 'react';
import Slides from '../inc/Slider';
import Vms from './inc/Vms';
import Footer from '../inc/Footer.js'
import './home.css'
function Home(){
    return (
        <div>
            <Slides/>
            <section className='section'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 text-center'>
                            <h3 className='main-heading'>Our Project</h3>
                            <div className='underline mx-auto'></div>
                            <p>
                            <h6>The Facial Recognition Web App for Missing People</h6> is an innovative solution designed to aid in the identification and recovery of missing individuals. Utilizing advanced facial recognition technology, this project seeks to create a platform that can quickly and accurately match photos of missing persons with publicly available images. The primary goal of this project is to enhance search efforts and improve the chances of finding and reuniting missing individuals with their families
                            </p>
                            
                        </div>
                    </div>
                </div>
            </section>
            {/*Our vision and mission */}
            <Vms/>
            {/*Our Services */}
            <div class="container mt-5">
    <h3 className='text-center'>How Our Facial Recognition System Works</h3>
    <hr/>
    <div class="row">
        
        <div class="col-md-4">
            <h5>1. Upload an Image</h5>
            <p>Users can upload a recent photo of the missing person. Our system accepts images in various formats like JPG, PNG, and GIF. It's important to use a clear and recent image to improve search accuracy.</p>
        </div>
        
       
        <div class="col-md-4">
            <h5>2. Image Processing</h5>
            <p>Once the image is uploaded, our advanced AI-powered facial recognition technology analyzes the unique facial features of the person. This analysis creates a digital 'facial fingerprint' used for comparison.</p>
        </div>
        
        
        <div class="col-md-4">
            <h5>3. Database Search</h5>
            <p>The facial fingerprint is then compared to our secure database of registered missing persons and public images. Our system performs a rapid search to find potential matches in real-time.</p>
        </div>
    </div>

    <div class="row mt-4">
        
        <div class="col-md-4">
            <h5>4. Match Results</h5>
            <p>If a match is found, the system will return potential results with similar facial features. Users can review these matches to help verify the identity of their missing loved ones.</p>
        </div>
        
        
        <div class="col-md-4">
            <h5>5. Collaborating with Authorities</h5>
            <p>If a match is confirmed, users have the option to report the findings directly to law enforcement agencies, ensuring that the proper steps are taken to assist in the recovery of the missing person.</p>
        </div>
        
        
        <div class="col-md-4">
            <h5>6. Continuous Monitoring</h5>
            <p>Our system keeps monitoring for new images or data that could match your submission, providing updates in case new information becomes available in the future.</p>
        </div>
    </div>
</div>

            <Footer/>
        </div>
    );
}
export default Home;