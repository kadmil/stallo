import React from 'react'
import ReactDOM from 'react-dom'

import StarImpression from './star-impression/star-impression'

import './app.styl'

class App extends React.Component {
  constructor() {
    super()
    this.state = { counter: 10 }
  }

  render(props) {

    return (
      <div className='playground'>
        <button onClick={() => this.setState({ counter: this.state.counter + 15 })}> Boom! </button>

        <div className='showcase'>
          <StarImpression width={1100} height={750} counter={this.state.counter}/>
          <StarImpression width={640} height={400}  counter={this.state.counter}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('playground-root'))