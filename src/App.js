import React, { Component } from 'react'
import Circles from './Circles'
import About from './About'
import Contact from './Contact'
import V1 from './V1'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='gallery'>
          <h1>Sebastian Wicker</h1>
          <h2>Technical Writer</h2>
          <V1 />
          <Circles />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Contact />
          <p className='footer'>
            Seattle, Washington <b>|</b>  1 (540) 538-8308 <b>|</b> rswicker@gmail.com <b>|</b> www.linkedin.com
          </p>
        </div>
      </div>
    )
  }
}

export default App
