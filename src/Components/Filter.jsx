import React from 'react';
import './Filter.css'
import { useDispatch, useSelector } from 'react-redux';
import { toggleAll, toggleTransfer} from "../Store/FilterSlice.js"

export default function Filter() {
        const dispatch = useDispatch();
        const { all, transfers } = useSelector(state => state.filters);

        const handleAllChange = () => {
            dispatch(toggleAll());
        }

        const handleTransferChange = (num) => {
            dispatch(toggleTransfer(num));
        }

    return (
        <div className="filter">
            <span className='filter_text'>Количество пересадок</span>
            <ul className='filter_list'>
                <li className="filter_item">
                    <input
                        className="filter_checkbox"
                        type="checkbox"
                        checked={all}
                        onChange={handleAllChange}
                        id="all" name="all"/>
                    <label className="filter_label" htmlFor="all">Все</label>
                </li>

                {[0, 1, 2, 3].map(num => (
                    <li className="filter_item" key={num} >
                        <input
                            className="filter_checkbox"
                            type="checkbox"
                            checked={transfers[num]}
                            onChange={() => handleTransferChange(num)}
                            id={num} name={num}
                        />
                        <label className="filter_label" htmlFor={num}>
                            {num === 0 ? 'Без пересадок' : `${num} пересадк${num > 1 ? 'и' : 'а'}`}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )

    // return (
    //     <div className="filter">
    //         <span className='filter_text'>Количество пересадок</span>
    //         <ul className='filter_list'>
    //             <li className="filter_item">
    //                     <input className="filter_checkbox" type="checkbox" id="all" name="all" />
    //                     <label className="filter_label" htmlFor="all">Все</label>
    //             </li>
    //             <li className="filter_item">
    //                     <input className="filter_checkbox" type="checkbox" id="noTransfer" name="noTransfer" />
    //                     <label className="filter_label" htmlFor="noTransfer">Без пересадок</label>
    //             </li>
    //             <li className="filter_item">
    //                     <input className="filter_checkbox" type="checkbox" id="1transfer" name="1transfer" />
    //                     <label className="filter_label" htmlFor="1transfer">1 пересадка</label>
    //             </li>
    //             <li className="filter_item">
    //                     <input className="filter_checkbox" type="checkbox" id="2transfer" name="2transfer" />
    //                     <label className="filter_label" htmlFor="2transfer">2 пересадки</label>
    //             </li>
    //             <li className="filter_item">
    //                     <input className="filter_checkbox" type="checkbox" id="3transfer" name="3transfer" />
    //                     <label className="filter_label" htmlFor="3transfer">3 пересадки</label>
    //             </li>
    //         </ul>
    //     </div>
    // )
}