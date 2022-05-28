import React from "react"
import { Media } from "reactstrap"


export default function Home() {
    return (
        <div className="container">
            <Media list>
                <div className="row row-content align-items-center" >
                    <div className="col-12 col-md-5" >
                        <Media left middle>
                            <Media object width="400vh" src="assets/images/registration.jpg" alt="registration"></Media>
                        </Media>
                    </div>
                    <div className="col-12 col-md-7" >
                        <Media heading>
                            Register Your Vehicle
                        </Media>
                        <Media body >
                            <p> Stimulate your mind as you test your typing speed with this standard English paragraph typing test. Watch your typing speed and accuracy increase as you learn about a variety of new topics! Over 40 typing test selections available.
                            </p>
                        </Media>
                    </div>
                </div>
                <div className="row row-content align-items-center" >
                    <div className="col-12 order-md-last col-md-5" >
                        <Media left middle>
                            <Media object width="400vh" src="assets/images/license.jpg" alt="license"></Media>
                        </Media>
                    </div>
                    <div className="col-12 order-md-first col-md-7" >
                        <Media heading>
                            Renew Your Vehicle License
                        </Media>
                        <Media body >
                            <p> Stimulate your mind as you test your typing speed with this standard English paragraph typing test. Watch your typing speed and accuracy increase as you learn about a variety of new topics! Over 40 typing test selections available.
                            </p>
                        </Media>
                    </div>
                </div>
                <div className="row row-content align-items-center" >
                    <div className="col-12 col-md-5" >
                        <Media left middle>
                            <Media object width="400vh" src="assets/images/vehicle.jpg" alt="vehicle"></Media>
                        </Media>
                    </div>
                    <div className="col-12 col-md-7" >
                        <Media heading>
                            View Your Vehicle Details
                        </Media>
                        <Media body >
                            <p> Stimulate your mind as you test your typing speed with this standard English paragraph typing test. Watch your typing speed and accuracy increase as you learn about a variety of new topics! Over 40 typing test selections available.
                            </p>
                        </Media>
                    </div>
                </div>
            </Media>
        </div>
    )
}