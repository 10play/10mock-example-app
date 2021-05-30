import React, {useMemo} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {useTheme} from '../contexts';
import {MAX_WIDTH} from '../helpers';

const baseLayout = {height: 20, marginLeft: 6, marginTop: 10};
const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    height: 300,
    width: MAX_WIDTH,
    marginTop: 30,
  },
});

export function CocktailSkeleton() {
  const {isDark} = useTheme();
  const backgroundColor: ViewStyle = useMemo(
    () => ({
      backgroundColor: isDark ? '#003847' : '#f0efeb',
    }),
    [isDark],
  );
  return (
    <SkeletonContent
      isLoading={true}
      animationDirection="horizontalLeft"
      boneColor="grey"
      highlightColor="#e9e1e1"
      containerStyle={[styles.containerStyle, backgroundColor]}
      layout={[
        {width: 200, ...baseLayout},
        {width: 300, ...baseLayout},
        {width: MAX_WIDTH, height: 200, marginTop: 10},
      ]}
    />
  );
}
