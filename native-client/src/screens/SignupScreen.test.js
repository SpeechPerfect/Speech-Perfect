import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import API_ROOT from '../../IP_addresses'

Enzyme.configure({ adapter: new Adapter() })

import SignupScreen from './SignupScreen'

describe('Signup', () => {
  let mockAxios = new MockAdapter(axios)
  const fakeData = JSON.stringify('fakeUserData')
  it('requests on the correct route', () => {
    mockAxios.onPost(`${API_ROOT}/auth/signup`).replyOnce(200, fakeData)
    expect.assertions(1)
    const rendered = Enzyme.shallow(<SignupScreen />)
    rendered.setState({
      email: 'new@email.mail',
      password: '123',
      confirmPassword: '123'
    })
    let user = rendered
      .instance()
      .onButtonPress()
      .then(() => {
        return rendered.instance().state.user
      })
    return expect(user).resolves.toEqual(JSON.parse(fakeData))
  })
})
