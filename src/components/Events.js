
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './styles.css'; 


const Events = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // For search
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleBookNow = (eventId) => {
    navigate(`/seat-selection/${eventId}`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.date.toLocaleDateString().includes(searchTerm)
  );

  return (
    <div className="container">
      <Header />
      <h2>Available Events</h2>
      <input
        type="text"
        placeholder="Search by name, category, or date"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />
      {filteredEvents.length > 0 ? (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div key={event._id} className="event-card">
              <img src={event.imageUrl} alt={event.name} className="event-image" />
              <p>Name: {event.name}</p>
              <p>Category: {event.category}</p>
              <p>Date: {(event.date).toLocaleString()}</p>
              <p>Available Seats: {event.seats}</p>
              <button onClick={() => handleBookNow(event._id)} className="book-now-button">
                Book Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found matching your search criteria.</p>
      )}
    </div>
  );
};

export default Events;

