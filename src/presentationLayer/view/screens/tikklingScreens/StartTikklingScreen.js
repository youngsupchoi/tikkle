import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  TextInput,
} from 'react-native';
// import Image1 from 'src/assets/icons/undraw_watch_application_uhc9.svg';
import Postcode from '@actbase/react-daum-postcode';
import Modal from 'react-native-modal';
import React, {useEffect, useRef, useState} from 'react';
import {
  SPACING_2,
  SPACING_3,
  SPACING_6,
} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {
  B15,
  B20,
  EB,
  B,
  M11,
  M15,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
  backgroundColor,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import DatePicker from 'react-native-date-picker';
import BackHeader from 'src/presentationLayer/view/components/globalComponents/Headers/BackHeader';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import Refresh from 'src/assets/icons/Refresh';
import Information from 'src/assets/icons/Information';
import Birthday from 'src/assets/icons/undraw_birthday_cake_re_bsw5.svg';
import Cat from 'src/assets/icons/undraw_cat_epte.svg';
import SearchNormal1 from 'src/assets/icons/SearchNormal1';
import Location from 'src/assets/icons/Location';
import DetailAddressInput from 'src/presentationLayer/view/components/tikklingComponents/StartTikklingScreenComponents/DetailAddressInput';
import {useStartTikklingViewModel} from 'src/presentationLayer/viewModel/tikklingViewModels/StartTikklingViewModel';
import PostCodeModal from 'src/presentationLayer/view/components/mainComponents/MainScreenComponents/PostCodeModal/PostCodeModal';
import Footer from 'src/presentationLayer/view/components/globalComponents/Headers/FooterComponent';

export default function StartTikklingScreen({route}) {
  const {state, actions} = useStartTikklingViewModel();
  useEffect(() => {
    actions.loadData();
  }, []);

  useEffect(() => {
    actions.setIsButtonEnabled(
      (state.userData.zonecode !== null || state.zonecode !== null) &&
        (state.userData.address !== null || state.address !== null) &&
        (state.userData.detail_address !== null || state.detailAddress) &&
        state.eventType !== null,
    );
  }, [state.zonecode, state.address, state.detailAddress, state.event]);

  useEffect(() => {
    console.log('🚨');
    console.log(route);
  }, []);

  useEffect(() => {
    state.userData.birthday !== undefined
      ? actions.setEndDate(
          actions.getNextBirthday(
            actions.setToEndOfDay(state.userData.birthday),
          ),
        )
      : null;
    actions.setAddress(state.userData.address);
    actions.setZonecode(state.userData.zonecode);
    actions.setDetailAddress(
      state.userData.detailAddress !== undefined
        ? state.userData.detailAddress
        : null,
    );
  }, [state.userData]);

  useEffect(() => {
    actions.setCreateTikklingButtonPressed(false);
  }, []);
  return (
    <View style={{}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        style={styles.container}>
        <BackHeader
          style={{backgroundColor: COLOR_WHITE}}
          tikkling_ticket={state.userData.tikkling_ticket}>
          {/* Let's TIKKLE! */}
        </BackHeader>
        <View
          style={{
            backgroundColor: COLOR_WHITE,
            paddingVertical: 16,
            marginBottom: 12,
          }}>
          <View
            style={{
              paddingHorizontal: 24,
              paddingTop: 12,
              paddingBottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <B20 customStyle={{marginRight: 8, fontFamily: EB}}>상품 정보</B20>
            <AnimatedButton>
              <Information
                width={20}
                height={20}
                stroke={COLOR_BLACK}
                strokeWidth={2}
                scale={0.85}
              />
            </AnimatedButton>
            <View
              style={{
                backgroundColor: COLOR_SECONDARY,
                padding: 6,
                paddingHorizontal: 12,
                marginLeft: 12,
                borderRadius: 8,
              }}>
              <M11 customStyle={{color: COLOR_PRIMARY, fontSize: 10}}>
                해당 상품이 5,000원의 티클로 바뀌어요.
              </M11>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 16,
              backgroundColor: COLOR_WHITE,
              padding: 12,
              marginHorizontal: 16,
              borderRadius: 12,
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 12,
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 1,
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: state.selectedItem.thumbnail_image}}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                    borderColor: COLOR_SEPARATOR,
                    borderWidth: 1,
                  }}
                />
                <View style={{alignItems: 'center', marginTop: 8}}>
                  <B15>
                    {state.selectedItem.name.length > 9
                      ? `${state.selectedItem.name.slice(0, 9)}...`
                      : state.selectedItem.name}
                  </B15>
                  <M11 customStyle={{color: COLOR_GRAY}}>
                    {state.selectedItem.brand_name}
                  </M11>
                  <M11 customStyle={{color: COLOR_GRAY, marginTop: 8}}>
                    ￦ {Number(state.selectedItem.price).toLocaleString()}
                  </M11>
                </View>
              </View>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 12,
                  alignItems: 'center',
                }}>
                <Refresh
                  width={24}
                  height={24}
                  stroke={COLOR_BLACK}
                  strokeWidth={2}
                  scale={1.3}
                />
              </View>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 12,
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 12,
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 1,
                  alignItems: 'center',
                }}>
                <Image
                  source={require('src/assets/images/TIKKLE_LOGO.png')}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                    borderColor: COLOR_SEPARATOR,
                    borderWidth: 1,
                  }}
                />
                <View style={{alignItems: 'center', marginTop: 8}}>
                  <B15>티클</B15>
                  <M11 customStyle={{color: COLOR_GRAY}}>TIKKLE</M11>
                  <M11 customStyle={{color: COLOR_GRAY, marginTop: 8}}>
                    {(state.selectedItem.price / 5000).toLocaleString()} 개
                  </M11>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: COLOR_WHITE,
            paddingVertical: 16,
            marginBottom: 12,
          }}>
          <View
            style={{
              padding: 24,
              paddingTop: 12,
              paddingBottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <B20 customStyle={{marginRight: 8, fontFamily: EB}}>
              기념일 선택
            </B20>
            <AnimatedButton>
              <Information
                width={20}
                height={20}
                stroke={COLOR_BLACK}
                strokeWidth={2}
                scale={0.85}
              />
            </AnimatedButton>
            <View
              style={{
                backgroundColor: COLOR_SECONDARY,
                padding: 6,
                paddingHorizontal: 12,
                marginLeft: 12,
                borderRadius: 8,
                borderColor: COLOR_SEPARATOR,
                borderWidth: 1,
              }}>
              <M11 customStyle={{color: COLOR_PRIMARY, fontSize: 10}}>
                다가오는 기념일에 원하는 상품을 받을 수 있어요.
              </M11>
            </View>
          </View>

          <View
            style={{
              marginTop: 24,
              paddingLeft: 16,
              flexDirection: 'row',
              overflow: 'hidden',
            }}>
            {state.events.map(item => (
              <AnimatedButton
                onPress={() => {
                  actions.setEventType(item.type);
                  if (item.type === 'none') {
                    actions.setOpen(true);
                  } else if (item.type === 'birthday') {
                    actions.setEndDate(
                      actions.setToEndOfDay(state.userData.birthday),
                    );
                  }
                  actions.setEvent(item);
                }}
                key={item.label}
                style={{
                  backgroundColor:
                    item.type === state.eventType
                      ? COLOR_SECONDARY
                      : COLOR_WHITE,
                  padding: 12,
                  paddingTop: 40,
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 1,
                  borderRadius: 20,
                  marginLeft: 0,
                  marginBottom: 8,
                  marginRight: 8,
                  width: '40%',
                  alignItems: 'center',
                }}>
                <View>
                  {item.type === 'birthday' ? (
                    <Birthday width={80} height={80} />
                  ) : null}
                  {item.type === 'none' ? <Cat width={80} height={80} /> : null}
                </View>
                <B20
                  customStyle={{
                    color:
                      item.type === state.eventType
                        ? COLOR_PRIMARY
                        : COLOR_BLACK,
                    marginBottom: 12,
                  }}>
                  {item.label}
                </B20>
                {console.log(state.endDate)}
                {item.type === 'birthday' ? (
                  <View
                    style={{
                      position: 'absolute',
                      right: 16,
                      top: 12,
                      borderRadius: 20,
                      padding: 4,
                      paddingHorizontal: 10,
                      borderColor: COLOR_SEPARATOR,
                      borderWidth: 2,
                    }}>
                    <B15
                      customStyle={{
                        alignSelf: 'flex-end',
                        color:
                          item.type === state.eventType
                            ? COLOR_PRIMARY
                            : COLOR_BLACK,
                      }}>
                      D-
                      {actions.calculateDaysUntilNextBirthday(
                        state.userData.birthday,
                      )}
                    </B15>
                  </View>
                ) : (
                  <View
                    style={{
                      position: 'absolute',
                      right: 16,
                      top: 12,
                      borderRadius: 20,
                      padding: 4,
                      paddingHorizontal: 10,
                      borderColor: COLOR_SEPARATOR,
                      borderWidth: 2,
                    }}>
                    <B15
                      customStyle={{
                        alignSelf: 'flex-end',
                        color:
                          item.type === state.eventType
                            ? COLOR_PRIMARY
                            : COLOR_BLACK,
                      }}>
                      D-
                      {state.date
                        ? actions.calculateDaysUntilNextBirthday(state.date)
                        : null}
                    </B15>
                  </View>
                )}
                {item.type === 'birthday' ? (
                  <View>
                    <M15
                      customStyle={{
                        color:
                          item.type === state.eventType
                            ? COLOR_PRIMARY
                            : COLOR_BLACK,
                      }}>
                      {
                        actions.formatDate(
                          actions.setToEndOfDay(state.userData.birthday),
                        ).label
                      }
                    </M15>
                  </View>
                ) : (
                  <View>
                    <M15
                      customStyle={{
                        color:
                          item.type === state.eventType
                            ? COLOR_PRIMARY
                            : COLOR_BLACK,
                      }}>
                      {state.date ? actions.formatDate(state.date).label : null}
                    </M15>
                  </View>
                )}
              </AnimatedButton>
            ))}
          </View>
        </View>
        <DatePicker
          modal
          open={state.open}
          date={state.date}
          onConfirm={selectedDate => {
            // 로컬 시간대의 연, 월, 일을 가져옵니다.
            const localYear = selectedDate.getFullYear();
            const localMonth = selectedDate.getMonth();
            const localDate = selectedDate.getDate();

            // 로컬 시간대의 23:59:59.999를 설정합니다.
            const endDate = new Date(
              localYear,
              localMonth,
              localDate,
              23,
              59,
              59,
              999,
            );

            endDate.setHours(endDate.getHours() + 9);

            actions.setOpen(false);
            actions.setDate(endDate);
            actions.setEndDate(endDate);
          }}
          onCancel={() => {
            actions.setOpen(false);
          }}
          mode="date"
          minimumDate={new Date(Date.now())} // 오늘의 날짜를 최소 날짜로 설정
          maximumDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
          title={'티클링은 최대 7일 간 진행할 수 있어요!'}
          confirmText="확인"
          cancelText="취소"
        />

        <View
          style={{
            backgroundColor: COLOR_WHITE,
            paddingVertical: 16,
            marginBottom: 12,
          }}>
          <View
            style={{
              padding: 24,
              paddingTop: 12,
              paddingBottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <B20 customStyle={{marginRight: 8, fontFamily: EB}}>
              배송지 입력
            </B20>
            <AnimatedButton>
              <Information
                width={20}
                height={20}
                stroke={COLOR_BLACK}
                strokeWidth={2}
                scale={0.85}
              />
            </AnimatedButton>
            <View
              style={{
                backgroundColor: COLOR_SECONDARY,
                padding: 6,
                paddingHorizontal: 12,
                marginLeft: 12,
                borderRadius: 8,
                borderColor: COLOR_SEPARATOR,
                borderWidth: 1,
              }}>
              <M11 customStyle={{color: COLOR_PRIMARY, fontSize: 10}}>
                상품을 받을 배송지를 입력해주세요.
              </M11>
            </View>
          </View>

          <View
            style={{
              marginTop: 12,
            }}>
            <AnimatedButton
              onPress={() => {
                actions.setShowPostCodeModal(true);
              }}
              style={{
                marginTop: 16,
                flexDirection: 'row',
                alignSelf: 'center',
                width: windowWidth - 32,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 12,
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 1,
                  padding: 8,
                  paddingHorizontal: 12,
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    padding: 4,
                    alignItems: 'center',
                  }}>
                  <SearchNormal1
                    width={24}
                    height={24}
                    stroke={COLOR_BLACK}
                    scale={1.2}
                    strokeWidth={1.5}
                  />
                </View>
                <B15 customStyle={{color: COLOR_GRAY, marginLeft: 12}}>
                  {state.zonecode !== null && state.address !== null
                    ? `${state.address}(${state.zonecode})`
                    : '도로명주소 검색'}
                </B15>
              </View>
            </AnimatedButton>
            <View
              style={{
                marginTop: 12,
                flexDirection: 'row',
                // marginHorizontal: 24,
                alignSelf: 'center',
                width: windowWidth - 32,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  backgroundColor: COLOR_WHITE,
                  borderRadius: 12,
                  borderColor: COLOR_SEPARATOR,
                  borderWidth: 1,
                  padding: 8,
                  paddingHorizontal: 12,
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    alignSelf: 'center',
                    padding: 4,
                    alignItems: 'center',
                  }}>
                  <Location
                    width={24}
                    height={24}
                    stroke={COLOR_BLACK}
                    scale={1}
                    strokeWidth={1.5}
                  />
                </View>
                <TextInput
                  placeholder={
                    state.userData.detail_address !== null
                      ? `${state.userData.detail_address}`
                      : '상세주소 입력'
                  }
                  style={{
                    fontFamily: B,
                    fontSize: 15,
                    marginLeft: 12,
                    width: '85%',
                    color: COLOR_GRAY,
                  }}
                  onChangeText={value => actions.setDetailAddress(value)}
                  value={state.detailAddress}
                />
              </View>
            </View>
          </View>
        </View>

        <AnimatedButton
          onPress={actions.tikklingStartButtonPress}
          style={[
            styles.tikklingStartButton,
            state.createTikklingButtonPressed ? styles.inactiveButton : {},
          ]}
          disabled={!state.isButtonEnabled || state.createTikklingButtonPressed} // 버튼이 활성화되어야 할 때만 onPress이 작동하도록 합니다.
        >
          <B15 customStyle={{color: backgroundColor}}>티클링 시작하기</B15>
        </AnimatedButton>
        <Footer />
      </ScrollView>

      <PostCodeModal state={state} actions={actions} />
      <DetailAddressInput state={state} actions={actions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: backgroundColor,
  },
  firstHero: {
    paddingHorizontal: SPACING_2,
    marginTop: SPACING_3,
  },
  wishlistImage: {
    width: 128,
    height: 128,
    borderRadius: 12,
    marginVertical: SPACING_2,
    marginLeft: SPACING_2,
  },
  priceToTikkleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  oneThirdCenterContainer: {
    width: '33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveButton: {
    backgroundColor: COLOR_GRAY, // Change to a color that indicates inactivity
    shadowOpacity: 0, // Remove shadow for inactive button
    borderColor: COLOR_GRAY,
  },
  tikklingStartButton: {
    backgroundColor: COLOR_PRIMARY,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth - 32,
    marginTop: 0,
    marginBottom: 15,
    alignSelf: 'center',
  },
});
