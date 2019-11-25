import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Wrapper } from './../GlobalStyles';

const Header = props => {
  const { userData, userStatus } = props;
  
  const StyledHeader = styled.header`
    margin-bottom: 50px;
  `;
  
  const H1 = styled.h1`
    margin-bottom: 10px;
    font-size: 2rem;
  `;
  
  const H2 = styled.h2`
    margin: 0;
    ${() => userStatus === 'Sorry your search has not returned any results.' ? 'font-size: 1.2rem' : null}
  `;
  
  const P = styled.p`
    margin: 0;
  `;
  
  const FlexContainer = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    
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
    <StyledHeader>
      <Wrapper>{ userData === '' || userStatus === 'Sorry your search has not returned any results.' ? <H1>GitSearch:</H1> : <H1>GitSearch for:</H1> }
        <FlexContainer>
          
          { userStatus === 'Sorry your search has not returned any results.' ? <H2>{userStatus}</H2> :
          userData === '' ? <H2>A Github User Search Tool</H2> :
          typeof userData === 'object' && userData.name ?  <H2>{userData.name}</H2> :
          <H2>{userData.login}</H2> }

          { userData && userStatus !== 'Sorry your search has not returned any results.'? <P>Followers: {userData.followers}</P> : null }
        
        </FlexContainer>
      </Wrapper>
    </StyledHeader>
  )
};

export default Header;