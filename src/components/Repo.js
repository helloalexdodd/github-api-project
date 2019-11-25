import React from 'react';
import styled from 'styled-components';
import { A } from '../GlobalStyles';

const Repo = props => {
  const { userData, userRepos } = props;
  
  const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 20px 0;

    @media (max-width: 600px) {
      flex-direction: column;
      flex-wrap: no-wrap;
    }
  `;

  const H4 = styled.h4`
    font-size: 0.9rem;
    font-style: italic;

    @media (max-width: 600px) {
      font-size: 0.7rem;
      font-weight: 400;
    }
  `;
  
  const P = styled.p`
    margin: 10px;
  `;
    
  const Repo = styled.ul`
    list-style: none;
  
    li {
      margin-top: 20px;
      border-bottom: 1px solid grey;

      @media (max-width: 600px) {
        a {
          font-size: 1.1rem;
        }
      }
    }
`;

  return (
    <Repo>
      { userData && userRepos.length ? userRepos.map((repo, i) => {
        return (
          <li key={i}>
            <A href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</A>
            {repo.description ? <H4>{repo.description}</H4> : null}
            <FlexContainer>
              <P>Stars: {repo.stargazers_count}</P>
              <P>Watchers: {repo.watchers}</P>
              <P>Forks: {repo.forks}</P>
            </FlexContainer>
          </li>
        )
      }) : null }
    </Repo>
)
}

export default Repo;