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
      searchTerm: '',//this.state has to store the data for the searchTerm and sortTerm coming from     filterWines function
      sortTerm: 'date|asc'
    }

    this.filterNews = this.filterNews.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.newsUpdate = this.newsUpdate.bind(this)
  }

  componentDidMount() {
    this.newsUpdate()
    this.interval = setInterval(() => this.newsUpdate(), 60000)//set up an interval that refreshes every minute
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }


  handleSearch(e) {
    this.setState({ searchTerm: e.target.value })//search the
  }

  handleSort(e){
    this.setState({sortTerm: e.target.value})
  }


  newsUpdate(){
    console.log('new news...')
    axios.get('https://newsapi.org/v2/top-headlines?country=gb&apiKey=4be4c301dce44ea39109dbab5299296b')
      .then(res => this.setState({newsapi: res.data.articles}))// function that gets the data from the articles array

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

  filterlatestNews(){
    let filterlatestNews = {filterNews[0].publishedAt}
  }

  render() {
    console.log(this.state.newsapi) // if gonna console.log state do it in the render method
    if(!this.state.newsapi) return <h2>Loading...</h2>
    return (

      <div>

        <section className="hero is-primary is-medium">
          <div id="header" className="hero-body">
            <div className="container has-text-centered">
            </div>
          </div>
        </section>


        <section className="section">
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="field">
                  <input placeholder="search" className="input" onChange={this.handleSearch}/>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <div className="select is-fullwidth">
                    <select onChange={this.handleSort}>
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

                  <Link to={{
                    pathname: '/article',//A link to the pathname article, which carries the news from state
                    state: news
                  }}>
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
      </div>
    )
  }
}
export default NewsIndex
