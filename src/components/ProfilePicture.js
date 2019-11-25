import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import LoadingIndicator from './LoadingIndicator';
import Octocat from './../images/Octocat.jpg';
import ShatteredOctocat from './../images/ShatteredOctocat.png';
import styled from 'styled-components';
import { A } from '../GlobalStyles';

const ProfilePicture = props => {
  const { userData, userStatus } = props;
  const { promiseInProgress } = usePromiseTracker();
  
  const ImageContainer = styled.div`
    width: 40%;
    margin: 0 50px 50px 50px;
  
    @media (max-width: 600px) {
     margin-top: 50px;
    }
  `;
  
  const Image = styled.img`
    max-width: 400px;
    min-width: 200px;
    ${() => userData.avatar_url ? 'border-radius: 50%;' : null};
  `;
  
  return (
    <ImageContainer>
      {promiseInProgress && 
      <LoadingIndicator />}
      {!promiseInProgress &&
      <A href={userData.html_url} target="_blank" rel="noopener noreferrer">
        <Image
          src={ 
            userStatus === 'Sorry your search has not returned any results.' ? ShatteredOctocat :
            typeof userData === 'object' ? userData.avatar_url :
            Octocat 
          }
          alt={ 
            userData === '' ? 'Github Mascot, Octocat' :
            typeof userData === 'object' ? `profile picture of ${userData.name}` :
            userData === 'Sorry your search has not returned any results.' ? 'a shattered drawing of the Github mascot, Octocat' :
            'Github Mascot, Octocat' 
          }
        />
      </A>}
    </ImageContainer>
  )
}

export default ProfilePicture;