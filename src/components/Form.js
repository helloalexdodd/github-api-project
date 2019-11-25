import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
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
  const { handleData, userInput, setUserInput, userData } = props;
  const didMountRef = useRef(false);
  
  useEffect(() => {
    document.getElementById('text').focus();
  }, []);
  
  useEffect(() => {
    if (didMountRef.current) {
      fetchData(`${GITHUB_API_REPOS_URL(userData.login)}`);
    } else didMountRef.current = true;
  }, [userData]);
  
  const handleChange = e => setUserInput(e.target.value);
  
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
          fetchData(`${GITHUB_API_URL(userInput.trim())}`);
        }
      }>
        <Label htmlFor="text">Enter a Github Username or Organization:</Label>
        <StyledInput type="text" id="text" name="text" placeholder="eg. Octocat" value={userInput} onChange={handleChange} />
        <Link to={`/user/${userInput}`}><StyledInput type="submit" value="Submit" /></Link>
      </StyledForm>
    </Router>
  )
};

export default Form;