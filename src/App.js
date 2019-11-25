import React, { useState, useEffect, userRef } from 'react';
import { GlobalStyle, Wrapper } from './GlobalStyles';
import HandleData from './components/HandleData';
import Header from './components/Header';
import styled from 'styled-components';
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

  useEffect(() => {
    document.getElementById('text').focus();
  });

  const handleChange = e => setUserInput(e.target.value);

  return (
    <>
      <GlobalStyle />
      <HandleData 
        userData={userData}
        setUserData={setUserData}
        setUserInput={setUserInput}
        setUserRepos={setUserRepos}
        setUserStatus={setUserStatus}        
      />
      <Header 
        userData={userData} 
        userStatus={userStatus}
      />
      <main>
        <Wrapper>
          <FormContainer>
            <Form
              handleChange={handleChange}
              userInput={userInput}
              setUserData={setUserData}
            />
            <ProfilePicture 
              userData={userData}
              userStatus={userStatus}
            />
          </FormContainer>
          <RepoList
            userData={userData}
            userRepos={userRepos}
            userStatus={userStatus}
          />
        </Wrapper>
      </main>
    </>
  );
}

export default App;