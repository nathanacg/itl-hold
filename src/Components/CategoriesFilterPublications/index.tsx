import React, { useState } from 'react';

import {
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Text
} from 'react-native';

import {
  Container, FilterCategoryContainer, FilterCategoryContent, ImageFilteredIcon
} from './style'

import { fontStyle, theme } from '../../Theme/theme';

interface propsCategoriesFilter {
  categories: string[]
  styleCategoryContent?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>
  advancedFiltersButton?: boolean,
  onPressadvancedFiltersButton?: () => void
  onPressCategoryButton: (value: string) => void
  marginLeft?: string
  marginTop?: string
}

export default function CategoriesFilterPublications(props: propsCategoriesFilter) {
  const [selectedButton, setSelectedButton] = useState('')
  return (
    <Container
      marginLeft={props.marginLeft}
      marginTop={props.marginTop}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      {/*  {props.advancedFiltersButton && (
        <FilterCategoryContainer>
          <FilterCategoryContent onPress={() => props.onPressadvancedFiltersButton ? (
            props.onPressadvancedFiltersButton()
          ) : (() => { })}>
            <ImageFilteredIcon style={{ width: 16, height: 16 }} source={require('../../Assets/Icons/filteredIcon.png')} />
          </FilterCategoryContent>
        </FilterCategoryContainer>
      )} */}
      {props.categories.map((item, index) => (

        <TouchableOpacity
          key={index}
          onPress={() => {
            if (props.onPressCategoryButton) {
              props.onPressCategoryButton(item)
            }
            setSelectedButton(item)
          }}

          style={[
            styles.CategoryContent,
            props.styleCategoryContent,
            selectedButton === item && ({
              backgroundColor: theme.primarycolor
            })
          ]}
        >
          <Text style={[
            styles.TextItem,
            props.textStyle,
            selectedButton === item && ({
              color: theme.secondaryColor
            })
          ]}>{item}</Text>
        </TouchableOpacity>
      ))}
    </Container>
  );
};

const styles = StyleSheet.create({
  CategoryContent: {
    backgroundColor: 'rgba(2, 69, 244, 0.2)',
    minWidth: 105,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  TextItem: {
    textAlign: 'center',
    color: theme.primarycolor,
    fontFamily: fontStyle.regular,
    fontSize: 12,
    lineHeight: 22
  }
})