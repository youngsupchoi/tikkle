// import {
//   Dimensions,
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {B17, B20, M11, M15} from '../Global/Typography/Typography';
// import {
//   SPACING_1,
//   SPACING_2,
//   SPACING_5,
//   SPACING_6,
// } from '../Global/Spacing/BaseSpacing';
// import {
//   COLOR_GRAY,
//   COLOR_WHITE,
//   backgroundColor,
// } from '../Global/Colors/Colors';
// import Animated, {
//   useSharedValue,
//   useAnimatedScrollHandler,
//   useAnimatedStyle,
//   interpolate,
//   Extrapolate,
// } from 'react-native-reanimated';
// import Barcode from 'react-native-barcode-builder';

// const {width} = Dimensions.get('window');

// const ITEM_LENGTH = width * 0.8; // Item is a square. Therefore, its height and width are of the same length.
// const BORDER_RADIUS = 20;

// export default HistoryCarousel = ({data}) => {
//   const scrollX = useSharedValue(0);

//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: event => {
//       scrollX.value = event.contentOffset.x;
//     },
//   });
//   const renderItem = ({item, index}) => {
//     const inputRange = [
//       (index - 1) * ITEM_LENGTH,
//       index * ITEM_LENGTH,
//       (index + 1) * ITEM_LENGTH,
//     ];

//     const animatedStyles = useAnimatedStyle(() => {
//       const scale = interpolate(
//         scrollX.value,
//         inputRange,
//         [0.8, 1, 0.8],
//         Extrapolate.CLAMP,
//       );

//       const opacity = interpolate(
//         scrollX.value,
//         inputRange,
//         [0.3, 1, 0.3],
//         Extrapolate.CLAMP,
//       );

//       return {
//         transform: [{scale}],
//         opacity,
//       };
//     });

//     // your item rendering code...
//     return (
//       <Animated.View
//         style={{
//           width: ITEM_LENGTH,
//           marginHorizontal: width * 0.1,
//           marginTop: SPACING_5 * 2,
//         }}>
//         <View style={styles.itemContent}>
//           <View
//             style={[
//               styles.itemHeaderContainer,
//               {backgroundColor: item.backgroundColor},
//             ]}>
//             <View style={styles.itemTitleContainer}>
//               <M15 numberOfLines={1}>{item.brand}</M15>
//               <B20 numberOfLines={1}>{item.title}</B20>
//             </View>
//             <View style={styles.itemTikkleContainer}>
//               <B17>TIKKLE</B17>
//             </View>
//           </View>

//           <View style={styles.itemImageContainer}>
//             <Image source={{uri: item.productImage}} style={styles.itemImage} />
//             <View style={styles.leftCircle} />
//             <View style={styles.rightCircle} />
//           </View>

//           <View
//             style={[
//               styles.itemFooterContainer,
//               {backgroundColor: item.backgroundColor},
//             ]}>
//             {console.log(item.productID)}
//             <Barcode
//               value={item.productID}
//               format={'CODE128'}
//               height={50}
//               lineColor={'#000000'}
//             />
//             <M11 numberOfLines={1}>{item.productID}</M11>
//           </View>
//         </View>
//         {console.log(item)}
//       </Animated.View>
//     );
//   };
//   return (
//     <View style={styles.container}>
//       <FlatList
//         pagingEnabled
//         data={data}
//         renderItem={({item, index}) => {
//           return (
//             <View
//               style={{
//                 width: ITEM_LENGTH,
//                 marginHorizontal: width * 0.1,
//                 marginTop: SPACING_5 * 2,
//               }}>
//               <View style={styles.itemContent}>
//                 <View
//                   style={[
//                     styles.itemHeaderContainer,
//                     {backgroundColor: item.backgroundColor},
//                   ]}>
//                   <View style={styles.itemTitleContainer}>
//                     <M15 numberOfLines={1}>{item.brand}</M15>
//                     <B20 numberOfLines={1}>{item.title}</B20>
//                   </View>
//                   <View style={styles.itemTikkleContainer}>
//                     <B17>TIKKLE</B17>
//                   </View>
//                 </View>

//                 <View style={styles.itemImageContainer}>
//                   <Image
//                     source={{
//                       uri: item.productImage,
//                     }}
//                     style={styles.itemImage}
//                   />
//                   <View style={styles.leftCircle} />
//                   <View style={styles.rightCircle} />
//                 </View>

//                 <View
//                   style={[
//                     styles.itemFooterContainer,
//                     {backgroundColor: item.backgroundColor},
//                   ]}>
//                   {console.log(item.productID)}
//                   {/* <Barcode value={item.productID} /> */}
//                   {/* <Barcode value={`${item.productID}`} /> */}
//                   <M11 numberOfLines={1}>{item.productID}</M11>
//                 </View>
//               </View>
//               {console.log(item)}
//             </View>
//           );
//         }}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={item => item.id}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {},
//   itemContent: {
//     width: '100%',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   itemHeaderContainer: {
//     width: '100%',
//     padding: SPACING_2,
//     borderTopLeftRadius: BORDER_RADIUS,
//     borderTopRightRadius: BORDER_RADIUS,
//     borderBottomColor: COLOR_WHITE,
//     borderBottomWidth: 2,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   itemTitleContainer: {},
//   itemTikkleContainer: {
//     flexDirection: 'row',
//     alignSelf: 'flex-end',
//   },
//   itemImageContainer: {
//     width: '100%',
//     height: ITEM_LENGTH,
//   },
//   itemImage: {
//     width: '100%',
//     height: ITEM_LENGTH,
//     resizeMode: 'cover',
//   },
//   leftCircle: {
//     position: 'absolute',
//     left: -30,
//     bottom: 50,
//     borderRadius: 60,
//     width: 60,
//     height: 60,
//     backgroundColor: backgroundColor,
//   },
//   rightCircle: {
//     position: 'absolute',
//     right: -30,
//     bottom: 50,
//     borderRadius: 60,
//     width: 60,
//     height: 60,
//     backgroundColor: backgroundColor,
//   },
//   itemFooterContainer: {
//     width: '100%',
//     padding: SPACING_1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderTopColor: COLOR_WHITE,
//     // borderStyle: 'dashed',
//     borderTopWidth: 2,
//     borderBottomLeftRadius: BORDER_RADIUS,
//     borderBottomRightRadius: BORDER_RADIUS,
//   },
// });
