import React from 'react';
// import {BrowserRouter as Router, Route } from 'react-router-dom';
import { usePromiseTracker } from "react-promise-tracker";
import LoadingIndicator from './LoadingIndicator';
import styled from 'styled-components';
import { A } from '../GlobalStyles';

const RepoInfoContainer = styled.div`
  margin-top: 100px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 20px 0;
`;

  const H3 = styled.h3`
    position: relative;
    margin-bottom: 50px;
  
    &:after {
      content: '';
      position: absolute;
      left: -5%;
      bottom: -20px;
      width: 110%;
      height: 1px;
      background: grey;
    }
  `;
  
const H4 = styled.h4`
  font-size: 0.9rem;
  font-style: italic;
`;

const RepoInformation = styled.ul`
  list-style: none;

  li {
    margin-top: 20px;
    border-bottom: 1px solid grey;
  }
`;

const P = styled.p`
  margin: 10px;
`;

const UserInfo = props => {
  const { userRepos, userData, userStatus } = props;
  const { promiseInProgress } = usePromiseTracker();

  return (
    <>
      {promiseInProgress && 
      <LoadingIndicator />}

      {userStatus === 'Sorry your search has not returned any results.' || promiseInProgress ? null :
      <RepoInfoContainer>

        { userData && userData.name && userRepos.length ? <H3>{userData.name}'s Repositories</H3> :
        userData && !userData.name && userRepos.length ? <H3>{userData.login}'s Repositories</H3> :
        userData && !userRepos.length ? <H3>Sorry, this user doesn't have any public repositories</H3> :  null }

        <RepoInformation>

          { userData && userRepos.length ? userRepos.map((repo, i) => {
            return <li key={i}>
              <A href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</A>
              
              {repo.description ? <H4>{repo.description}</H4> : null}
              
              <FlexContainer>
                <P>Stars: {repo.stargazers_count}</P>
                <P>Watchers: {repo.watchers}</P>
                <P>Forks: {repo.forks}</P>
              </FlexContainer>
            </li>
          
          }) : null }

        </RepoInformation>
      </RepoInfoContainer>}
    </>
  )
};

export default UserInfo;