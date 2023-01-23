import React from 'react'
import { Link } from 'react-router-dom'
const Home = ()=>{

    return (
        <div className="home_page">
            <h1>Instructions for using the PMKisan web portal:</h1>
    <ol>
      <li>Click the Land Seeding Link on navigation.</li>
      <li>Star by first inserting Registeration Id Which you find in beneficary status on offical portal.</li>
      <li>Enter your personal details, including your name and the location of your farm (Shiv Tehsil Headquarter, Barmer District).</li>
      <li>Use the provided tools to accurately map the boundaries of your land.</li>
      <li>Review and submit your land mapping information.</li>
      <li>Your data will be processed and sent to the official PMKisan portal for land seeding.</li>
      <li>You will receive a confirmation message when your data has been successfully submitted.</li>
      <li>If you have any issues or concerns, please contact the PMKisan support team for assistance.</li>
    </ol>
    <h2>Benefits of using PMKisan portal:</h2>
    <ul>
      <li>Ease of collecting and processing land mapping information</li>
      <li>Saving time and effort in visiting government offices</li>
      <li>Helping the government in accurate land mapping and seeding.</li>
    </ul>
        </div>
    )
}

export default Home