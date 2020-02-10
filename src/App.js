import React,{ useState } from 'react';
import Header from './Components/Header/Header.jsx';
import RestaurantsList from './Views/Restaurants/RestaurantsList.jsx';
import UserList from './Views/Users/UserList.jsx';
import './App.css';

export default function App() {
  const [logged, setLogged] = useState(false);

  function handleLoginChange() {
    setLogged(true);
  }

  return (
    <div className="App">
      <Header/>
      {sessionStorage.getItem('user') || logged ?
        <div className="App-UserList"><RestaurantsList/></div> : <div className="App-UserList"><UserList onLogin={handleLoginChange}/></div>
      }
    </div>
  );
}
