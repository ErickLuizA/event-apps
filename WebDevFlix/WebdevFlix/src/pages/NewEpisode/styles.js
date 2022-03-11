import styled from 'styled-components'

export const Form = styled.form`
  width: 90%;
  max-width: 1360px;
  margin: 2em auto;

  fieldset {
    border-color: ${({ theme }) => theme.foreground};
    border-radius: 0.5em;
    text-align: center;
    padding: 2em;
    position: relative;
    legend {
      margin: 0 auto;
      font-size: 2rem;
      color: ${({ theme }) => theme.text};
    }

    input {
      width: 100%;
      padding: 1em;
      border: none;
      margin-bottom: 2.5em;
      background-color: ${({ theme }) => theme.text};
    }

    label {
      position: absolute;
      left: 10px;
      top: 10px;
      color: ${({ theme }) => theme.background}
    }

    input:focus + label,
    input:valid + label {
      top: -25px;
    }

    input:focus {
      background-color: ${({ theme }) => theme.background};
      color: ${({ theme }) => theme.text};
      border-bottom: 4px solid ${({ theme }) => theme.foreground};
      transition: 1s ease-out all;
      outline: none;
    }
  }
`

export const InputGroup = styled.div`
  position: relative;
`
