import React from 'react'
import Navigaion from '../components/Navigation'

const Header = ({childern})=>{

    return (
        <header>
        <div className="header_wrapper">

        <div className='brand'>
            <div className="brand_wrapper">
                <h1>PM KISAN NIDHI YOJNA</h1>
                <p>A portal for collecting land seeding data for futher process.</p>
            </div>
        </div>
        <Navigaion/>
        </div>
            
        </header>
    )
}

export default Header