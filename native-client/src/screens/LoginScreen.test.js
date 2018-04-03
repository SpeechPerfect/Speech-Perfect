import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
Enzyme.configure({ adapter: new Adapter() })

import LoginScreen from './LoginScreen'

it('Can insert a user', () => {
  expect.assertions(1)
  const rendered = Enzyme.shallow(<LoginScreen />)
  rendered.setState({ email: 'Hello@hello.hello', password: '123' })
  console.log('LOUDNESS', rendered.instance())
  let email = rendered
    .instance()
    .onButtonPress()
    .then(() => {
      return rendered.instance().state.loggedin
    })
  return expect(email).resolves.toBe(true)
})
