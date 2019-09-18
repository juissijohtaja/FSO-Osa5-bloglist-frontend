import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const blog = {
  title: 'Component testing is done with react-testing-library',
  author: 'Juissi Johtaja',
  likes: 2,
  url: 'www.testi.fi',
  id: '12345'
}

describe('Blog contents', () => {
  test('Blog renders content', () => {

    const component = render(
      <Blog
        key={blog.id}
        blog={blog}
      />
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

    const divUrl = component.container.querySelector('.blogUrl')
    expect(divUrl).toHaveTextContent(
      'www.testi.fi'
    )
  })


  test('Blog renders content v2', () => {

    const component = render(
      <Blog blog={blog} />
    )
    const content = component.container.querySelector('.blogContent')

    console.log(prettyDOM(content))
  })


  test('Clicking blog button calls event handler twice', async () => {

    const mockHandler = jest.fn()

    const { getByText } = render(
      <Blog blog={blog} onClickTest={mockHandler} />
    )

    const button = getByText('Like this')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })

  test('Renders its children', () => {
    const component = render(
      <Blog
        key={blog.id}
        blog={blog}
      />
    )

    component.debug()

    component.container.querySelector('.blogContentFull')
  })

  test('At start the children are not displayed', () => {
    const component = render(
      <Blog
        key={blog.id}
        blog={blog}
      />
    )

    component.debug()

    const div = component.container.querySelector('.blogMore')
    //console.log('KAKKAA', div)

    expect(div).toHaveStyle('display: none')
  })

  test('After clicking the button, children are displayed', () => {
    const component = render(
      <Blog
        key={blog.id}
        blog={blog}
      />
    )

    component.debug()

    const button = component.getByText('Component testing is done with react-testing-library')
    fireEvent.click(button)

    const div = component.container.querySelector('.blogMore')
    expect(div).not.toHaveStyle('display: none')
  })

})