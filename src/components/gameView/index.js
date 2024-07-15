import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import './index.css'

class GameView extends Component {
  state = {
    scoreCount: 0,
    userchoicesList: [],
    resultCard: false,
    resultDetails: [],
    resultText: '',
  }

  onSelectGame = id => {
    const {choicesList} = this.props
    const userChoice = id
    const getRandomIndex = Math.floor(Math.random() * choicesList.length)

    const getUserChoice = choicesList.find(eachObj => eachObj.id === id)
    const getRandomChoice = choicesList[getRandomIndex]
    const gotUserDetails = [getRandomChoice, getUserChoice]

    const randomChoice = choicesList[getRandomIndex].id

    if (userChoice === randomChoice) {
      this.setState({
        resultDetails: gotUserDetails,
        resultText: 'IT IS DRAW',
        resultCard: true,
      })
    } else if (
      (userChoice === 'ROCK' && randomChoice === 'SCISSORS') ||
      (userChoice === 'SCISSORS' && randomChoice === 'PAPER') ||
      (userChoice === 'PAPER' && randomChoice === 'ROCK')
    ) {
      this.setState(prevstate => ({
        resultDetails: gotUserDetails,
        resultText: 'YOU WON',
        resultCard: true,
        scoreCount: prevstate.scoreCount + 1,
      }))
    } else {
      this.setState(prevState => ({
        resultDetails: gotUserDetails,
        resultText: 'YOU LOSE',
        resultCard: true,
        scoreCount: prevState.scoreCount - 1,
      }))
    }
  }

  onClickPlayAgain = () => {
    this.setState({resultCard: false})
  }

  renderResultView = () => {
    const {resultDetails, resultText} = this.state
    return (
      <div className="result-container">
        <div className="choice-container">
          <div>
            <p className="choice-person">YOU</p>
            <img
              className="choose-img"
              src={resultDetails[1].imageUrl}
              alt="your choice"
            />
          </div>
          <div>
            <p className="choice-person">OPPONENT</p>
            <img
              className="choose-img"
              src={resultDetails[0].imageUrl}
              alt="opponent choice"
            />
          </div>
        </div>
        <p className="result-para">{resultText}</p>
        <button
          type="button"
          onClick={this.onClickPlayAgain}
          className="play-again-btn"
        >
          PLAY AGAIN
        </button>
      </div>
    )
  }

  renderGameView = () => {
    const {choicesList} = this.props

    return (
      <div className="game-container">
        <button
          onClick={() => this.onSelectGame(choicesList[0].id)}
          type="button"
          className="coin-button"
          key={choicesList[0].id}
          data-testid="rockButton"
        >
          <img
            className="choose-img"
            src={choicesList[0].imageUrl}
            alt={choicesList[0].id}
            key={choicesList[0].id}
          />
        </button>
        <button
          onClick={() => this.onSelectGame(choicesList[1].id)}
          type="button"
          className="coin-button"
          key={choicesList[1].id}
          data-testid="scissorsButton"
        >
          <img
            className="choose-img"
            src={choicesList[1].imageUrl}
            alt={choicesList[1].id}
            key={choicesList[1].id}
          />
        </button>
        <button
          onClick={() => this.onSelectGame(choicesList[2].id)}
          type="button"
          className="coin-button"
          key={choicesList[2].id}
          data-testid="paperButton"
        >
          <img
            className="choose-img"
            src={choicesList[2].imageUrl}
            alt={choicesList[2].id}
            key={choicesList[2].id}
          />
        </button>
      </div>
    )
  }

  renderPopup = () => {
    return (
      <div className="popup-container">
        <Popup
          modal
          trigger={
            <button type="button" className="rules-button">
              RULES
            </button>
          }
        >
          {close => (
            <div className="popup-view">
              <button
                type="button"
                className="trigger-button-close"
                aria-label="Save"
                onClick={() => close()}
              >
                <RiCloseLine />
              </button>
              <img
                className="popup-img"
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
              />
            </div>
          )}
        </Popup>
      </div>
    )
  }

  render() {
    const {resultCard, scoreCount} = this.state
    return (
      <div className="main-container">
        <div className="header-container">
          <div className="game-names-container">
            <h1 className="game-name">
              ROCK
              <br /> PAPER <br /> SCISSORS
            </h1>
          </div>
          <div className="score-container">
            <p className="score-para">Score</p>
            <p className="score">{scoreCount}</p>
          </div>
        </div>
        {resultCard ? this.renderResultView() : this.renderGameView()}
        {this.renderPopup()}
      </div>
    )
  }
}

export default GameView
