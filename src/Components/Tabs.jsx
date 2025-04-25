import React from 'react';
import {useState} from 'react'
import './Tabs.css'
import {setSortBy} from "../Store/FilterSlice.js";
import {useDispatch} from "react-redux";

export default function Tabs() {

    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState('tab1');
    const tabs = [
        {id: "tab1", label: 'Самый дешевый', sortBy:'cheapest'},
        {id: "tab2", label: 'Самый быстрый', sortBy:'fastest'},
        {id: "tab3", label: 'Оптимальный', sortBy:'optimal'},
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
                                onClick={() => {
                                    setActiveTab(tab.id)
                                    dispatch(setSortBy(tab.sortBy))
                                    console.log(tab.sortBy, 'Это Tabs')
                                }}>
                                {tab.label}
                            </button>
                        </li>
                    )
                })}
        </ul>
    )
}