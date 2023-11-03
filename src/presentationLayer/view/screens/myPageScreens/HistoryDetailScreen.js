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
import TimerComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/HomeTimer';
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
  B22,
  M20,
  B12,
  M28,
  M11,
  M,
  H,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_SECONDARY,
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
import {useNavigation, useRoute} from '@react-navigation/native';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import ArrowLeft from 'src/assets/icons/ArrowLeft';
import ArrowRight from 'src/assets/icons/ArrowRight';
import BubbleFilled from 'src/assets/icons/BubbleFilled';
import CalendarFilled from 'src/assets/icons/CalendarFilled';
import GlobalLoader from 'src/presentationLayer/view/components/globalComponents/globalLoader/globalLoader';
import {useTopViewModel} from 'src/presentationLayer/viewModel/topViewModels/TopViewModel';
import DetailImages from 'src/presentationLayer/view/components/productComponents/ProductMainScreenComponents/DetailImages';
import {getRecivedTikkleData} from 'src/dataLayer/DataSource/Tikkling/GetRecivedTikkleData';
import Footer from 'src/presentationLayer/view/components/globalComponents/Headers/FooterComponent';
import Noti_Refund from 'src/assets/icons/Noti_Refund';
import LinearGradient from 'react-native-linear-gradient';
import FlagFilled from 'src/assets/icons/FlagFilled';
import BarComponent from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/ProgressBar/ProgressBar';

const containerWidth = windowWidth - SPACING_6;

