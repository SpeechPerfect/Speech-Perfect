import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import API_ROOT from '../../IP_addresses'
Enzyme.configure({ adapter: new Adapter() })

import LoginScreen from './LoginScreen'

describe('Signup', () => {
  let mockAxios = new MockAdapter(axios)
  const fakeData = JSON.stringify('fakeUserData')
  it('behaves properly on a successful login', () => {
    mockAxios.onPost(`${API_ROOT}/auth/login`).replyOnce(200, fakeData)
    expect.assertions(1)
    const rendered = Enzyme.shallow(<LoginScreen />)
    rendered.setState({ email: 'Hello@hello.hello', password: '123' })
    let user = rendered
      .instance()
      .onButtonPress()
      .then(() => {
        return rendered.instance().state.user
      })
    return expect(user).resolves.toEqual(JSON.parse(fakeData))
  })
})
