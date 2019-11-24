import React from 'react';
import { GITHUB_API_URL } from './../constants/GithubApi';
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
  const { handleChange, userInput, fetchData } = props;
  return (
    <StyledForm 
      onSubmit={e => {
        e.preventDefault();
        fetchData(`${GITHUB_API_URL(userInput.trim())}`);
      }
    }>
      <Label htmlFor="text">Enter a Github Username or Organization:</Label>
      <StyledInput type="text" id="text" name="text" placeholder="eg. Octocat" value={userInput} onChange={handleChange} />
      <StyledInput type="submit"value="Submit" />
    </StyledForm>
  )
};

export default Form;