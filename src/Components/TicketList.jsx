import React, {useEffect} from 'react';
import Tabs from './Tabs';
import './TicketList.css'
import {useDispatch, useSelector} from 'react-redux';
import {fetchSearchId, fetchTickets} from '../Store/FetchData.js'
import {add, format} from 'date-fns';


export default function TicketList() {
    const dispatch = useDispatch();
    const {searchId, stop, tickets, status} = useSelector(state => state.tickets);
    const [visibleTickets, setVisibleTickets] = React.useState(5);

    useEffect(() => {
        dispatch(fetchSearchId());
    }, [dispatch]);

    useEffect(() => {
        if (searchId && !stop) {
            const loadTickets = async () => {
                while (true) {
                    const result = await dispatch(fetchTickets(searchId));
                    if (fetchTickets.fulfilled.match(result)) {
                        if (result.payload.stop) break;
                    }
                }
            }
            loadTickets()
        }
        if (searchId && stop) {
            console.log(tickets)
        }
    }, [dispatch, searchId, stop]);

    if (status === 'loading') console.log('загрузка')

    const handleShowMore = () => {
        setVisibleTickets(prev => prev + 5)
    }


    const ticket = tickets.slice(0, visibleTickets).map((ticket, i) => {

            const transfers = (arr) => {
                if (arr.length === 1) {
                    return '1 пересадка'
                } else if (arr.length === 2) {
                    return '2 пересадки'
                } else if (arr.length === 3) {
                    return '3 пересадки'
                } else {
                    return 'без пересадок'
                }
            }

            const travelTime = (min) => {
                const hours = Math.floor(min / 60);
                const minutes = Math.floor(min % 60);
                return `${hours}ч ${minutes}м`;
            }

            const flightTime = (departure, arrival) => {
                departure = new Date(departure);
                arrival = add(departure, {minutes: arrival});

                return `${format(departure, 'HH:mm')}-${format(arrival, 'HH:mm')}`;
            }


            return (
                <li key={i} className="ticket">
                    <div className="ticket_header">
                        <p className='ticket_price'>{ticket.price} P</p>
                        <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="logo"/>
                    </div>
                    <ul className="ticket_info">
                        <li className="ticket_route">
                            <span className='info'>{ticket.segments[0].origin}-{ticket.segments[0].destination}</span>
                            <span
                                className='info_local'>{flightTime(ticket.segments[0].date, ticket.segments[0].duration)}</span>
                        </li>
                        <li className="ticket_route">
                            <span className='info'>В пути</span>
                            <span className='info_local'>{travelTime(ticket.segments[0].duration)}</span>
                        </li>
                        <li className="ticket_route">
                            <span className='info'>{transfers(ticket.segments[0].stops)}</span>
                            <span className='info_local'>{ticket.segments[0].stops.join(',')}</span>
                        </li>
                        <li className="ticket_route">
                            <span className='info'>{ticket.segments[1].origin}-{ticket.segments[1].destination}</span>
                            <span
                                className='info_local'>{flightTime(ticket.segments[1].date, ticket.segments[1].duration)}</span>
                        </li>
                        <li className="ticket_route">
                            <span className='info'>В пути</span>
                            <span className='info_local'>{travelTime(ticket.segments[1].duration)}</span>
                        </li>
                        <li className="ticket_route">
                        <span
                            className='info'>{transfers(ticket.segments[1].stops)}</span>
                            <span className='info_local'>{ticket.segments[1].stops.join(',')}</span>
                        </li>
                    </ul>
                </li>
            )
        }
    )

    return (
        <div>
            <Tabs/>
            <ul className="tickets">
                {ticket}
            </ul>
            {visibleTickets < tickets.length && (
                <button className='showMore' onClick={handleShowMore}> Показать еще 5 билетов! </button>
            )}
        </div>
    )
}



