import React, {Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import questions from '../../question.json';
import isEmpty from "../../utils/is-empty";
import M from "materialize-css";
import correctNotification from '../../assets/audio/correct-answer.mp3';
import wrongNotification from '../../assets/audio/wrong-answer.mp3';
import buttonSound from '../../assets/audio/button-sound.mp3';
// import { withRouter } from "../../utils/withRouter";

class Play extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            questions,
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: '',
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            currentQuestionIndex: 0,
            score: 0,
            correctAnswer: 0,
            wrongAnswer: 0,
            time: {}
        };

        this.interval = null;
        this.correctSound = React.createRef();
        this.wrongSound = React.createRef();
        this.buttonSound = React.createRef();
    }

    componentDidMount(){ 
        const {questions, currentQuestion, nextQuestion, previousQuestion, answer, numberOfQuestions, numberOfAnsweredQuestions} = this.state;
        this.displayQuestion(questions, currentQuestion, nextQuestion, previousQuestion);
        this.startTimer();
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }  

    displayQuestion = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let {currentQuestionIndex} = this.state;
        if(!isEmpty(this.state.questions)){
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer
            });

        }
    };

    handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            setTimeout(() => {
                this.correctSound.current.play();
            }, 50)
            this.correctAnswer();
        }else{
            setTimeout(() => {
                this.wrongSound.current.play();
            }, 50)
            this.wrongAnswer();
        }
    }

    // playButtonSound = () => {
    //     this.buttonSound.current.play();
    // }

    // handleButtonCLick = () => {
    //     this.playButtonSound ();
    // };

    handleQuitButtonClick = () => {
        this.buttonSound.current.play();;
        let confirmQuit = window.confirm('Are you sure you want to quit?');
        if(confirmQuit){
            this.props.wrapperComponent();
        }
    };

    correctAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Correct answer!',
            classes: 'toast-valid',
            displayLength: 1500
        });
        const {state} = this;
        this.setState( prevState => ({
            score: prevState.score + 1,
            correctAnswer: prevState.correctAnswer + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }

    wrongAnswer = () => {
        navigator.vibrate(1000);
        M.toast({
            html: 'Wrong answer!',
            classes: 'toast-invalid',
            displayLength: 1500
        });
        const {state} = this;
        this.setState( prevState => ({
            wrongAnswer: prevState.wrongAnswer + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1
        }), () => {
            if (this.state.nextQuestion === undefined) {
                this.endGame();
            } else {
                this.displayQuestion(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion);
            }
        });
    }

    startTimer = () => {
        const countDownTime = Date.now() + 900000;
        this.interval = setInterval(() => {
            const now = new Date();
            const distance = countDownTime - now;

            const minutes = Math.floor((distance % (1000 * 60 *60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if(distance < 0){
                clearInterval(this.interval);
                this.setState({
                    time : {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endGame();
                });
            }else {
                this.setState({
                    time : {
                        minutes,
                        seconds
                    }
                })
            }

        },1000);
    }

    endGame= () => {
        alert('Quiz has ended');
        const {state} = this;
        const playerStats = {
            score: state.score,
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestions : state.numberOfAnsweredQuestions,
            correctAnswers: state.correctAnswer,
            wrongAnswers: state.wrongAnswer
        };

        console.log(playerStats);
        setTimeout(() => {
            // this.props.navigate('/play/quiz/summary',{playerStats});
            this.props.history.push('/play/quiz/summary', playerStats);
        }, 1000);
    }

        render () {
            const {
                    currentQuestion,
                    currentQuestionIndex,
                    numberOfQuestions,
                    time
                   } = this.state;
            return (
               <Fragment>
                    <Helmet><title>Quiz Page</title></Helmet>
                    <Fragment>
                        <audio ref={this.correctSound}  src={correctNotification} controls>play</audio>
                        <audio ref={this.wrongSound}  src={wrongNotification} controls></audio>
                        <audio ref={this.buttonSound}  src={buttonSound} controls></audio>
                    </Fragment>
                    <div className="questions">
                        <div className="question-menu-container">
                            <span className="left"><i class="fas fa-book"></i> {currentQuestionIndex + 1} to {numberOfQuestions}</span>
                            <span className="right"><i class="fas fa-clock"></i> {time.minutes} : {time.seconds}</span>
                        </div><br/><br/><br/>
                        <div className="question-container">
                            <h5>{currentQuestion.question}</h5>
                            <div className="options-container">
                                <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                                <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                            </div>
                            <div className="options-container">
                                <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                                <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                            </div>

                            <div className="button-container">
                                <button className="quit-btn" onClick={this.handleQuitButtonClick} id="quit">Quit</button>
                            </div>
                        </div>
                    </div>
               </Fragment>
            )
        }
    }

export default Play;