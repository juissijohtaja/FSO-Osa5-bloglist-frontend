const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'Component testing is done with react-testing-library',
    author: 'Juissi Johtaja',
    likes: 2,
    url: 'www.testi.fi',
    user: {
      _id: '5d6e9045cc3882480337c90c',
      username: 'raimo',
      name: 'Raimo Kaulus'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Lorem ipsum',
    author: 'Juissi Johtaja',
    likes: 2,
    url: 'www.testi.fi',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'Dolor sit amet',
    author: 'Juissi Johtaja',
    likes: 2,
    url: 'www.testi.fi',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }
]

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }