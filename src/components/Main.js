import React from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Wrapper } from '../GlobalStyles';
import Form from './Form';
import ProfilePicture from './ProfilePicture';
import RepoInfo from './RepoInfo';

const FormContainer = styled.div`
  display: flex;
  min-height: 300px;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Main = props => {
  const { handleChange, handleData, userInput, userData, userRepos, userStatus, fetchData } = props;

  return (
    <Wrapper>
      <Router>
        <FormContainer>
          <Form
            handleChange={handleChange}
            fetchData={fetchData}
            userInput={userInput}
          />
          <ProfilePicture userData={userData} userStatus={userStatus} />
        </FormContainer>
        {/* <Route path='/user/:id' render={(routeProps) => (
            <RepoInfo
              {...routeProps} 
              handleData={handleData}
              fetchData={fetchData}
              userData={userData}
              userRepos={userRepos}
              userStatus={userStatus}
            />
          )} 
        /> */}
        <RepoInfo 
          handleData={handleData}
          fetchData={fetchData}
          userData={userData}
          userRepos={userRepos}
          userStatus={userStatus}
        />
      </Router>
    </Wrapper>
  )
};

export default Main;