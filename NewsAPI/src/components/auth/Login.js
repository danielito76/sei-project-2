//Login.js is for login and authentication as well

import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'


class Login extends React.Component{
  constructor(){
    super()

    this.state = {
      formData: {},
      error: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value}
    this.setState({formData, errors: ''})
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('https://newsapi.org/v2/top-headlines?country=gb&apiKey=4be4c301dce44ea39109dbab5299296b/Login', this.state.formData)
    .then(res => {
      Auth.setToken(res.data.token)// store the token in localStorage
      this.props.history.push('/news')// redirect to the cheeses INDEX stage

    })
    .catch(() =>{
      Auth.removeToken()// remove token from localStorage
      this.setState({error: 'Invalid credentials'}) //password is stored in the data, this.state
    })
  }

    // fetch('https://winebored.herokuapp.com/Login', {
      //   method: 'POST',
      //   body: JSON.stringify(this.state),
      //   headers: { 'Content-Type': 'application/json' }
      // })
      //   .then(res => {
        //     if(res.status === 401){
          //       this.setState({error: 'Invalid credentials'})
          //       localStorage.removeItem('token')
          //     }else{
            //       res.json()
            //         .then(data =>{
              //           localStorage.setItem('token', data.token),//store the token in the localStorage
              //           this.props.history.push('/wines') //redirect to cheeses Index page
              //         })
              //
              //     }
              //   })

  render() {
    console.log(this.state)
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="eg: samsonbrown@planetexpress.co.nny"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="password"
                  placeholder="eg: ••••••••"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.error && <small className="help is-danger">{this.state.error}</small>}
            </div>


            <button className="button is-primary">Submit</button>
          </form>
        </div>
      </section>
    )
  }
}
export default Login
