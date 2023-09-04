import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {B, B12, B15, M11} from '../Global/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from '../Global/Colors/Colors';
import AnimatedButton from '../Global/Buttons/AnimatedButton';
import Image1 from '../../assets/icons/undraw_watch_application_uhc9.svg';
import Image2 from '../../assets/icons/undraw_gaming_re_cma2.svg';
import Image3 from '../../assets/icons/undraw_jewelry_iima.svg';
import Image4 from '../../assets/icons/undraw_studying_re_deca.svg';
const categories = [
  {
    id: 1,
    name: '전자제품',
    image:
      'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    id: 2,
    name: '게임기',
    image:
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZhc2hpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 3,
    name: '화장품',
    image:
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29zbWV0aWNzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
  {
    id: 4,
    name: '홈데코',
    image:
      'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
  },
];

export default function CategoryCarousel(props) {
  const {selectedCategory, setSelectedCategory, categoryId, setCategoryId} =
    props;

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map(category => (
        <AnimatedButton
          onPress={() => {
            setSelectedCategory(category.name);
            setCategoryId(category.id);
          }}
          key={category.id}
          style={{
            backgroundColor:
              categoryId === category.id ? COLOR_PRIMARY : COLOR_WHITE,
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
              color: categoryId === category.id ? COLOR_WHITE : COLOR_BLACK,
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
