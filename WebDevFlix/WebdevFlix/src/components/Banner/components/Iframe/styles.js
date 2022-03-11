import styled from 'styled-components'

export const Video = styled.iframe`
  width: 50%;
  height: 60%;
  padding-left: 1em;

  @media(max-width: 768px) {
    display: none;
  }
`
