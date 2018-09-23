import React, { Component } from 'react'
import Circles from './Circles'
import About from './About'
import Contact from './Contact'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='gallery'>
          <h1>Sebastian Wicker</h1>
          <h2>Technical Writer</h2>
          <Circles />
          <br />
          <br />
          <br />
          <About />
          <br />
          <br />
          <br />
          <Contact />
        </div>
      </div>
    )
  }
}

export default App
