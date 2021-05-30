import React from 'react';
import {SafeAreaView, Image} from 'react-native';
import styled from 'styled-components';

export function Loading() {
  return (
    <LoadingContainer>
      <LoadingGif source={require('../helpers/loading.gif')} />
    </LoadingContainer>
  );
}

const LoadingContainer = styled(SafeAreaView)`
  flex: 1;
`;
const LoadingGif = styled(Image)`
  flex: 1;
`;
