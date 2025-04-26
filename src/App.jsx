import React from 'react';
import logo from './Images/Logo.svg';
import './App.scss';
import Filter from './Components/Filter.jsx';
import TicketList from './Components/TicketList.jsx';
import Tabs from './Components/Tabs.jsx';

function App() {
  return (
    <>
      <header className="header">
        <img src={logo} alt="Logo" className="logo" />
      </header>
      <section className="aviasales">
        <Filter />
        <div>
          <Tabs />
          <TicketList />
        </div>
      </section>
    </>
  );
}

export default App;
