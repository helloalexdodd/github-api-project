import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import LoadingIndicator from './LoadingIndicator';
import styled from 'styled-components';
import Repo from './Repo';

const UserInfo = props => {
  const { userRepos, userData, userStatus } = props;
  const { promiseInProgress } = usePromiseTracker();

  const RepoInfoContainer = styled.div`
    margin-top: 100px;
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

  return (
    <>
      {promiseInProgress && 
      <LoadingIndicator />}
      {!promiseInProgress &&
      userStatus === 'Sorry your search has not returned any results.' ? null :
      <RepoInfoContainer>
        { userData.name && userRepos.length ? <H3>{userData.name}'s Repositories</H3> :
        !userData.name && userRepos.length ? <H3> {userData.login}'s Repositories</H3> :
        userData && !userRepos.length ? <H3>Sorry, this user doesn't have any public repositories</H3> :  null }
        <Repo userData={userData} userRepos={userRepos} />
      </RepoInfoContainer> }
    </>
  )
};

export default UserInfo;