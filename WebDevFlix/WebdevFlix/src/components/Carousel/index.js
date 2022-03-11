import Slider from 'react-slick'

import { VideoCardGroupContainer, Title, SliderContainer } from './styles'

import VideoCard from './components/VideoCard'

const settings = {
  dots: false,
  infinite: true,
  speed: 300,
  centerMode: false,
  variableWidth: true,
  adaptiveHeight: true
}

function Carousel ({ category, episodes }) {
  const categoryTitle = category.title.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase())

  return (
    <VideoCardGroupContainer>
      <Title>
        {categoryTitle}
      </Title>
      <SliderContainer>
        <Slider {...settings}>
          {episodes.map((episode) => {
            return (
              <VideoCard
                key={episode.id}
                videoTitle={episode.title}
                videoURL={episode.link}
              />
            )
          })}
        </Slider>
      </SliderContainer>
    </VideoCardGroupContainer>
  )
}

export default Carousel
