import {ScrollView, View, StyleSheet} from 'react-native';
import React from 'react';
import {
  B,
  B12,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_PRIMARY_TEXT,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import Image1 from 'src/assets/icons/undraw_watch_application_uhc9.svg';
import Image2 from 'src/assets/icons/undraw_gaming_re_cma2.svg';
import Image3 from 'src/assets/icons/undraw_jewelry_iima.svg';
import Image4 from 'src/assets/icons/undraw_studying_re_deca.svg';
import {useProductMainViewModel} from 'src/presentationLayer/viewModel/productViewModels/ProductMainViewModel';

export default function CategoryCarousel() {
  const {state, actions} = useProductMainViewModel();

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {state.categories.map(category => (
        <AnimatedButton
          onPress={() => {
            actions.setSelectedCategory(category.name);
            actions.setCategoryId(category.id);
          }}
          key={category.id}
          style={{
            backgroundColor:
              state.categoryId === category.id ? COLOR_PRIMARY : COLOR_WHITE,
            paddingLeft: 20,
            paddingRight: 18,
            paddingVertical: 8,
            borderColor: COLOR_SEPARATOR,
            borderWidth: 0.5,
            borderRadius: 40,
            elevation: 1,
            marginBottom: 4,
            marginTop: 16,
            marginHorizontal: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              position: 'absolute',
              bottom: 24,
              left: 6,
              right: 0,
              // top: 0,
              // backgroundColor: 'red',
            }}>
            {category.id === 1 ? <Image1 width={24} height={24} /> : null}
            {category.id === 2 ? <Image2 width={24} height={24} /> : null}
            {category.id === 3 ? <Image3 width={24} height={24} /> : null}
            {category.id === 4 ? <Image4 width={24} height={24} /> : null}
          </View>
          <B12
            customStyle={{
              color:
                state.categoryId === category.id
                  ? COLOR_PRIMARY_TEXT
                  : COLOR_BLACK,
            }}>
            #{category.name}
          </B12>
        </AnimatedButton>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.5)',
    marginLeft: 12,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    position: 'absolute',
    borderRadius: 8,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Reduced opacity for selected item
    borderRadius: 8,
  },
  text: {
    color: COLOR_WHITE,
    textAlign: 'center',
    fontFamily: B,
  },
  selectedText: {
    color: COLOR_WHITE, // Change text color for selected item
    textAlign: 'center',
    fontFamily: B,
  },
  selectedItem: {
    borderColor: COLOR_SEPARATOR,
    borderWidth: 3, // Increased border width for selected item
  },
});
