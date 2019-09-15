import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Juissi Johtaja',
  likes: 2,
  url: 'www.testi.fi',
  id: '12345'
}

describe('SimpleBlog contents', () => {

  test('SimpleBlog renders content', () => {

    const component = render(
      <SimpleBlog blog={blog} />
    )

    component.debug()

    /* // tapa 1
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  // tapa 2
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined() */

    // tapa 3
    const divTitle = component.container.querySelector('.blogTitle')
    expect(divTitle).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )

    const divAuthor = component.container.querySelector('.blogAuthor')
    expect(divAuthor).toHaveTextContent(
      'Juissi Johtaja'
    )

    const divLikes = component.container.querySelector('.blogLikes')
    expect(divLikes).toHaveTextContent(
      '2'
    )
  })

  test('SimpleBlog renders content v2', () => {

    const component = render(
      <SimpleBlog blog={blog} />
    )
    const content = component.container.querySelector('.blogContent')

    console.log(prettyDOM(content))
  })


  test('SimpleBlog clicking the button calls event handler once', async () => {

    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})