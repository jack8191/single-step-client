import React from 'react'
import {connect} from 'react-redux'

import {Link} from 'react-router-dom'

export function LandingPage(props) {
    return(
        <section className="landing">
            <header>
                <h2>A platform for creating and tracking personal goals</h2>
            </header>
            <p>It looks like you're either new, not logged in right now, or want to reread
                this page! If so, you're in the right place!
            </p>
            <Link to="/register">Create an Account</Link>
            <Link to="/login">Login</Link>
            <h4>How it Works</h4>
            <p>Create a goal. This can be anything. Go to the gym, eat
                50 eggs, write your novel.
            </p>
            <p>Create a target number and a completion date. The target
                number represents a seperate time you completed a goal-realated activity.
            </p>
            <p>
                Finally, create a reward. This can be a link to the product 
                page of something you want to buy, an article or video, or 
                anything that you'll look forward to during your journey.
            </p>
            <p>
                After each completion, press the single-step button! This 
                will increment your progress one higher towards your target.
                When your progress hits your target, your reward will display.
            </p>
            <p>
                Don't meet your target? No worries! You can 
                keep stepping until you get there no matter how long it ends up taking.
            </p>
            <p>
                That's most of the important stuff. 
                Remember, the journey of a thousand miles begins with...
                A cliche!
            </p>
        </section>
    )
}

const mapStateToProps = state =>({
    loggedIn: state.auth.currentUser !== null
})

export default connect(mapStateToProps)(LandingPage)