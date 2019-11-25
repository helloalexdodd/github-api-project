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
            />
            <ProfilePicture userData={userData} userStatus={userStatus} />
          </FormContainer>
          <Route path={'/user'} render={(props) => (
            <RepoList
              userRepos={userRepos}
              userData={userData} 
              userStatus={userStatus}
              history={props.history}
            />)}
          />
        </Wrapper>
      </main>
    </Router>
  );
}

export default App;