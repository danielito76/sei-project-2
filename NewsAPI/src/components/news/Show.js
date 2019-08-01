//show.js acts as the filter to search and read up a single news item/page

import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Auth from '../../lib/Auth'


class NewsShow extends React.Component {
  constructor(){
    super()

    this.state ={
      newsapi: {}
    }
    this.handleDelete =  this.handleDelete.bind(this)// put the delete function in the state and bind this.
  }

  componentDidMount() {
    console.log(this.props.match.params.id)// to get exact id of news
    axios.get(`https://newsapi.org/v2/top-headlines?country=gb&apiKey=4be4c301dce44ea39109dbab5299296b${this.props.match.params.id}`)
      .then(res => this.setState({newsapi: res.data.articles}))


    // fetch(`https://winebored.herokuapp.com/wines/${this.props.match.params.id}`)
    //   .then(res => res.json())
    //   .then(data => this.setState({ wine: data }))
  }

  handleDelete(){
    const token = Auth.getToken()// function to create the delete request to the server to delete the cheese

    axios.delete(`https://newsapi.org/v2/top-headlines?country=gb&apiKey=4be4c301dce44ea39109dbab5299296b${this.props.match.params.id}`, {
      headers: {Authorization: `Bearer ${token}`}
    })

      .then(() => this.props.history.push('/news'))// once we delete, we move back to the browser
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-2">{this.state.news.source.name}</h1>
          <h2 className="subtitle is-4">{this.state.news.title}</h2>
          <h3 className="subtitle is-4">{this.state.news.description}</h3>
          <Link to={`/news/${this.state.news._id}/edit`}className="button">Edit</Link>
          <button onClick={this.handleDelete} className="button is-danger">Delete</button>

          <hr />

          <div className="columns">
            <div className="column">
              <figure className="image is-48x48">
                <img src={this.state.news.urlToImage} alt={this.state.news.source.name} />
              </figure>
            </div>
            <div className="column">
              <p>{this.news.content}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default NewsShow
