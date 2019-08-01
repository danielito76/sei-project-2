//index.js acts as the search and filter for all news

import React from 'react'
import {Link} from 'react-router-dom'
import Card from './Card'
import axios from 'axios'
import _ from 'lodash'

class NewsIndex extends React.Component {
  constructor(){
    super()
    this.state = {
      searchTerm: '',//this.state has to store the data for the searchTerm and sortTerm coming from filterWines function
      sortTerm: 'date|asc'
    }

    this.filterNews = this.filterNews.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    console.log('Component has mounted - rendered for the first time... The perfect place for AJAX request')
    axios.get('https://newsapi.org/v2/top-headlines?country=gb&apiKey=4be4c301dce44ea39109dbab5299296b')
      .then(res => this.setState({newsapi: res.data.articles}))


    // fetch('https://newsapi.org/v2/top-headlines?country=gb&apiKey=4be4c301dce44ea39109dbab5299296b')
    //   .then(res => res.json())
    //   .then(data => {
    //     this.setState({ newsapi: data.articles })
    //   })
    // this.updateNews()
    // setInterval(() => this.updateNews(), 5000)
  }

  handleKeyDown(e) {
    this.setState({ searchTerm: e.target.value })
  }

  handleChange(e){
    this.setState({sortTerm: e.target.value})
  }

  filterNews() {
    const re = new RegExp(this.state.searchTerm, 'i')
    const [field, order] = this.state.sortTerm.split('|')

    const filterNews = _.filter(this.state.newsapi, news => {
      return re.test(news.name) || re.test(news.title)
    })
    const sortedNews = _.orderBy(filterNews, [field], [order])

    return sortedNews
  }

  render() {
    console.log(this.state.newsapi) // if gonna console.log state do it in the render method
    if(!this.state.newsapi) return <h2>Loading...</h2>
    return (
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="field">
                <input placeholder="search" className="input" onKeyDown={this.handleKeyDown}/>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <div className="select is-fullwidth">
                  <select onChange={this.handleChange}>
                    <option value="all">All</option>
                    <option value="source.name|asc">Name A-Z</option>
                    <option value="source.name|desc">Name Z-A</option>
                    <option value="publishedAt|asc">News Latest</option>
                    <option value="publishedAt|desc">News Oldest</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="columns is-multiline">
            {this.filterNews().map(news =>
              //above we invoke the function filterNews to map over
              <div className="column is-half-tablet is-one-quarter-desktop" key={news.url}>
                <Link to ={`/news/${news._id}`}>
                  <Card
                    name={news.source.name}
                    title={news.title}
                    description={news.description}
                    image={news.urlToImage}
                  />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}
export default NewsIndex
