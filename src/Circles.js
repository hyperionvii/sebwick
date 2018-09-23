import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

class Circles extends Component {
  render () {
    return (
      <div className='circles'>
        <div id='circle' />
        <div id='circle2' />
      </div>
    )
  }
}

export default Circles
