import React from 'react';
function Contactus(){
    return (
        <div>
            <section className='py-4 bg-info'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-4 my-auto'>
                            <h4>Contact Us</h4>
                        </div>
                        <div className='col-md-8 my-auto'>
                            <h6 className='float-end'>
                                Home / Contact Us
                            </h6>
                        </div>
                    </div>
                </div>
            </section>
            <section className='section'>
                <div className='container'>
                    <div className='card shadow'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-md-6 border-right'>
                                    <h6>Contact Form</h6>
                                    <hr/>
                                    <div className='form-group'>
                                        <label className='mb-1'>Full Name :</label>
                                        <input type='text' className='form-control' placeholder='Enter full name'/>
                                    </div>
                                    <div className='form-group'>
                                        <label className='mb-1'>Email Addrress :</label>
                                        <input type='text' className='form-control' placeholder='Enter full name'/>
                                    </div>
                                    <div className='form-group'>
                                        <label className='mb-1'>Message :</label>
                                        <textarea rows="3" className='form-control' placeholder='Type your message...'></textarea>
                                    </div>
                                    <div className='form-group py-3'>
                                        <button type='button' className='btn btn-primary shadow w-100' >Send Message</button>
                                    </div>
                                </div>
                                <div className='col-md-6 border-start'>
                                    <h5 className='main-heading'> Address Inforamation</h5>
                                    <div className='underline'></div>
                                    <p>
                                        Rabat,maroc
                                    </p>
                                    <p>
                                        Phone: +212 658061165
                                    </p>
                                    <p>
                                        Email: bassamohamed00@gmail.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Contactus;