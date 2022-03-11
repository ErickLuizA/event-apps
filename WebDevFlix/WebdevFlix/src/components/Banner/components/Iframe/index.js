import { Video } from './styles'

const Iframe = ({ youtubeId }) => {
  return (
    <Video
      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&mute=1`}
      frameBorder='0'
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      allowFullScreen
    />
  )
}

export default Iframe