export default function HistoryDetailScreen(route) {
  const {topActions} = useTopViewModel();
  const navigation = useNavigation();
  const [tikkle_sum, setTikkle_sum] = useState(0);
  const [list_data, setList_data] = useState([]);

  let tikkle_data = [];

  const temp_R = useRoute();
  const route_data = temp_R.params;

  /**
   *  티클링의 받은 티클 데이터 가져오기
   * @param {int} tikkling_id
   */
  async function getTikkleData(tikkling_id) {
    // console.log('###$#$#$#$ : ', route_data);
    await getRecivedTikkleData(tikkling_id)
      .then(async res => {
        return topActions.setStateAndError(res);
      })
      .then(async res => {
        tikkle_data = res.DSdata.info;
        setList_data(res.DSdata.info);
      })
      .then(async res => {
        // console.log('#### : ', tikkle_data);
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
    getTikkleData(route_data.tikkling_id);
  }, [route_data.tikkling_id]);

  return (
    <View style={{paddingTop: 0, backgroundColor: backgroundColor}}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <AnimatedButton
            onPress={() => navigation.goBack()}
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
                  {route_data.created_at.split('-')[0]}{' '}
                  {/* {route_data.tikkling_type}{' '} */}
                  티클링
                </M20>
                {route_data.state_id === 1 ? (
                  <M15 customStyle={{color: COLOR_PRIMARY, marginBottom: 10}}>
                    진행중
                  </M15>
                ) : route_data.state_id === 2 ? (
                  <M15 customStyle={{color: COLOR_ERROR, marginBottom: 10}}>
                    취소
                  </M15>
                ) : route_data.state_id === 3 ? (
                  <M15 customStyle={{color: COLOR_ERROR, marginBottom: 10}}>
                    미달성 종료
                  </M15>
                ) : route_data.state_id === 4 ? (
                  <M15 customStyle={{color: COLOR_PRIMARY, marginBottom: 10}}>
                    펀딩 달성
                  </M15>
                ) : route_data.state_id === 5 ? (
                  <M15 customStyle={{color: COLOR_GRAY, marginBottom: 10}}>
                    기간 만료
                  </M15>
                ) : null}
              </View>

              {/* title */}
              {/* 옮기기 */}

              <View style={styles.mainContainer}>
                {/*2*/}
                <View
                  style={{
                    width: windowWidth - 64,
                    height: ((windowWidth - 64) / 3) * 2,
                    borderRadius: 16,
                    borderColor: COLOR_SEPARATOR,
                    borderWidth: 1,
                    alignSelf: 'center',
                    marginBottom: 8,
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 0,
                      zIndex: -1,
                    }}>
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: route_data.thumbnail_image,
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 16,
                      }}
                    />
                  </View>
                  <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 0.75}}
                    colors={[
                      'rgba(255,255,255,0)',
                      'rgba(255,255,255,.3)',
                      'rgba(255,255,255,1)',
                    ]}
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      top: 0,
                      zIndex: 0,
                      borderBottomRightRadius: 16,
                      borderBottomLeftRadius: 16,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-end',
                      position: 'absolute',
                      bottom: 12,
                      left: 16,
                      right: 16,
                    }}>
                    <B22 customStyle={{fontFamily: H}}>
                      {route_data.product_name.length > 30
                        ? route_data.product_name.substring(0, 30) + '...'
                        : route_data.product_name}
                    </B22>
                  </View>
                </View>

                {/* 2 */}

                <View
                  style={{
                    alignSelf: 'center',
                    width: windowWidth * 0.8,
                    marginTop: 16,
                    marginBottom: 24,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 8,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <FlagFilled
                        width={24}
                        height={24}
                        fill={COLOR_PRIMARY}
                        scale={1.3}
                      />
                      <B17
                        customStyle={{
                          fontFamily: EB,
                          color: COLOR_GRAY,
                          marginLeft: 8,
                        }}>
                        달성률
                      </B17>
                    </View>
                    <View
                      style={{
                        alignItems: 'flex-end',
                        marginBottom: 12,
                      }}>
                      <B17>
                        {Math.round(
                          (tikkle_sum / route_data.tikkle_quantity) * 1000,
                        ) / 1000}
                        %
                      </B17>
                    </View>
                  </View>
                  <BarComponent
                    totalPieces={route_data.tikkle_quantity}
                    gatheredPieces={tikkle_sum}
                  />
                </View>

                {/*3*/}

                <View style={{flexDirection: 'row', marginBottom: 20}}>
                  <View
                    style={{
                      alignItems: 'center',
                      borderColor: COLOR_SEPARATOR,
                      borderWidth: 1,
                      padding: 12,
                      paddingVertical: 16,
                      width: 0.4 * windowWidth,
                      borderRadius: 12,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 16,
                        backgroundColor: COLOR_SECONDARY,
                        borderRadius: 100,
                        marginBottom: 12,
                      }}>
                      <BubbleFilled fill={COLOR_PRIMARY} />
                    </View>
                    <B12 customStyle={styles.labelText}>남은 티클</B12>
                    <B17 customStyle={styles.dataText}>
                      {route_data.tikkle_quantity - tikkle_sum} 개
                    </B17>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      borderColor: 'transparent',
                      width: 10,
                    }}></View>

                  <View
                    style={{
                      alignItems: 'center',
                      borderColor: COLOR_SEPARATOR,
                      borderWidth: 1,
                      padding: 12,
                      paddingVertical: 16,
                      width: 0.4 * windowWidth,
                      borderRadius: 12,
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 16,
                        backgroundColor: COLOR_SECONDARY,
                        borderRadius: 100,
                        marginBottom: 12,
                      }}>
                      <CalendarFilled fill={COLOR_PRIMARY} />
                    </View>
                    <B12 customStyle={styles.labelText}>남은 시간</B12>
                    <View>
                      {route_data.state_id == 1 ? (
                        <TimerComponent
                          timerStyle={{
                            color: COLOR_BLACK,
                            fontSize: 17,
                            fontFamily: B,
                          }}
                          deadline={route_data.funding_limit}
                        />
                      ) : (
                        <B15>종료</B15>
                      )}
                    </View>
                  </View>
                </View>
                {/* 옮기기 */}
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
                  }}>
                  <B15 customStyle={{marginBottom: 10}}>티클링 기간</B15>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'left',
                      alignItems: 'center',
                      marginLeft: 8,
                    }}>
                    <M15 customStyle={{color: COLOR_GRAY, marginBottom: 10}}>
                      {route_data.created_at.split('T')[0]}
                    </M15>
                    <B15 customStyle={{color: COLOR_GRAY, marginBottom: 10}}>
                      {'  ~  '}
                    </B15>
                    <M15 customStyle={{color: COLOR_GRAY, marginBottom: 10}}>
                      {route_data.funding_limit.split('T')[0]}
                    </M15>
                  </View>
                </View>

                {route_data.state_id === 3 || route_data.state_id === 4 ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'left',
                    }}>
                    <B15 customStyle={{marginBottom: 10}}>티클링 종료일</B15>

                    <M15
                      customStyle={{
                        color: COLOR_GRAY,
                        marginBottom: 10,
                        marginLeft: 8,
                      }}>
                      {route_data.terminated_at.split('T')[0]}
                    </M15>
                  </View>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <B15 customStyle={{marginBottom: 10}}>받은 티클 수</B15>

                  <M15
                    customStyle={{
                      color: COLOR_GRAY,
                      marginBottom: 0,
                      marginLeft: 8,
                    }}>
                    {tikkle_sum} 개
                  </M15>
                </View>

                {route_data.state_id === 3 || route_data.state_id === 4 ? (
                  <View>
                    {route_data.resolution_type === 'refund' ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'left',
                        }}>
                        <B15 customStyle={{marginBottom: 10}}>
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
                    ) : route_data.resolution_type === 'goods' ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'left',
                        }}>
                        <B15 customStyle={{marginBottom: 10}}>
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

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <B15 customStyle={{marginBottom: 10}}>상품 브랜드</B15>

                  <M15
                    customStyle={{
                      color: COLOR_GRAY,
                      marginBottom: 0,
                      marginLeft: 8,
                    }}>
                    {route_data.brand_name}
                  </M15>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <B15 customStyle={{marginBottom: 10}}>상품 가격</B15>

                  <M15
                    customStyle={{
                      color: COLOR_GRAY,
                      marginBottom: 0,
                      marginLeft: 8,
                    }}>
                    {route_data.price.toLocaleString()}₩
                  </M15>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <B15 customStyle={{marginBottom: 10}}>상품 총 티클 개수</B15>

                  <M15
                    customStyle={{
                      color: COLOR_GRAY,
                      marginBottom: 0,
                      marginLeft: 8,
                    }}>
                    {route_data.price / 5000}개
                  </M15>
                </View>
              </View>
            </View>
          </View>
        }
        ListFooterComponent={
          <View>
            <View style={{height: 20}}></View>
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

                    <M15 customStyle={{color: COLOR_BLACK, width: 270}}>
                      [
                      {route_data.product_name.length > 30
                        ? route_data.product_name.substring(0, 30) + '...'
                        : route_data.product_name}
                      ]의 조각 {item.quantity}개
                    </M15>
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
                </View>

                {item.message ? (
                  <View style={{margin: 10}}>
                    <B15 customStyle={{color: COLOR_BLACK}}>{'[메세지]'}</B15>
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
    borderBottomColor: COLOR_SEPARATOR,
    borderBottomWidth: 1,
  },
  small_header: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: 24,
    marginLeft: 16,
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
    detailsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 12,
    },
    labelText: {
      fontFamily: EB,
      color: COLOR_GRAY,
    },
    dataText: {
      color: COLOR_BLACK,
    },
    mainContainer: {
      width: '100%',
      justifyContent: 'center',
      backgroundBottomColor: COLOR_WHITE,
    },
  },
});
