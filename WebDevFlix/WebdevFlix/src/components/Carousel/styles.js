import styled from 'styled-components'

export const Title = styled.h3`
  font-size: 3rem;
  line-height: 1;
  margin-bottom: 1rem;
  display: inline-block;
  padding: 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.foreground};
`

export const SliderContainer = styled.div`
  .slick-prev {
    background: linear-gradient(90deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
    width: 50px;
    z-index: 2;
    top: 2px;
    left: 2px;
    bottom: 6px;
    height: 100%;
    transform: initial;
    margin: auto;
    transition: all 0.3s ease 0s;
  }

  .slick-next {
    background: linear-gradient(270deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);    
    width: 50px;
    z-index: 2;
    top: 2px;
    right: 0px;
    bottom: 6px;
    height: 100%;
    transform: initial;
    margin: auto;
    transition: all 0.3s ease 0s;
  }



`

export const VideoCardGroupContainer = styled.section`
  color: ${({ theme }) => theme.text};
  margin: 0 auto;
  margin-bottom: 1rem;
  width: 90%;
`
