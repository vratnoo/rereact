import React from 'react'
import Footer from './Footer'
import Header from './Header'
import "./layout.css"

const Layout = ({children})=>{

    return(
        <>
        <Header/>
        <main>
            <div className="container">
                {children}

            </div>
        </main>
        <Footer/>
        </>
            
    )

}
export default Layout