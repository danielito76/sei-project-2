//app.js brings everything together

import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Switch} from 'react-router-dom'

import Navbar from './components/common/Navbar'
import NewsIndex from './components/news/Index'
import NewsShow from './components/news/Show'
import NewsNew from './components/news/New'
import WinesEdit from './components/wines/Edit'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './components/pages/Home'

import _ from 'lodash'
import 'bulma'
import './style.scss'

class App extends React.Component {
  render() {
    return(
      <HashRouter>
        <Navbar />

        <Switch>
          <Route path="/news/:id/edit" component={NewsEdit}/>
          <Route path="/news/new" component={NewsNew}/>
          <Route path="/news/:id" component={NewsShow}/>
          <Route path="/news" component={NewsIndex}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
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
