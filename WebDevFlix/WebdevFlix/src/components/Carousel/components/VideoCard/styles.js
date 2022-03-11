import styled from 'styled-components'

export const VideoCardContainer = styled.a`
  border: 2px solid ${({ theme }) => theme.foreground} ;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  width: 300px;
  height: 200px;
  background-image: ${({ url }) => `url(${url})`};
  background-size: cover;
  background-position: center;
  display: flex;
  margin-right: 1rem;
  transition: opacity .3s;

  &:hover,
  &:focus {
    opacity: .5;
  }
`
