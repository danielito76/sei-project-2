# **Project 2: THE ONLINE MIRROR** ![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)
## News Aggregator


## Overview
This is my second project from General Assembly's Software Engineering Immersive Course. It is a pair project built in two days.
The Online  is a news aggregator website collating news from different online papers across various countries.

Given the project requirements, my colleague Ejike Chiboca and I decided soon to build an online news-media which could provide news in real time.
We wanted the project to have a graphic style similar to the most prestigious News Organisations Online with a touch of humour on the website header.
The user can easily browse through the most recent news choosing between various countries.

[Deployed project]  (https://danielito76.github.io/sei-project-2/#/)
[GitHub Repo] (https://github.com/danielito76/sei-project-2)


![First GIF](/src/img/readme-screenshots/ezgif.com-video-to-gif.gif)

———————————————————————


## Brief
* Looking for a free reliable public news API
* Testing the API’s potential
* Testing the requests to the external API
* Building the Index of the news
* Making the filtering functions
* Developing a Landing page which could display the latest news
* Styling the website
* Deploy your game online, using Github Pages, where the rest of the world can access it


———————————————————————

## Technologies Used
* HTML5
* JavaScript (ES6)
* React
* Babel
* Webpack
* Node JS
* Express
* Bulma and SCSS
* SASS
* External API
* Insomnia
* Package.json
* Git 5
* GitHub



———————————————————————


## Approach Taken

We started looking for a public API which could provide news in real time: having a good API was fundamental for this kind of project. After finding the right resource and obtaining the credentials to access it, we designed the wireframe and the backend structure. My colleague focused on the index page with the list of the news; I worked on the dynamic landing page which displays the latest news.
Firstly We made a React application consisting of five components: app.js, Index.js, Navbar.js, Card.js, Show.js

The app.js is the main JavaScript element with a Hash Router wich allows the user to switch between the different elements.
Every news information fetched from the API is displayed on the Index.js page inside nested elements: the Card.js.
Then we implemented three different functions on the page to make the user able to choose the type of news and their order.
After that We made the Show.js component which displays a more detailed version of the news and provide a link to the original Source of the news.
At the end We made Home.js, the landing page that we wanted to display the latest news updating in real time.
Finally we styled the website: We used Bulma, SCSS and a jpeg header that I made with photopea.com




## Functionality

-Fetching data from the API

```javascript
newsUpdate(countryCode){
    console.log('new news...')
    axios.get(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${process.env.NEWSAPI_KEY}`)
      .then(res => this.setState({newsapi: res.data.articles}))// function that gets the data from the articles array
  }
```


- Filtering data functions
```javascript
(this.filterNews = this.filterNews.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.newsUpdate = this.newsUpdate.bind(this)
    this.handleCountry = this.handleCountry.bind(this)
  }

  componentDidMount() {
    this.newsUpdate('gb')
    this.interval = setInterval(() => this.newsUpdate(), 60000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }


  handleSearch(e) {
    this.setState({ searchTerm: e.target.value })
  }

  handleSort(e){
    this.setState({sortTerm: e.target.value})
  }

  handleCountry(e) {
    this.newsUpdate(e.target.value)
  }


  newsUpdate(countryCode){
    console.log('new news...')
    axios.get(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${process.env.NEWSAPI_KEY}`)
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

```




- Showing the latest news on the landing page which updates every 5 minutes thanks to a timer.
```javascript
(constructor(){
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
```




———————————————————————




## Screenshots
The Online Mirror - Landing page
![Landing page](/src/img/readme-screenshots/THE_OL_MIRROR_LP.png)
The Online Mirror - Index
![FIndex](/src/img/readme-screenshots/THE_OL_MIRROR_Index.PNG)
The Online Mirror - Show page
![Show page](/src/img/readme-screenshots/THE_OL_MIRROR_Show.PNG)
The Online Mirror - Original source
![Original source](/src/img/readme-screenshots/THE_OL_MIRROR_Source.PNG)




———————————————————————


### Bugs
* We had only one bug when we deployed the project online: the jpeg header was not displayed. We fixed the issue just by moving the img folder outside the components directory.


———————————————————————



### Wins, Blockers and key learnings

Since the timeframe of the project was only two days, We were good at deciding quikcly the type of the website and at finding and testing a News public API.
We had two blockers: the first one was making the general structure of the application, the second one was about displaying the specific news on the Show component, that is because the API did not allowed Us to pick up and handle single news. We fixed the inconvenient by displaying on the Show component just a more detailed version of the data which are displayed on the Card element.
We are particularly proud of our job regarding the landing page that We made able to display the latest news thanks to a Javascript timer function which automatically updates the page every 5 minutes.



———————————————————————




### Future Content

Two future improvement can be:
* Make the Country filter dynamic so the User can choose the source of the news depending on the API potential
* Integrate the website with other pages and other services, using other public APIs
