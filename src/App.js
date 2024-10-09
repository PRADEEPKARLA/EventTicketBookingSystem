import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Events from './components/Events';
import SeatSelection from './components/SeatSelection';
import BookingHistory from './components/BookingHistory';

const routerConfig = createBrowserRouter([
  {
    path: "/register",
    element: <Register />
  }, {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/events",
    element: <Events />
  },
  {
    path: "/seat-selection/:eventId",
    element: <SeatSelection />
  },
  {
    path: "/booking-history",
    element: <BookingHistory />
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={routerConfig} />
    </div>
  );
}

export default App;
