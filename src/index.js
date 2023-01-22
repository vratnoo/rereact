import React from 'react';
import ReactDOM from 'react-dom/client';
import "./_reset.css"
import App from './App'
import { BrowserRouter } from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';
import AuthProvider from './auth/AuthProvider'
import Layout from './layout/Layout';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
     <AuthProvider>
        <BrowserRouter>
        <Layout>
        <Toaster/>

            <App/>

        </Layout>
        </BrowserRouter>
    </AuthProvider>

    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
