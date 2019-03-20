import React from 'react'
import {shallow} from 'enzyme'
import {LandingPage} from './landing'
import {LoginPage} from './login-page'
import {LoginForm} from './login-form'
import {RegistrationPage} from './registration-page'
import {RegistrationForm} from './registration-form'
import {NavBar} from './nav-bar'

describe('<LandingPage />', () => {
    it('renders without crashing', () => {
        shallow(<LandingPage />)
    })
})

describe('LoginPage', () => {
    it('renders without crashing', () => {
        shallow(<LoginPage />)
    })
    it('renders the login form as a child', () => {
        const wrapper = shallow(<LoginPage />)
        expect(wrapper.containsMatchingElement(<LoginForm />))
    })
})

describe('<RegistrationPage />', () => {
    it('renders without crashing', () => {
        shallow(<RegistrationPage />)
    })
    it('renders the registration form as a child', () => {
        const wrapper = shallow(<RegistrationPage />)
        expect(wrapper.containsMatchingElement(<RegistrationForm />))
    })
})

describe('<NavBar />', () => {
    it('renders without crashing', () => {
        shallow(<NavBar />)
    })
    it('renders the buttons only when logged in', () => {
        const dispatch = jest.fn()
        const wrapper = shallow(<NavBar dispatch={dispatch} authToken={null}/>)
        expect(wrapper.equals(<div className='nav-links'></div>)).toEqual(false)
    })
})
