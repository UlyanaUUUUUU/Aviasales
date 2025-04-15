import React from 'react';
import {useState} from 'react'
import './Tabs.css'

export default function Tabs() {

    const [activeTab, setActiveTab] = useState('tab1');
    const tabs = [
        {id: "tab1", label: 'Самый дешевый'},
        {id: "tab2", label: 'Самый быстрый'},
        {id: "tab3", label: 'Оптимальный'},
    ]


    return (
        <ul className="tabs">
                {tabs.map((tab) => {
                    const isFirst = tab.id === "tab1"
                    const isLast = tab.id === "tab3"

                    return (
                        <li key={tab.id} className="tab_list">
                            <button
                                className={`tabs_button ${activeTab === tab.id ? 'active' : ''} ${isFirst? 'tabs_button__first' : ''} ${isLast? 'tabs_button__last' : ''}`}
                                onClick={() => setActiveTab(tab.id)}>
                                {tab.label}
                            </button>
                        </li>
                    )
                })}
        </ul>
    )
}