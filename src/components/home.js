import React, { Fragment } from "react";
import {Helmet} from "react-helmet";
import { Link } from "react-router-dom";
import homeLogo from "../assets/img/quizicon.png";

const Home = () => (
    <Fragment>
        <Helmet><title>Quiz App - Home</title></Helmet>
        <div id="home">
           <div className="home-container">
            <img className="home-logo" src={homeLogo} />
            <div className="play-button-continer">
                <h6>Let's test try to improve your knowledge</h6><br />
                <button className="home-button"> <Link to={'/play/instructions'}><span>PLAY <i class="fas fa-play"></i> </span></Link></button>
            </div>
            </div>
        </div>
    </Fragment>
)

export default Home;
