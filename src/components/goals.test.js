import React from 'react'
import {shallow, mount} from 'enzyme'
import {Goals} from './goals'

describe('<Goals/>', () => {
    it('renders without crashing', () => {
        const dispatch = jest.fn()
        shallow(<Goals goals={[{
        id: "5",
        title: "wingus",
        description: "bringus",
        targetDate: '09/09/2020',
        progress: '5',
        target: '7',
        reward: '8'
        }]}
        currentUser={{username: 'geoff'}}
        dispatch={dispatch}
        />) 
    })
})