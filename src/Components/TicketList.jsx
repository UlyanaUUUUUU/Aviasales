import React, { useEffect, useMemo, useState } from 'react';
import './TicketList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchThunk, fetchTicketsThunk } from '../Store/FetchData.js';
import { add, format } from 'date-fns';
import { Flex, Progress } from 'antd';

export default function TicketList() {
  const dispatch = useDispatch();
  const { searchId, stop, tickets, status } = useSelector((state) => state.tickets);
  const filters = useSelector((state) => state.filters);
  const [visibleTickets, setVisibleTickets] = useState(5);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    dispatch(fetchSearchThunk());
  }, [dispatch]);

  useEffect(() => {
    if (searchId) {
      const loadTickets = async () => {
        let requestCount = 0;
        const totalRequestCount = 13;

        while (true) {
          try {
            const result = await dispatch(fetchTicketsThunk(searchId));
            if (fetchTicketsThunk.fulfilled.match(result)) {
              requestCount += 1;
              const percent = Math.min((requestCount / totalRequestCount) * 100, 99);
              setLoadProgress(percent);

              if (result.payload.stop) {
                break;
              }
            }
          } catch (err) {
            console.error("Ошибка при загрузке данных: ", err);
          }
        }
      };

      loadTickets();
    }
  }, [dispatch, searchId, stop]);


  const filteredTickets = useMemo(() => {
    if (!tickets || !filters) return tickets;

    let result = tickets;

    if (!filters.all) {
      const allowedStops = Object.entries(filters.transfers)
        .filter(([, isChecked]) => isChecked)
        .map(([stops]) => Number(stops));

      result = tickets.filter((ticket) =>
        ticket.segments.every((segment) => Array.isArray(segment.stops) && allowedStops.includes(segment.stops.length))
      );
    }

    result = [...result];

    switch (filters.sortBy) {
      case 'cheapest':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'fastest':
        result.sort((a, b) => {
          const durationA = a.segments.reduce((sum, s) => sum + s.duration, 0);
          const durationB = b.segments.reduce((sum, s) => sum + s.duration, 0);
          return durationA - durationB;
        });
        break;
      case 'optimal':
        result.sort((a, b) => {
          const aScore = a.price + 0.5 * a.segments.reduce((sum, s) => sum + s.duration, 0);
          const bScore = b.price + 0.5 * b.segments.reduce((sum, s) => sum + s.duration, 0);
          return aScore - bScore;
        });
        break;
    }

    return result;
  }, [tickets, filters]);

  const handleShowMore = () => {
    setVisibleTickets((prev) => prev + 5);
  };

  if (
    !filters.transfers[0] &&
    !filters.transfers[1] &&
    !filters.transfers[2] &&
    !filters.transfers[3] &&
    !filters.all
  ) {
    return (
      <div className="container">
        <span className="ticket_price">
          {' '}
          Рейсов, подходящих под <br /> заданные фильтры, не найдено
        </span>
      </div>
    );
  }

  if (tickets.length < 5) {
    return (
      <div className="container">
        <span className="loader"></span>
      </div>
    );
  }

  const ticket = filteredTickets.slice(0, visibleTickets).map((ticket, i) => {
    const transfers = (arr) => {
      if (arr.length === 1) {
        return '1 пересадка';
      } else if (arr.length === 2) {
        return '2 пересадки';
      } else if (arr.length === 3) {
        return '3 пересадки';
      } else {
        return 'без пересадок';
      }
    };

    const travelTime = (min) => {
      const hours = Math.floor(min / 60);
      const minutes = Math.floor(min % 60);
      return `${hours}ч ${minutes}м`;
    };

    const flightTime = (departure, arrival) => {
      departure = new Date(departure);
      arrival = add(departure, { minutes: arrival });

      return `${format(departure, 'HH:mm')}-${format(arrival, 'HH:mm')}`;
    };

    return (
      <li key={i} className="ticket">
        <div className="ticket_header">
          <p className="ticket_price">{ticket.price} P</p>
          <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt="logo" />
        </div>
        <ul className="ticket_info">
          <li className="ticket_route">
            <span className="info">
              {ticket.segments[0].origin}-{ticket.segments[0].destination}
            </span>
            <span className="info_local">{flightTime(ticket.segments[0].date, ticket.segments[0].duration)}</span>
          </li>
          <li className="ticket_route">
            <span className="info">В пути</span>
            <span className="info_local">{travelTime(ticket.segments[0].duration)}</span>
          </li>
          <li className="ticket_route">
            <span className="info">{transfers(ticket.segments[0].stops)}</span>
            <span className="info_local">{ticket.segments[0].stops.join(',')}</span>
          </li>
          <li className="ticket_route">
            <span className="info">
              {ticket.segments[1].origin}-{ticket.segments[1].destination}
            </span>
            <span className="info_local">{flightTime(ticket.segments[1].date, ticket.segments[1].duration)}</span>
          </li>
          <li className="ticket_route">
            <span className="info">В пути</span>
            <span className="info_local">{travelTime(ticket.segments[1].duration)}</span>
          </li>
          <li className="ticket_route">
            <span className="info">{transfers(ticket.segments[1].stops)}</span>
            <span className="info_local">{ticket.segments[1].stops.join(',')}</span>
          </li>
        </ul>
      </li>
    );
  });

  return (
    <div>
      {status === 'loading' ? (
        <Flex vertical gap="small">
          <Progress strokeLinecap="butt" percent={Math.round(loadProgress)} status="active" />
        </Flex>
      ) : null}
      <ul className="tickets">{ticket}</ul>
      {visibleTickets < filteredTickets.length && (
        <button className="showMore" onClick={handleShowMore}>
          {' '}
          Показать еще 5 билетов!{' '}
        </button>
      )}
    </div>
  );
}
