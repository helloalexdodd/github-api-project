import React from 'react';

const HandleData = props => {
  const { userData, setUserData, setUserInput, setUserRepos, setUserStatus } = props;

  if (userData === undefined) {
    setUserStatus('Sorry your search has not returned any results.');
    setUserRepos('');
    setUserInput('');
  } else if (userData.login) {
    setUserData(userData);
    setUserInput('');
  } else if (Array.isArray(userData)) {
    setUserRepos(userData);
    setUserStatus('');
  }
  return(null);
}

export default HandleData;