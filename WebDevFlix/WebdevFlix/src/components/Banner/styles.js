import styled from 'styled-components'

export const BannerContainer = styled.section`
  background-image: ${({ backgroundImg }) => `url(${backgroundImg})`};
  background-size: cover;
  background-position: center;
  height: 70vh;

    &:after,
  &:before {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    right: 0;
  }

  &:before {
    top: 90px;
    height: 70.7%;
    background: rgba(0,0,0,0.5);

    @media(max-width: 500px) {
      height: 75.6%;
  }
  }

  &:after {
    background: linear-gradient(0deg, #141414 0%, transparent 100%);
    bottom: 0px;
  }
`

BannerContainer.Group = styled.div`
  color: #fff;
  width: 90%;
  height: 100%;
  max-width: 1360px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  opacity: 0.9;
  font-weight: 500;

  h1 {
    margin: 0;
    font-size: 2rem;
  }

  div {
    width: 50%;

    @media(max-width: 768px) {
      width: 100%;
  }
  }
  
  @media(max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }

  @media(min-width: 1800px) {
    font-size: 1.5em;
    h1 {
      font-size: 2.5em;
    }
  }
`

BannerContainer.Buttons = styled.div`
  text-align: center;
  @media(min-width: 768px) {
    display: none;
  }
`

export const Button = styled.a`
  
 border: 1.2px solid ${({ theme }) => theme.foreground} ;
 padding: 1em; 
 font-size: 1rem;
 background-color: ${({ theme }) => theme.background};
 color: ${({ theme }) => theme.text};
 cursor: pointer;
 text-decoration: none;
 &:hover {
  background-color: ${({ theme }) => theme.hover};
 }
  @media(min-width: 768px) {
    display: none;
  }
      
`
