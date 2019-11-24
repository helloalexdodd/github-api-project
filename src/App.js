import React, { useState, useEffect, useRef } from 'react';
import { trackPromise } from 'react-promise-tracker';
import axios from 'axios';
import { GITHUB_API_REPOS_URL } from './constants/GithubApi';
import { GlobalStyle } from './GlobalStyles';
import Header from './components/Header';
import Main from './components/Main';

const App = () => {
  const [userInput, setUserInput] =  useState('');
  const [userData, setUserData] = useState('');
  const [userRepos, setUserRepos] = useState('');
  const [userStatus, setUserStatus] = useState('')
  const didMountRef = useRef(false);

  useEffect(() => {
    document.getElementById('text').focus();
  }, []);

  useEffect(() => {
    if (didMountRef.current) {
      fetchData(`${GITHUB_API_REPOS_URL(userData.login)}`);
    } else didMountRef.current = true;
  }, [userData]);

  const handleChange = e => setUserInput(e.target.value);

  const fetchData = (url) => {
    trackPromise(
      axios.get(url)
        .then(res => {
          handleData(res.data);
        }, err => {
          console.log(err);
          handleData();
        })
    );
  };  

  const handleData = (data) => {
    if (data === undefined) {
      setUserStatus('Sorry your search has not returned any results.');
      setUserRepos('');
      setUserInput('');
    } else if (data.login) {
      setUserStatus('');
      setUserData(data);
      setUserInput('');
    } else if (Array.isArray(data)) {
      setUserRepos(data);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Header userData={userData} userStatus={userStatus} />
      <Main 
        handleChange={handleChange}
        handleData={handleData}
        fetchData={fetchData}
        userInput={userInput}
        userData={userData}
        userRepos={userRepos}
        userStatus={userStatus}
      />
    </>
  );
}

export default App;