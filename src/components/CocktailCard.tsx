// @ts-nocheck
import React from 'react';
import {Card, Title, Chip} from 'react-native-paper';
import styled from 'styled-components';
import {ICocktail} from '../types';
import {View} from 'react-native';

export function CocktailCard({
  cocktail,
  navigation,
  testID,
}: {
  cocktail: ICocktail;
  testID?: string;
  navigation: any;
}) {
  const handleNavigation = () =>
    navigation.navigate('Cocktail', {id: cocktail.idDrink});
  return (
    <StyledCard onPress={handleNavigation} testID={testID}>
      <Card.Content>
        <StyledTitle>{cocktail.strDrink}</StyledTitle>
        <ChipContainer>
          {cocktail.strCategory && (
            <Chip mode="outlined" icon="format-list-bulleted-type">
              {cocktail.strCategory}
            </Chip>
          )}
          {cocktail.strAlcoholic && (
            <Chip mode="outlined" icon="glass-cocktail">
              {cocktail.strAlcoholic}
            </Chip>
          )}
        </ChipContainer>
      </Card.Content>
      {cocktail.strDrinkThumb && (
        <StyledCocktailCover source={{uri: cocktail.strDrinkThumb}} />
      )}
    </StyledCard>
  );
}

const StyledCocktailCover = styled(Card.Cover)`
  height: 250px;
  margin-top: 20px;
`;

const StyledTitle = styled(Title)`
  margin-bottom: 20px;
  color: ${({theme}) => theme.colors.font};
`;

const StyledCard = styled(Card)`
  background-color: ${({theme}) => theme.colors.card};
  margin-bottom: 25px;
`;

const ChipContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
`;
