import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import axios from 'axios';
import { GITHUB_API_URL, GITHUB_API_REPOS_URL } from './../constants/GithubApi';
import styled from 'styled-components';

const StyledForm = styled.form`
  width: 50%;
  @media (max-width: 600px) {
    width: 80%;
  }
`;

const Label = styled.label`
  font-size: 0.8rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  margin: 10px 0;
  font-size: .8rem;
  font-family: 'Alata', sans-serif;

  &[type=submit] {
    background: #1f1f1f;
    color: white;
    border: none;
  }
`;

const Form = props => {
  const { handleData, userInput, setUserInput, userData, history } = props;
  const didMountRef = useRef(false);
  
  useEffect(() => {
    document.getElementById('text').focus();
  }, []);
  
  useEffect(() => {
    if (didMountRef.current) {
      fetchData(`${GITHUB_API_REPOS_URL(userData.login)}`);
    } else didMountRef.current = true;
  }, [userData.login]);
  
  const handleChange = e => setUserInput(e.target.value);

  const handleSubmit = () => {
    const userName = userInput.trim();
    history.push(`/user/${userName}`);
    fetchData(`${GITHUB_API_URL(userName)}`);
  };

  const fetchData = (url) => {
    trackPromise(
      axios.get(url)
        .then(res => {
          handleData(res.data);
        }, () => {
          handleData();
        })
    );
  };
  
  return (
    <Router>
      <StyledForm 
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }
      }>
        <Label htmlFor="text">Enter a Github Username or Organization:</Label>
        <StyledInput type="text" id="text" name="text" placeholder="eg. Octocat" value={userInput} onChange={handleChange} />
        <StyledInput type="submit" value="Submit" />
      </StyledForm>
    </Router>
  )
};

export default withRouter(Form);