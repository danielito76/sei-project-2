//app.js brings everything together

import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Switch} from 'react-router-dom'

import Navbar from './components/common/Navbar'
import NewsIndex from './components/news/Index'
import NewsShow from './components/news/Show'
import Home from './components/pages/Home'



import 'bulma'
import './style.scss'

class App extends React.Component {
  render() {
    return(
      <HashRouter>
        <Navbar />

        <Switch>
          <Route path="/article" component={NewsShow}/>
          <Route path="/news" component={NewsIndex}/>
          <Route path="/" component={Home}/>
        </Switch>
      </HashRouter>

    )
  }
}



ReactDOM.render(
  <App />,
  document.getElementById('root')
)
