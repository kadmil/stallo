import React from 'react'
import ReactDOM from 'react-dom'

import StarImpression from './star-impression/star-impression'

import './app.styl'

class App extends React.Component {
  constructor() {
    super()
    this.state= {
      stars: 0,
      people: 0,
      hidden: false
    }
  }


  render(props) {

    return (
      <div className='playground'>
        <button onClick={() =>
          this.setState({ stars: this.state.stars + 15, people: this.state.people + 1, score: Math.random() })
        }> Boom! </button>

        <button onClick={() =>
          this.setState({ hidden: !this.state.hidden  })
        }> Show/hide </button>

          {
             (!this.state.hidden) ?
              (
                <div className='showcase'>
                  <StarImpression width={1100} height={750}
                    starsCount={this.state.stars}
                    peopleCount={this.state.people}
                    averageScore={this.state.score}
                  />
                 <StarImpression width={600} height={400}
                    starsCount={this.state.stars}
                    peopleCount={this.state.people}
                    averageScore={this.state.score}
                    engineId='123'
                  />
                </div>
              ) : ''
          }

      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('playground-root'))