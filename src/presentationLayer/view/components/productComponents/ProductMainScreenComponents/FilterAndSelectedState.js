import {View, Text} from 'react-native';
import React from 'react';
import SelectedStateHeader from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/SelectedStateHeader';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import FilterSearch from 'src/assets/icons/FilterSearch';
import {COLOR_BLACK} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {useProductMainViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductMainViewModel';
import {B15} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

export default function FilterAndSelectedState() {
  const {state, actions} = useProductMainViewModel();

  return (
    <View
      style={{
        // paddingHorizontal: 16,
        marginBottom: 8,
        marginTop: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth - 32,
      }}>
      <View style={{width: windowWidth * 0.7}}>
        <SelectedStateHeader />
      </View>
      <AnimatedButton
        onPress={() => actions.setShowFilter(!state.showFilter)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <FilterSearch
          width={16}
          height={16}
          stroke={COLOR_BLACK}
          strokeWidth={2}
          scale={0.8}
        />
        <B15 customStyle={{marginLeft: 4}}>필터</B15>
      </AnimatedButton>
    </View>
  );
}
