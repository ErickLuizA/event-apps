import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Form, InputGroup } from './styles'

import api from '../../services/api'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Button from '../../components/Button'
import Bottombar from '../../components/Bottombar'

function NewEpisode () {
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const history = useHistory()

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleLinkChange = (e) => {
    setLink(e.target.value)
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const lowerCaseCategory = category.toLowerCase()

    const data = {
      title,
      link,
      category: lowerCaseCategory,
      description
    }

    try {
      await api.post('/newepisode', data)

      history.push('/')
    } catch (error) {
      alert('A error ocurred while trying to add episode, please try again.')
    }
  }

  return (
    <>
      <Navbar />
      <Form onSubmit={handleFormSubmit}>
        <fieldset>
          <legend>New Episode</legend>
          <InputGroup>
            <input
              type='text'
              name='title'
              id='title'
              value={title}
              onChange={handleTitleChange}
              required
            />
            <label htmlFor='title'> Title </label>
          </InputGroup>
          <InputGroup>
            <input
              type='text'
              name='link'
              id='link'
              value={link}
              onChange={handleLinkChange}
              required
            />
            <label htmlFor='link'> Link </label>
          </InputGroup>
          <InputGroup>
            <input
              type='text'
              name='category'
              id='category'
              value={category}
              onChange={handleCategoryChange}
              required
            />
            <label htmlFor='category'> Category </label>
          </InputGroup>
          <InputGroup>
            <input
              type='text'
              name='description'
              id='description'
              value={description}
              onChange={handleDescriptionChange}
              required
            />
            <label htmlFor='description'> Description </label>
          </InputGroup>
          <Button type='submit'> Add episode </Button>
        </fieldset>
      </Form>
      <Footer />
      <Bottombar />
    </>
  )
}

export default NewEpisode
