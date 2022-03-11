import styled from 'styled-components'

export const OriginalButton = styled.button`
 border: 1.2px solid ${({ theme }) => theme.foreground} ;
 padding: 1em; 
 font-size: 1rem;
 background-color: ${({ theme }) => theme.background};
 color: ${({ theme }) => theme.text};
 cursor: pointer;

 &:hover {
background-color: ${({ theme }) => theme.hover};
 }
`
