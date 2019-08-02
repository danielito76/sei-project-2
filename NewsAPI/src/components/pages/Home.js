//just displays the home page


import React from 'react'

const Home = () =>{
  return (

    <section className="hero is-primary is-medium">
      <div id="header" className="hero-body">
        <div className="container has-text-centered">
        </div>
      </div>
      <section className="section">
        <div className="container">
          <h1 className="title is-2">This is the main title</h1>
          <h2 className="subtitle is-4">This is the subtitle</h2>

          <hr />

          <div className="columns">
            <div className="column">
              <figure className="image">
                <img src='https://upload.wikimedia.org/wikipedia/commons/5/5d/Berlinermauer.jpg' alt={'Berlin wall'} />
              </figure>
            </div>
            <div className="column">
              <p>This is the content of the article</p>
            </div>
          </div>
        </div>
      </section>
    </section>


  )
}

export default Home
