import React, { useEffect, useState, createContext } from 'react';
import { Link, Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import { getItems } from './apiService';
import ItemDetail from './itemDetails';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import WelcomeMessage from './WelcomeMessage';
import { UserProvider } from './UserContext';
import AppRoutes from './Routes';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemData = await getItems();
        setItems(itemData);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  
  // const handleDeleteItem = async (itemId) => {
  //   try {
  //     await deleteItem(itemId);
  //     setItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  //   } catch (error) {
  //     console.error('Error deleting item:', error);
  //   }
  // };

  return (
    <Router>
      <UserProvider> {/* UserProvider should wrap the entire application */}
        <div>
          <div>
            <h1>Authentication App</h1>
            <RegistrationForm />
            <LoginForm />
            <WelcomeMessage />
          </div>
          <h1>Inventory List</h1>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <Link to={`/items/${item.id}`}>{item.name} - {item.type}</Link>
                {/* Add a delete button or any other actions if needed */}
              </li>
            ))}
          </ul>

          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/items/:id" element={<ItemDetail />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
};

export default App;
export const itemContext = createContext();
