import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RefreshControl} from 'react-native-gesture-handler';
import {
  StatusBarHeight,
  SPACING_1,
  SPACING_2,
  SPACING_3,
  SPACING_4,
  SPACING_6,
  HEADER_HEIGHT,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B,
  B15,
  EB,
  M15,
  B17,
  B20,
  M17,
  M20,
  B12,
  M28,
  M11,
  M,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_ERROR,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SECOND_SEPARATOR,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {useNavigation} from '@react-navigation/native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ArrowLeft from 'src/assets/icons/ArrowLeft';
import ArrowRight from 'src/assets/icons/ArrowRight';
// import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import {useMyPageViewModel} from 'src/presentationLayer/viewModel/myPageViewModels/MyPageViewModel';
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';
import Wishlisted from 'src/assets/icons/wishlisted.svg';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import DetailImages from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/DetailImages';
import {getRecivedTikkleData} from 'src/dataLayer/DataSource/Tikkling/GetRecivedTikkleData';
import Footer from 'src/presentationLayer/view/components/globalComponents/Headers/FooterComponent';
import Noti_Refund from 'src/assets/icons/Noti_Refund';

const containerWidth = windowWidth - SPACING_6;

export default function HistoryDetailScreen(route) {
  const {state, actions} = useMyPageViewModel();

  const {topActions} = useTopViewModel();

  const [tikkle_sum, setTikkle_sum] = useState(0);
  const [list_data, setList_data] = useState([]);

  let tikkle_data = [];

  /**
   *  티클링의 받은 티클 데이터 가져오기
   * @param {int} tikkling_id
   */
  async function getTikkleData(tikkling_id) {
    await getRecivedTikkleData(tikkling_id)
      .then(async res => {
        return topActions.setStateAndError(res);
      })
      .then(async res => {
        // console.log(res.DSdata.info);
        // setTikkle_data(res.DSdata.info);
        tikkle_data = res.DSdata.info;
        setList_data(res.DSdata.info);
      })
      .then(async res => {
        console.log('#### : ', tikkle_data);
        let sum = 0;
        tikkle_data.map(item => {
          if (item.state_id != 2) {
            sum += item.quantity;
          }
        });
        setTikkle_sum(sum);
        console.log(tikkle_sum);
      });
  }

  useEffect(() => {
    getTikkleData(state.route_data.tikkling_id);
  }, [state.route_data.tikkling_id]);

  return (
    <View style={{paddingTop: 0, backgroundColor: backgroundColor}}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AnimatedButton
            onPress={() => actions.navigation.goBack()}
            style={{
              width: 20,
              height: 20,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 1,
            }}>
            <ArrowLeft
              stroke={COLOR_BLACK}
              width={20}
              height={20}
              strokeWidth={1.5}
              scale={0.85}
            />
          </AnimatedButton>

          <View style={styles.small_header}>
            <View>
              <B17>티클링 상세 정보</B17>
            </View>
          </View>
        </View>
      </View>
      <FlatList
        data={list_data}
        keyExtractor={(item, index) => String(item.created_at)}
        ListHeaderComponent={
          <View style={{marginHorizontal: 15}}>
            <View
              style={{
                padding: 24,
                marginVertical: 8,
                borderBottomColor: COLOR_SEPARATOR,
                borderBottomWidth: 1,
                backgroundColor: COLOR_WHITE,
                borderRadius: 16,
              }}>
              {/* title */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <M20 customStyle={{marginBottom: 16, fontFamily: EB}}>
                  {state.route_data.created_at.split('-')[0]}{' '}
                  {state.route_data.tikkling_type} 티클링
                </M20>
                {state.route_data.state_id === 1 ? (
                  <M15 customStyle={{color: COLOR_PRIMARY, marginBottom: 10}}>
                    진행중
                  </M15>
                ) : state.route_data.state_id === 2 ? (
                  <M15 customStyle={{color: COLOR_ERROR, marginBottom: 10}}>
                    취소
                  </M15>
                ) : state.route_data.state_id === 3 ? (
                  <M15 customStyle={{color: COLOR_ERROR, marginBottom: 10}}>
                    미달성 종료
                  </M15>
                ) : state.route_data.state_id === 4 ? (
                  <M15 customStyle={{color: COLOR_PRIMARY, marginBottom: 10}}>
                    펀딩 달성
                  </M15>
                ) : state.route_data.state_id === 5 ? (
                  <M15 customStyle={{color: COLOR_GRAY, marginBottom: 10}}>
                    기간 만료
                  </M15>
                ) : null}
              </View>

              <View
                style={{
                  // marginBottom: 15,
                  backgroundColor: COLOR_SEPARATOR,
                  borderRadius: 16,
                  marginBottom: 16,
                  marginTop: 5,
                  elevation: 1,
                  borderColor: COLOR_SEPARATOR,
                  // height: 100,
                  borderWidth: 0.5,
                  // padding: 16,
                  paddingBottom: 16,
                  // paddingTop: 0,
                  width: '100%',
                  height: 170,
                  alignItems: 'top',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  padding: 10,
                }}>
                <Image
                  resizeMode="cover"
                  source={{
                    uri: state.route_data.thumbnail_image,
                  }}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: COLOR_SEPARATOR,
                  }}
                />

                <View
                  style={{
                    padding: 20,
                    paddingHorizontal: 10,
                    width: windowWidth * 0.55,
                  }}>
                  <View style={{marginBottom: 10}}>
                    <B15>{state.route_data.product_name}</B15>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '40%',
                      }}>
                      <View style={{marginBottom: 5}}>
                        <B12>브랜드 :</B12>
                      </View>
                      <View style={{marginBottom: 5}}>
                        <B12>가격 :</B12>
                      </View>
                      <View style={{marginBottom: 5}}>
                        <B12>총 티클 개수 :</B12>
                      </View>
                    </View>
                    <View
                      style={{
                        width: '70%',
                      }}>
                      <View style={{marginBottom: 5}}>
                        <B12>{state.route_data.brand_name}</B12>
                      </View>
                      <View style={{marginBottom: 5}}>
                        <B12>{state.route_data.price}₩</B12>
                      </View>
                      <View style={{marginBottom: 5}}>
                        <B12>{state.route_data.price / 5000}개</B12>
                      </View>
                    </View>
                  </View>
                </View>
              </View>

              {/* tikkling_info */}
              <View
                style={{
                  paddingHorizontal: 7,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'left',
                  }}>
                  <B15 customStyle={{marginBottom: 4}}>티클링 기간</B15>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'left',
                      alignItems: 'center',
                      marginLeft: 8,
                    }}>
                    <M15 customStyle={{color: COLOR_GRAY, marginBottom: 10}}>
                      {state.route_data.created_at.split('T')[0]}
                    </M15>
                    <B15 customStyle={{color: COLOR_GRAY, marginBottom: 10}}>
                      {'  ~  '}
                    </B15>
                    <M15 customStyle={{color: COLOR_GRAY, marginBottom: 10}}>
                      {state.route_data.funding_limit.split('T')[0]}
                    </M15>
                  </View>
                </View>

                {state.route_data.state_id === 3 ||
                state.route_data.state_id === 4 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'left',
                    }}>
                    <B15 customStyle={{marginBottom: 4}}>티클링 종료일</B15>

                    <M15
                      customStyle={{
                        color: COLOR_GRAY,
                        marginBottom: 10,
                        marginLeft: 8,
                      }}>
                      {state.route_data.terminated_at.split('T')[0]}
                    </M15>
                  </View>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'left',
                  }}>
                  <B15 customStyle={{marginBottom: 4}}>총 받은 티클 수</B15>

                  <M15
                    customStyle={{
                      color: COLOR_GRAY,
                      marginBottom: 10,
                      marginLeft: 8,
                    }}>
                    {tikkle_sum} 개
                  </M15>
                </View>

                {state.route_data.state_id === 3 ||
                state.route_data.state_id === 4 ? (
                  <View>
                    {state.route_data.resolution_type === 'refund' ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'left',
                        }}>
                        <B15 customStyle={{marginBottom: 4}}>
                          환급 / 배송 상태
                        </B15>
                        <M15
                          customStyle={{
                            color: COLOR_GRAY,
                            marginBottom: 10,
                            marginLeft: 8,
                          }}>
                          환급 신청
                        </M15>
                      </View>
                    ) : state.route_data.resolution_type === 'goods' ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'left',
                        }}>
                        <B15 customStyle={{marginBottom: 4}}>
                          환급 / 배송 상태
                        </B15>
                        <M15
                          customStyle={{
                            color: COLOR_GRAY,
                            marginBottom: 10,
                            marginLeft: 8,
                          }}>
                          배송 신청
                        </M15>
                      </View>
                    ) : null}
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        }
        ListFooterComponent={
          <View>
            <View style={{height: 100}}></View>
            <Footer />
          </View>
        }
        renderItem={({item, index}) => {
          return (
            <View style={styles.flatListItemContainer}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  {item.state_id === 2 ? (
                    <Noti_Refund
                      width={60}
                      height={60}
                      stroke={COLOR_BLACK}
                      strokeWidth={1}
                      scale={1}
                    />
                  ) : (
                    <Image
                      source={{
                        uri:
                          item.image !== null
                            ? item.image
                            : 'https://optimumsolutions.co.nz/wp-content/uploads/2021/06/profile-placeholder-768x605.jpg',
                      }}
                      style={styles.listItemImage}
                    />
                  )}

                  <View style={styles.listItemTextContainer}>
                    {item.state_id === 2 ? (
                      <View style={{marginBottom: 5}}>
                        <B15 customStyle={{color: COLOR_ERROR}}>
                          환불된 {item.NAME}님의 선물
                        </B15>
                      </View>
                    ) : (
                      <View style={{marginBottom: 5}}>
                        <B15>{item.NAME}님의 선물</B15>
                      </View>
                    )}

                    <M15 customStyle={{color: COLOR_BLACK}}>
                      [{state.route_data.product_name}]의 조각 {item.quantity}개
                    </M15>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginLeft: 60,
                    }}>
                    <B12 customStyle={{color: COLOR_GRAY}}>
                      {item.created_at.split('T')[0]}
                    </B12>
                    <B12 customStyle={{color: COLOR_GRAY}}>
                      {item.created_at.split('T')[1].split('.')[0]}
                    </B12>
                  </View>
                </View>

                {item.message ? (
                  <View style={{margin: 10}}>
                    <B15 customStyle={{color: COLOR_BLACK}}>{'<메세지>'}</B15>
                    <M11 customStyle={{color: COLOR_BLACK}}>{item.message}</M11>
                  </View>
                ) : null}
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listItemImage: {
    width: 60,
    height: 60,
    borderRadius: 32,
  },
  listItemTextContainer: {
    marginLeft: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: HEADER_HEIGHT,
  },
  small_header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 6,
    // height: HEADER_HEIGHT,
  },
  flatListItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLOR_WHITE,
    borderRadius: 16,
    marginVertical: 5,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      // iOS용 그림자 위치
      width: 0,
      height: 2,
    },
  },
});
