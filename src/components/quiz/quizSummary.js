import React, {Component, Fragment} from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "../../utils/withRouter";
import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// class QuizSummary extends Component{
class QuizSummary extends Component{

    constructor(props){
        super(props);
        this.state = {
            score: 0,
            numberOfQuestion: 0,
            numberOfAnsweredQuestion: 0,
            correctAnswer: 0,
            wrongAnswer: 0
        };
    }

    componentDidMount(){
        const {state} = this.props.location;
        console.log(state);
        console.log("Hallo");
        if(state){
            this.setState({
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestion: state.numberOfQuestions,
                numberOfAnsweredQuestion: state.numberOfAnsweredQuestions,
                correctAnswer: state.correctAnswers,
                wrongAnswer: state.wrongAnswers
            });
        }
    }

    render() {
        // const location = useLocation();
        console.log(this.props);
        const {state} = this.props.location;
        const userScore = this.state.score;
        let stats, remark;

        if (userScore <= 30) {
            remark = 'You need more practice!';
        }else if(userScore > 30 && userScore <= 50){
            remark = 'Better luck next time!';
        }else if(userScore > 50 && userScore <= 70){
            remark = 'You can do better!';
        }else if(userScore > 70 && userScore <= 84){
            remark = 'You did great';
        }else{
            remark = 'You\'re an absolute genius!';
        }

        // console.log(state);

        if (state !== undefined) {
            console.log(state);
            stats = (
                <Fragment>
                <div className="summary-container">
                    <h1>Quiz has ended</h1>
                    <div className="container">
                        <h4>&#128079; {remark}</h4>
                        <h2>Your Score : {this.state.score.toFixed(0)}&#37;</h2>
                        <span className="stat left">Total number of question : </span>
                        <span className="right">{this.state.numberOfQuestion}</span><br />

                        <span className="stat left">Total number of answered question : </span>
                        <span className="right">{this.state.numberOfAnsweredQuestion}</span><br />
                        
                        <span className="stat left">Total number of correct answer : </span>
                        <span className="right">{this.state.correctAnswer}</span><br />

                        <span className="stat left">Total number of wrong answer : </span>
                        <span className="right">{this.state.wrongAnswer}</span><br />
                    </div>
                    <div className="choice-button">
                        <span className="left"><Link to="/" ><i class="fas fa-sad-tear"></i> Back to home</Link></span>
                        <span className="right"><Link to="/play/quiz">Play again! <i class="fas fa-fire"></i></Link></span>
                    </div>
                    </div>
                </Fragment>
            );
        } else {
            stats = (
                <section>
                    <h1 className="no-stats">No statistics availables</h1>
                    <ul>
                        <li>
                            <Link to="/">Back to home</Link>
                        </li>
                        <li>
                            <Link to="/play/quiz">Take a quiz</Link>
                        </li>
                    </ul>
                </section>
            );
        }
        return (
            <Fragment>
                <Helmet><title>Quiz App - Summary</title></Helmet>
                {stats}
            </Fragment>
        )
    }
}

export default QuizSummary;