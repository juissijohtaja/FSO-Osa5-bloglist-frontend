import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')

import App from './App'


describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    // expectations here
    const blogs = component.container.querySelectorAll('.blogContentFull')
    expect(blogs.length).toBe(0)

    const divLogin = component.container.querySelector('.loginForm')
    expect(divLogin).toHaveTextContent(
      'Login'
    )
    const divLatestBlogs = component.container.querySelector('.mainPage')
    expect(divLatestBlogs).toHaveTextContent(
      'Blogit'
    )
    expect(divLatestBlogs).not.toHaveTextContent(
      'Latest blogs'
    )
  })

  test('if user is logged, blogs are rendered', async () => {

    const user = {
      username: 'raimo',
      token: '$2b$10$KRspt6qivQdEkgLlYLhz5ul65sdWLCCSeIsoYGL1PCVaiTBEqSVzm',
      name: 'Raimo Kaulus'
    }
    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('Latest blogs')
    )

    // expectations here
    const blogs = component.container.querySelectorAll('.blogContentFull')
    expect(blogs.length).toBe(3)

    const divMainPAge = component.container.querySelector('.mainPage')
    expect(divMainPAge).not.toHaveTextContent(
      'Login'
    )
    expect(divMainPAge).toHaveTextContent(
      'Blogit'
    )
    expect(divMainPAge).toHaveTextContent(
      'Latest blogs'
    )
    expect(divMainPAge).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(divMainPAge).toHaveTextContent(
      'Lorem ipsum'
    )
    expect(divMainPAge).toHaveTextContent(
      'Dolor sit amet'
    )

  })
})