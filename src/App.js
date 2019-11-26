import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle, Wrapper } from './GlobalStyles';
import Header from './components/Header';
import Form from './components/Form';
import ProfilePicture from './components/ProfilePicture';
import RepoList from './components/RepoList';

const FormContainer = styled.div`
  display: flex;
  min-height: 300px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const App = () => {
  const [userInput, setUserInput] =  useState('');
  const [userData, setUserData] = useState('');
  const [userRepos, setUserRepos] = useState('');
  const [userStatus, setUserStatus] = useState('')

  const handleData = (data) => {
    if (data === undefined) {
      setUserStatus('Sorry your search has not returned any results.');
      setUserRepos('');
    } else if (data.login) {
      setUserStatus('');
      setUserData('');
      setUserData(data);
    } else if (Array.isArray(data)) {
      setUserRepos('');
      setUserRepos(data);
    }
    setUserInput('');
  };

  return (
    <Router>
      <GlobalStyle />
      <Header userData={userData} userStatus={userStatus} />
      <main>
        <Wrapper>
          <FormContainer>
            <Form
              handleData={handleData}
              userInput={userInput}
              setUserInput={setUserInput}
              userData={userData}
              setUserData={setUserData}
              setUserStatus={setUserStatus}
              setUserRepos={setUserRepos}
            />
            <ProfilePicture userData={userData} userStatus={userStatus} />
          </FormContainer>
          <Route path={`/user/:${userData.login}`} render={() => (
            <RepoList
              userRepos={userRepos}
              userData={userData} 
              userStatus={userStatus}
            />)}
          />
        </Wrapper>
      </main>
    </Router>
  );
}

export default App;