import React from 'react'
import classNames from 'classnames'

// import StarRating from 'react-star-rating'
import Rater from 'react-rater'

export default class StarImpression extends React.Component {
  constructor() {
    super()
    this.state = {
      active: true,
      score: 0,
    }
  }

  onRate(rating, lastRating) {
    if (typeof lastRating != 'undefined') {
      this.setState({
        score: rating
      })
    }
  }

  render() {
    let a = classNames('send-button', { 'is-active': this.state.score > 0 })
    return (
      <div>
        <Rater total={5} rating={this.state.score} onRate={(rating, lastRating) => this.onRate(rating, lastRating)} />
        <div className={a}>Send</div>
      </div>

    )
  }
}
