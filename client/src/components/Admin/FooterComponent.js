import React from "react";

function Footer(){
    return(
        <div className="footer">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-7 col-sm-5">
                        <h5>Our Address</h5>
                        <address>
                        10880, <br />
                        Malibu Point 90265,<br />
                        USA<br />
                        <i className="fa fa-phone fa-lg"></i>: 212-970-4133<br />
                        <i className="fa fa-fax fa-lg"></i>: 973-728-1783<br />
                        <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:vrnl@vehicle.net">
                            vrnl@vehicle.net</a>
                        </address>
                    </div>
                    <div className="col-12 col-sm-4 align-self-center">
                        <div className="text-center">
                            <a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                            <a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                            <a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                            <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <p>© Copyright 2022 VRNL</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Footer;