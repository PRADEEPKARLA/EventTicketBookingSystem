import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from './Header';
import './styles.css';

const SeatSelection = () => {
  const { eventId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const token = localStorage.getItem('token');

  const handleSelectSeat = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleBooking = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/bookings',
        { eventId, seats: selectedSeats },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Booking successful!');
      fetchBookedSeats();
    } catch (error) {
      console.error('Error during booking:', error);
      alert('Booking failed.');
    }
  };

  const fetchBookedSeats = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/events/${eventId}/bookings`);
      setBookedSeats(response.data);
    } catch (error) {
      console.error('Error fetching booked seats:', error);
    }
  };

  useEffect(() => {
    fetchBookedSeats();
  }, [eventId]);

  return (
    <div className="container">
      <Header />
      <h2>Select Seats</h2>
      <div className="seat-grid">
        {[...Array(100).keys()].map((i) => (
          <button
            key={i}
            className={`seat-button ${bookedSeats.includes(i) ? 'booked' : ''} ${selectedSeats.includes(i) ? 'selected' : ''}`}
            onClick={() => handleSelectSeat(i)}
            disabled={bookedSeats.includes(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button onClick={handleBooking}>Book Selected Seats</button>
    </div>
  );
};

export default SeatSelection;
