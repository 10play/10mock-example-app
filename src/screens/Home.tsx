import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import styled from 'styled-components';
import {BASE_API_URL, LOADING_SKELETONS_NUM} from '../helpers';
import {CocktailCard, CocktailSkeleton} from '../components';
import {TextInput} from 'react-native-paper';
import axios from 'axios';
import {HomeScreenNavigationProp, ICocktail} from '../types';

export function Home({navigation}: {navigation: HomeScreenNavigationProp}) {
  const [searchText, setSearchText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [randomCocktail, setRandomCocktail] = useState<ICocktail | null>(null);
  const [searchedCocktails, setSearchedCocktails] = useState<ICocktail[]>([]);

  const handleFetchRandomCocktail = useCallback(async (): Promise<void> => {
    try {
      const {data: cocktail} = await axios.get(`${BASE_API_URL}/random.php`);
      setRandomCocktail(cocktail.drinks[0]);
    } catch {}
  }, []);

  const handleSearchCocktail = useCallback(
    async (search: string): Promise<void> => {
      setLoading(true);
      try {
        const {data: cocktails} = await axios.get(
          `${BASE_API_URL}/search.php?s=${search}`,
        );
        setSearchedCocktails(cocktails?.drinks || []);
      } catch {
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    (async () => {
      await handleFetchRandomCocktail();
    })();
  }, [handleFetchRandomCocktail]);

  const handleSearch = async (search: string) => {
    setSearchText(search);
    await handleSearchCocktail(search);
  };

  return (
    <HomeContainer>
      <ScrollView>
        {/* @ts-ignore */}
        <StyledInput
          label={'Search drink'}
          value={searchText}
          testID="input"
          onChangeText={(text) => handleSearch(text)}
        />
        {searchText ? (
          <>
            <Title>
              {!loading && searchedCocktails.length} Search results for{' '}
              {searchText}:
            </Title>
            {loading &&
              new Array(LOADING_SKELETONS_NUM)
                .fill(null)
                .map((_, i) => (
                  <CocktailSkeleton key={`cocktailSkeleton${i}`} />
                ))}
            {searchedCocktails.map((cocktail: ICocktail) => (
              <CocktailCard
                key={cocktail.idDrink}
                cocktail={cocktail}
                navigation={navigation}
              />
            ))}
          </>
        ) : (
          <View>
            <TouchableOpacity
              testID="randomCocktailBtn"
              onPress={handleFetchRandomCocktail}>
              <Title testID="title">
                While you are thinking what cocktail you want heres random
                cocktail
              </Title>
            </TouchableOpacity>
            {randomCocktail ? (
              <CocktailCard
                testID="randomCocktail"
                cocktail={randomCocktail}
                navigation={navigation}
              />
            ) : (
              <CocktailSkeleton />
            )}
          </View>
        )}
      </ScrollView>
    </HomeContainer>
  );
}

const Title = styled(Text)`
  color: ${({theme}) => theme.colors.font};
  font-size: 30px;
  padding: 15px;
`;

const HomeContainer = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`;

const StyledInput = styled(TextInput)`
  margin-top: 20px;
  width: 90%;
  align-self: center;
`;
