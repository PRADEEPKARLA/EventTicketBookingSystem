import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import './styles.css';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:5000/api/bookings/history', {
          headers: { Authorization: `Bearer ${token}` } // Pass the token if required
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <Header/>
      <h2>Booking History</h2>
      {bookings.length > 0 ? (
        <div>
          {bookings.map((booking) => (
            <div key={booking._id}>
              <p>Event Name: {booking.event?.name || 'N/A'}</p> {/* Safely access event name */}
              <p>Seats: {booking.seats.join(', ') || 'N/A'}</p> {/* Ensure seats are displayed */}
              <p>Booking Date: {new Date(booking.bookingDate).toLocaleDateString() || 'N/A'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};
export default BookingHistory;

