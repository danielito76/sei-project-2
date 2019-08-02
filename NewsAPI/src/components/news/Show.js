//show.js acts as the filter to search and read up a single news item/page

import React from 'react'





class NewsShow extends React.Component {
  constructor() {
    super()

    this.state ={}
  }

  componentDidMount() {
    if(!this.props.location.state) return this.props.history.replace('/')
    this.setState({ news: this.props.location.state })
  }

  render() {
    if(!this.state.news) return <h1>Loading...</h1>
    return (
      <section className="section">
        <div className="container">
          <h1 className="title is-2">{this.state.news.source.name}</h1>
          <h2 className="subtitle is-4">{this.state.news.title}</h2>
          <h3 className="subtitle is-4">{this.state.news.description}</h3>

          <hr />

          <div className="columns">
            <div className="column">
              <figure className="image">
                <img src={this.state.news.urlToImage} alt={this.state.news.source.name} />
              </figure>
            </div>
            <div className="column">
              <p>{this.state.news.content}</p>
              <p className="satellite"> 📡
                <a href={this.state.news.url} target ="_blank" rel="noopener noreferrer">{this.state.news.url}</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default NewsShow
