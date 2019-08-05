//just displays the home page


import React from 'react'
import axios from 'axios'
import _ from 'lodash'
import {Link} from 'react-router-dom'


class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      searchTerm: '',//this.state has to store the data for the searchTerm and sortTerm coming from     filterWines function
      sortTerm: 'publishedAt|asc'
    }

    this.filterNews = this.filterNews.bind(this)
    this.newsUpdate = this.newsUpdate.bind(this)
  }

  componentDidMount() {
    this.newsUpdate()
    this.interval = setInterval(() => this.newsUpdate(), 60000)//set up an interval that refreshes every minute
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }





  newsUpdate(){
    console.log('new news...')
    axios.get(`https://newsapi.org/v2/top-headlines?country=gb&apiKey=${process.env.NEWSAPI_KEY}`)
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



  render() {
    console.log(this.state.newsapi) // if gonna console.log state do it in the render method
    if(!this.state.newsapi) return <h2>Loading...</h2>
    const latestNews = this.filterNews()[0]
    console.log(latestNews)

    return (

      <section className="hero is-primary is-medium">
        <div id="header" className="hero-body">
          <div className="container has-text-centered">
          </div>
        </div>
        <section className="section">
          <div className="container">
            <Link to={{
              pathname: '/article',//A link to the pathname article, which carries the news from state
              state: latestNews
            }}>
              <h1 id="ejikeStyle" className="title is-2">{latestNews.title}</h1>


              <hr />

              <div className="columns">
                <div className="column">
                  <figure className="image">
                    <img src= {latestNews.urlToImage} alt={latestNews.title} />
                  </figure>
                </div>
                <div className="column">
                  <h2 id="ejikeStyle" className="title is-4">{latestNews.content}</h2>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </section>


    )
  }
}

export default Home
