//Register.js page is for site registration and authentication


import React from 'react'
import axios from 'axios'


class Register extends React.Component{


  constructor(){
    super()
    this.state = {
      formData:{},
      errors: {}// no strings because we are sending more than one error
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const formData= {...this.state.formData, [e.target.name]: e.target.value}//previous formData plus new formData
    const errors= {...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors}) // no strings because we are sending more than one error
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('https://newsapi.org/v2/top-headlines?country=gb&apiKey=4be4c301dce44ea39109dbab5299296b/register', this.state.formData) // to update formData in this.state
    .then(() => this.props.history.push('/Login'))
    .catch(err => this.setState({errors: err.response.data.errors}))// an error block in axios

  }


  // fetch('https://winebored.herokuapp.com/register', {
    //   method: 'POST',
    //   body: JSON.stringify(this.state),
    //   headers: { 'Content-Type': 'application/json' }// what does this do
    // })
    //   .then(res => {
      //     if (res.status === 422){
        //       res.json()
        //         .then(data => this.setState({errors: data.errors}))// to show errors in registration
        //     }else{
          //       this.props.history.push('/login')// redirect to the link page
          //     }
          //
          //   })



  render() {
    console.log(this.state)
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  name="username"
                  placeholder="eg: Ejike"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
            </div>
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
              {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
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
              {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
            </div>
            <div className="field">
              <label className="label">Password Confirmation</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="passwordConfirmation"
                  placeholder="eg: ••••••••"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.passwordConfirmation && <small className="help is-danger">{this.state.errors.passwordConfirmation}</small>}
            </div>

            <button className="button is-primary">Submit</button>
          </form>
        </div>
      </section>
    )
  }
}

export default Register
