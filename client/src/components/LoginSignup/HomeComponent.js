import React from "react"
import { Media } from "reactstrap"


export default function Home() {
    return (
        <div className="container">
            <Media list>
                <div className="row row-content align-items-center" >
                    <div className="col-12 col-md-5" >
                        <Media left middle>
                            <Media object width="400vh" src="/assets/images/registration.jpg" alt="registration"></Media>
                        </Media>
                    </div>
                    <div className="col-12 col-md-7" >
                        <Media heading>
                            Register Your Vehicle
                        </Media>
                        <Media body >
                            <p> Bought a new vehicle recently? Having a hard time registering your vehicle in the conventional way? Now you can register your new vehicle easily and effortlessly! Visit our website today. Book an appointment that fits your tight schedule. Get a fully detailed vehicle report prepared by our professionals. Submit your report at a time convenient to you. Stay in the comfort of your home while we prepare all the required documents and register your vehicle for you. You can download your vehicle's registration report anytime from our site after it is ready. Say goodbye to the old days of waiting in queues.
                            </p>
                        </Media>
                    </div>
                </div>
                <div className="row row-content align-items-center" >
                    <div className="col-12 order-md-last col-md-5" >
                        <Media left middle>
                            <Media object width="400vh" src="/assets/images/license.jpg" alt="license"></Media>
                        </Media>
                    </div>
                    <div className="col-12 order-md-first col-md-7" >
                        <Media heading>
                            Renew Your Vehicle License
                        </Media>
                        <Media body >
                            <p> Did your vehicle license expire recently? Too busy to spend a whole day or maybe even a week, renewing your vehicle license amongst your tight schedule? Sweat no more because we got you covered. Visit your nearest eco testing place. Get your vehicle tested. Visit your nearest bank and pay your vehicle's annual license fee. Upload the receipt and the eco test report of your vehicle to our site. We will renew your license for you while you stay in the comfort of your home. As an added benefit, in the future, you can check when one of your vehicle licenses expires.
                            </p>
                        </Media>
                    </div>
                </div>
                <div className="row row-content align-items-center" >
                    <div className="col-12 col-md-5" >
                        <Media left middle>
                            <Media object width="400vh" src="/assets/images/vehicle.jpg" alt="vehicle"></Media>
                        </Media>
                    </div>
                    <div className="col-12 col-md-7" >
                        <Media heading>
                            View Your Vehicle Details
                        </Media>
                        <Media body >
                            <p> No more piles of paperwork. Now you can easily see all the details of your vehicles all in one place. Visit our site today and register your vehicle. Want to change the way your vehicle looks? Hesitating due to the hassle of all the extra work? No worries, we got your back. Transform your average vehicle to a brand new one. All you have to do is, book an appointment. After getting a report of your new changes, upload it to our website. We will update your vehicles details for you. Managing your vehicles has never been easier before. 
                            </p>
                        </Media>
                    </div>
                </div>
            </Media>
        </div>
    )
}