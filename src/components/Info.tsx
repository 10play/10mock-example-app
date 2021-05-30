import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

export function Info({
  info,
  navigation,
  query,
}: {
  info: string;
  navigation: any;
  query: string;
}) {
  const handleNavigation = (): void => {
    navigation.navigate('CocktailsList', {
      query,
      info: info.split(' ').join('_'),
    });
  };

  return (
    <InfoContainer onPress={handleNavigation}>
      <StyledText>{info}</StyledText>
    </InfoContainer>
  );
}

const StyledText = styled(Text)`
  color: ${({theme}) => theme.colors.font};
  font-size: 20px;
`;

const InfoContainer = styled(TouchableOpacity)`
  width: 80%;
  height: 100px;
  background-color: ${({theme}) => theme.colors.task};
  margin-top: 20px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`;
