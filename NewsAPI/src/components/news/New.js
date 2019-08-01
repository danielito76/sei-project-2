//To create a New news article form

import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'


class New extends React.Component{


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
    const formData = {...this.state.formData, [e.target.name]: e.target.value}//previous formData plus new formData sending it to formData in this.state

    const errors= {...this.state.errors, [e.target.name]: '' }// this removes error message from the filed

    this.setState({ formData, errors}) // no strings because we are sending more than one error
  }

  handleSubmit(e) {
    e.preventDefault()// prevents form from reloading

    const token =  Auth.getToken()// getting token from localStorage

    axios.post('https://newsapi.org/v2/top-headlines?country=gb&apiKey=4be4c301dce44ea39109dbab5299296b/news', this.state.formData, { // to update formData in this.state. make post AJAX requests, code version of insomnia
    headers: {'Authorization': `Bearer ${token}`}

  })
    .then(() => this.props.history.push('/news'))
    .catch(err => this.setState({errors: err.response.data.errors}))// an error block in axios, putting the errors in the error object on state.

  }



  render() {
    console.log(this.state)
    return (
      <section className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  name="name"
                  placeholder="eg: BBC News"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.name && <small className="help is-danger">{this.state.errors.name}</small>}
            </div>
            <div className="field">
              <label className="label">Author</label>
              <div className="control">
                <input
                  className="input"
                  name="author"
                  placeholder="eg: Bill Clanksey"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.author && <small className="help is-danger">{this.state.errors.author}</small>}
            </div>
            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  className="input"
                  name="title"
                  placeholder="eg: Adverse effects of climate change"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.title && <small className="help is-danger">{this.state.errors.title}</small>}
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <input
                  className="textarea"
                  name="description"
                  placeholder="eg: Pollution affecting the climate"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.description && <small className="help is-danger">{this.state.errors.description}</small>}
            </div>

            <div className="field">
              <label className="label">Images</label>
              <div className="control">
                <input
                  className="input"
                  name="image"
                  placeholder="eg: https://i1.wp.com/metro.co.uk/wp-content/uploads/2019/07/PRC_78210515_1564575615.jpg?quality=90&strip=all&w=1200&h=630&crop=1&zoom=1&ssl=1"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.image && <small className="help is-danger">{this.state.errors.image}</small>}
            </div>

            <div className="field">
              <label className="label">URL</label>
              <div className="control">
                <input
                  className="input"
                  name="url"
                  placeholder="eg: https://metro.co.uk/2019/07/31/mum-40-found-dead-with-throat-slashed-on-shetland-isles-10494127/"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.url && <small className="help is-danger">{this.state.errors.url}</small>}
            </div>

            <div className="field">
              <label className="label">Date and Time of publishing</label>
              <div className="control">
                <input
                  className="input"
                  name="publishedAt"
                  placeholder="eg: 2019-07-31T12:19:00Z"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Content</label>
              <div className="control">
                <input
                  className="textarea"
                  name="content"
                  placeholder="eg: Global climate change is rapidly destroying the earth"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.content && <small className="help is-danger">{this.state.errors.content}</small>}
            </div>

            <button className="button is-primary">Submit</button>
          </form>
        </div>
      </section>
    )
  }
}

export default New
