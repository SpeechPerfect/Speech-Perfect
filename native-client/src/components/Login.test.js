import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import Enzyme from 'enzyme'
Enzyme.configure({ adapter: new Adapter() })

import Login from './Login'

it('Can insert a user', async () => {
    function sleep(ms) { //https://stackoverflow.com/a/39914235
        return new Promise(resolve => setTimeout(resolve, ms))
    }
    expect.assertions(1)
    let email
    const rendered = Enzyme.shallow(<Login />)
    rendered.setState( {email: 'Hello@hello.hello', password: '123'} )
    let button = rendered.find('Button')
    button.simulate('press')
    //wait to give the button time to work
    await sleep(2000)
    email = rendered.state().user.email
    expect(email).toBe('Hello@hello.hello')
})
