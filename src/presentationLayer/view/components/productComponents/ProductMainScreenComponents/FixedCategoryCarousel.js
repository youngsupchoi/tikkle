import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import SelectedStateHeader from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/SelectedStateHeader';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import FilterSearch from 'src/assets/icons/FilterSearch';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {useProductMainViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductMainViewModel';
import {
  B12,
  B15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

export default function FixedCategoryCarousel() {
  const {state, actions} = useProductMainViewModel();

  return (
    <View
      style={{
        // paddingHorizontal: 16,
        marginBottom: 4,
        marginTop: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth - 32,
      }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {state.categories.map(category => (
          <AnimatedButton
            onPress={() => {
              actions.dispatchSearchOption({
                type: 'SET_CATEGORY',
                payload: {
                  categoryId: category.id,
                  selectedCategory: category.name,
                  reset: 0,
                },
              });
            }}
            key={category.id}
            style={{
              backgroundColor:
                state.searchOption.categoryId === category.id
                  ? COLOR_PRIMARY
                  : COLOR_WHITE,

              paddingHorizontal: 16,
              paddingVertical: 8,
              borderColor: COLOR_PRIMARY,
              borderWidth: 1,
              borderRadius: 8,
              // elevation: 1,
              // marginBottom: 4,
              alignItems: 'center',
              marginLeft: 8,
            }}>
            {/* <View>
              {category.id === 1 ? <Image1 width={48} height={48} /> : null}
              {category.id === 2 ? <Image2 width={48} height={48} /> : null}
              {category.id === 3 ? <Image3 width={48} height={48} /> : null}
              {category.id === 4 ? <Image4 width={48} height={48} /> : null}
            </View> */}
            <B12
              customStyle={{
                // marginTop: 8,
                color:
                  state.searchOption.categoryId === category.id
                    ? COLOR_WHITE
                    : COLOR_PRIMARY,
              }}>
              {category.name}
            </B12>
          </AnimatedButton>
        ))}
      </ScrollView>
      <AnimatedButton
        onPress={() => actions.setShowFilter(!state.showFilter)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 8,
        }}>
        <FilterSearch
          width={20}
          height={20}
          stroke={COLOR_BLACK}
          strokeWidth={2}
          scale={1}
        />
        {/* <B15 customStyle={{marginLeft: 4}}>필터</B15> */}
      </AnimatedButton>
    </View>
  );
}
