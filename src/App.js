import React, { useState, useEffect } from 'react';
import Header from './Components/Header/Header.jsx';
import Card from './Components/Card/Card.jsx';
import Timer from './Components/Timer/Timer.jsx';
import RestaurantsList from './Views/Restaurants/RestaurantsList.jsx';
import RestaurantsVotesList from './Views/Restaurants/RestaurantsVotesList.jsx';
import UserList from './Views/Users/UserList.jsx';
import RestaurantsVotingService from './Services/RestaurantsService/RestaurantsVotingService';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

const useStyles = makeStyles(theme => ({
  timerDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardDiv: {
    width: '50vh'
  }

}));

export default function App() {
  const [logged, setLogged] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userName, setUserName] = useState(false);
  const [error, setError] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [winner, setWinner] = useState('{}');
  const restaurantsVotingService = new RestaurantsVotingService();
  const classes = useStyles();

  function handleLogIn(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
    handleShowResultChange(false, '');
    setLogged(true);
  }

  function handleLogOut() {
    sessionStorage.removeItem('user');
    setLogged(false);
  }

  function handleSecondsChange(seconds) {
    setSeconds(seconds);
  }

  function handleShowResultChange(show, userName) {
    setUserName(userName);
    setShowResult(show);
  }

  useEffect(() => {
    let startTime = new Date();
    let endTime = new Date();
    endTime.setHours(11);
    endTime.setMinutes(30);
    endTime.setSeconds(0);
    endTime.setMilliseconds(0);

    let count = ((endTime.getTime() - startTime.getTime()) / 1000);
    handleSecondsChange(count);

    if (count <= 0)
      endVoting();
  }, []);

  function endVoting() {
    restaurantsVotingService.put('/api/restaurants/voting/end',
      (success) => {
        setWinner(success);
      }, (error) => {
        setError(true);
      });
  };

  return (
    <div className="App">
      <Header logout={handleLogOut} backButton={sessionStorage.getItem('user') || logged} />
      <div className={classes.timerDiv}>
        <Timer endVoting={endVoting} seconds={seconds} error={error} />
        {winner !== '{}' ?
          <div className={classes.cardDiv}>
            <Card prop={winner} voteDisabled />
          </div>
          : ''}
      </div>
      {winner === '{}' && (!error || seconds > 0) ?
        <div>
          <div className="App-UserList">
            {logged || sessionStorage.getItem('user') ?
              <RestaurantsList user={JSON.parse(sessionStorage.getItem('user'))} logout={handleLogOut} showResult={handleShowResultChange} /> : <UserList onLogin={handleLogIn} />
            }
          </div>
        </div>
        : ''}
      <div>
        {showResult ?
          <RestaurantsVotesList userName={userName} />
          : ''}
      </div>
    </div>
  );
}
