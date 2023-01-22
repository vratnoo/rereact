import React from 'react'
import Navigaion from '../components/Navigation'

const Header = ({childern})=>{

    return (
        <header>
                
        <div className="header_wrapper">
            <div className="nav-container">
                <div className="brand">
                    <h1>PM KISAN SAMMAN NIDHI YOJNA</h1>
                    <p>A portal for collecting land seeding data for futher process.</p>
                </div>
            </div>

        </div>

        <div className="nav-wrapper">
            <div className="nav-container">
                <Navigaion/>
            </div>
        </div>




        
       

            
        </header>
    )
}

export default Header