import React, {Component, Fragment} from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const QuizInstruction = () => (
   <Fragment>
    <Helmet><title>Quiz Instruction - Quiz App</title></Helmet>
    <div className="instruction-container">
        <h1>How to play the game</h1>
        <ul>
            <li>The game has a duration of 15 minute and ends as soon as your time elapsess</li>
            <li>Click the correct answer option box in your opinion</li>
            <li>Your score will appear when time runs out</li>
        </ul>
        <div className="choice-button">
            <span className="left"><Link to="/" ><i class="fas fa-sad-tear"></i> No take me back</Link></span>
            <span className="right"><Link to="/play/quiz">Okay, Let's do this! <i class="fas fa-fire"></i></Link></span>
        </div>
    </div>
   </Fragment>
)

export default QuizInstruction;