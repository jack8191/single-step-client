import React from 'react'
import {shallow, mount} from 'enzyme'
import {GoalCreationForm} from './goal-creation-form'
import {GoalCreationPage} from './goal-creation-page'
import {GoalEditPage} from './goal-edit-page'
import {GoalEditForm} from './goal-edit-form'
import Input from './input'



describe('<GoalCreationPage />', () => {
    it('renders without crashing', () => {
        shallow(<GoalCreationPage />)
      })
    it('renders the form as a child', () => {
        const wrapper = shallow(<GoalCreationPage />)
        expect(wrapper.containsMatchingElement(<GoalCreationForm />))
    })
})

describe('<GoalCreationForm />', () => {
    it('renders without crashing', () => {
        shallow(<GoalCreationForm />)
    })
})

describe('<GoalEditPage />', () => {
    it('renders without crashing', () => {
        const dispatch= jest.fn()
        shallow(<GoalEditPage
            dispatch={dispatch} 
            authToken={5} 
            currentUser={'geoff'} 
            goalToEdit={{
                id: "5",
                title: "wingus",
                description: "bringus",
                targetDate: '09/09/2020',
                progress: '5',
                target: '7',
                reward: '8'
            }}/>)
    })
    it('renders the edit form as a child', () => {
        const dispatch= jest.fn()
        const wrapper = shallow(<GoalEditPage
            dispatch={dispatch} 
            authToken={5} 
            currentUser={'geoff'} 
            goalToEdit={{
                id: "5",
                title: "wingus",
                description: "bringus",
                targetDate: '09/09/2020',
                progress: '5',
                target: '7',
                reward: '8'
            }}/>)
        expect(wrapper.containsMatchingElement(<GoalEditForm />))
    })
})

describe('<Input>', () => {
    it('renders without crashing', () => {
        shallow(<Input 
            input={{name: 'wuingus'}} 
            type="text" 
            label="wingus" 
            meta={{
                touched: false,
                error: false,
                warning: false
            }}/>)
    })
})
