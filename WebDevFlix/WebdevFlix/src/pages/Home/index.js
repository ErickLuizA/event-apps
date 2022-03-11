import { useState, useEffect } from 'react'

import api from '../../services/api'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Banner from '../../components/Banner'
import Carousel from '../../components/Carousel'
import Bottombar from '../../components/Bottombar'
import Spinner from '../../components/Spinner'

function Home () {
  const [categories, setCategories] = useState([])
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/episodes')
        setEpisodes(response.data)
      } catch (error) {
        alert('A error ocurred while trying to load the data, please refresh the page.')
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/categories')
        setCategories(response.data)
      } catch (error) {
        alert('A error ocurred while trying to load the data, please refresh the page.')
      }
    })()
  }, [])

  if (episodes.length === 0 || categories.length === 0) {
    return <Spinner />
  }

  return (
    <>
      <Navbar />
      <Banner
        videoTitle={episodes[0].title}
        url={episodes[0].link}
        videoDescription={episodes[0].description}
      />

      {categories.map(category => {
        const categoryEpisodes = episodes.filter(
          ep => ep.category === category.title
        )

        return (
          <Carousel
            key={category.id}
            category={category}
            episodes={categoryEpisodes}
          />
        )
      })}

      <Footer />
      <Bottombar />
    </>
  )
}

export default Home
