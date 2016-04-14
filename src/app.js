import React from 'react'
import ReactDOM from 'react-dom'

import ScoringScreen from './star-client-side/scoring-screen'

// import './app.styl'
import './client.styl'

class App extends React.Component {
  constructor() {
    super()
    this.state = { counter: 0 }
  }

  render(props) {

    return (
      <ScoringScreen />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('playground-root'))