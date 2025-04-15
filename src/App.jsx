import React from 'react';
import logo from './Images/Logo.svg'
import './App.css'
import Filter from './Components/Filter.jsx'
import TicketList from "./Components/TicketList.jsx";

function App() {


    return (
        <>
            <header className="header">
                <img src={logo} alt="Logo" className="logo"/>
            </header>
            <section className="aviasales">
                <Filter/>
                <TicketList/>
            </section>
        </>
    )
}

export default App
