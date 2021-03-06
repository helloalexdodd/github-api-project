import React from 'react';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';


const LoadingIndicator = () => {
  const Div = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 100px;
  `;

  return (
    <Div>
      <BeatLoader color={'#1f1f1f'} size={20} />
    </Div>
  )
};

export default LoadingIndicator;