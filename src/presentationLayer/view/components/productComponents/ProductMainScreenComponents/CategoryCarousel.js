import {ScrollView, View, StyleSheet} from 'react-native';
import React from 'react';
import {
  B,
  B12,
  B15,
  B20,
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
import {opacity} from 'react-native-reanimated';

export default function CategoryCarousel() {
  const {state, actions} = useProductMainViewModel();

  return (
    <View>
      <B20 customStyle={{paddingHorizontal: 16, marginBottom: 12}}>
        카테고리
      </B20>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {state.categories.map(category => (
          <AnimatedButton
            onPress={async () => {
              await actions.changeCategory(category.id, category.name);
            }}
            key={category.id}
            style={{
              backgroundColor:
                state.categoryId === category.id ? COLOR_PRIMARY : COLOR_WHITE,
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
                  state.categoryId === category.id
                    ? COLOR_WHITE
                    : COLOR_PRIMARY,
              }}>
              {category.name}
            </B12>
          </AnimatedButton>
        ))}
      </ScrollView>
    </View>
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
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 4,
    // elevation: 2,
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
    borderWidth: 1, // Increased border width for selected item
  },
});
