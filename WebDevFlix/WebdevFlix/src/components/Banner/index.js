import { BannerContainer, Button } from './styles'

import Iframe from './components/Iframe'

function getYouTubeId (youtubeURL) {
  return youtubeURL.replace(
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
    '$7'
  )
}

const Banner = ({ videoTitle, url, videoDescription }) => {
  const youtubeId = getYouTubeId(url)
  const bgUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`

  return (
    <>
      <BannerContainer backgroundImg={bgUrl}>
        <BannerContainer.Group>
          <div>
            <h1>{videoTitle}</h1>
            <p>{videoDescription}</p>
          </div>
          <Iframe youtubeId={youtubeId} />
          <BannerContainer.Buttons>
            <Button href={url} target='_blank'> Watch </Button>
          </BannerContainer.Buttons>
        </BannerContainer.Group>
      </BannerContainer>
    </>
  )
}

export default Banner
