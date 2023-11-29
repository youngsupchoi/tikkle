import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  B15,
  EB,
  B12,
  M11,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_GRAY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_OUTLINE,
  COLOR_SECONDARY,
  COLOR_SECOND_BLACK,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {SPACING_2} from 'src/presentationLayer/view/components/globalComponents/Spacing/BaseSpacing';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import AnimatedButton from 'src/presentationLayer/view/components/globalComponents/Buttons/AnimatedButton';
import {useMainViewModel} from 'src/presentationLayer/viewModel/mainViewModels/MainViewModel';
import Refund from 'src/assets/icons/Refund';
import Clipboard from 'src/assets/icons/Clipboard';
import Share from 'src/assets/icons/Share';
import ArrowRight from 'src/assets/icons/ArrowRight';
import Tooltip from 'react-native-walkthrough-tooltip';

export default function TikklingState({state_id}) {
  const [tooltip_1, setTooltip_1] = React.useState(false);
  const [tooltip_2, setTooltip_2] = React.useState(false);
  const [tooltip_3, setTooltip_3] = React.useState(false);
  const [tooltip_4, setTooltip_4] = React.useState(false);

  return (
    <View
      style={{
        marginTop: 0,
        padding: 0,
        borderRadius: 24,
        borderEndEndRadius: 0,
        borderEndStartRadius: 0,
        // backgroundColor: COLOR_GRAY,
        borderBottomColor: COLOR_SEPARATOR,
        // borderBottomWidth: 1,
        paddingVertical: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      {/* {console.log('state', state_id)} */}
      <Tooltip
        topAdjustment={Platform.OS === 'android' ? -StatusBarHeight : 0}
        isVisible={tooltip_1}
        content={
          <View style={{padding: 12, paddingVertical: 4}}>
            <View style={{}}>
              <B15 customStyle={{color: COLOR_PRIMARY}}>{'티클링 시작'}</B15>
              {/* <AnimatedButton
                onPress={() => {
                  Linking.openURL('https://www.lifoli.co.kr');
                }}>
                <B12 customStyle={{marginRight: 10, color: COLOR_GRAY}}>
                  {'더보기'}
                </B12>
              </AnimatedButton> */}
            </View>
            <View style={{}}>
              <View>
                <M11>
                  {'티클링은 티클을 선물받기 위해 진행하는 펀딩 이벤트에요.'}
                </M11>
              </View>

              <View>
                <M11>
                  {'티클링은 최대 7일 동안 진행되며 종료일을 설정할 수 있어요.'}
                </M11>
              </View>

              <View>
                <M11>
                  {
                    '상품은 5000원의 가치를 지니는 티클로 쪼개지며 친구들은 이 티클을 여러개 선물할 수 있어요.'
                  }
                </M11>
              </View>

              <View>
                <M11>
                  {'티클링을 시작하기 위해서는 티클링 티켓이 한장 소모해요.'}
                </M11>
              </View>
            </View>
          </View>
        }
        placement="bottom"
        animated={true}
        backgroundColor="rgba(0,0,0,0.1)"
        // backgroundColor="transparent"
        disableShadow={true}
        onClose={() => {
          setTooltip_1(false);
        }}>
        {state_id == 0 ? (
          <AnimatedButton
            onPress={() => {
              setTooltip_1(true);
            }}
            style={{...styles.buttonStyle_selec}}>
            <B15 customStyle={styles.buttonText_selec}>{'시작'}</B15>
          </AnimatedButton>
        ) : (
          <AnimatedButton
            onPress={() => {
              setTooltip_1(true);
            }}
            style={{...styles.buttonStyle}}>
            <B15 customStyle={styles.buttonText}>{'시작'}</B15>
          </AnimatedButton>
        )}
      </Tooltip>

      <View style={styles.pointer}>
        <ArrowRight
          stroke={COLOR_GRAY}
          width={20}
          height={15}
          strokeWidth={1.5}
          scale={0.85}
        />
      </View>

      <Tooltip
        topAdjustment={Platform.OS === 'android' ? -StatusBarHeight : 0}
        isVisible={tooltip_2}
        content={
          <View style={{padding: 12, paddingVertical: 4}}>
            <View style={{}}>
              <B15 customStyle={{color: COLOR_PRIMARY}}>{'티클링의 진행'}</B15>
              {/* <AnimatedButton
                onPress={() => {
                  Linking.openURL('https://www.lifoli.co.kr');
                }}>
                <B12 customStyle={{marginRight: 10, color: COLOR_GRAY}}>
                  {'더보기'}
                </B12>
              </AnimatedButton> */}
            </View>
            <View style={{}}>
              <View>
                <M11>
                  {'티클링 진행중에는 친구들이 티클을 선물해줄 수 있어요.'}
                </M11>
              </View>

              <View>
                <M11>
                  {
                    '티클링을 인스타그램 스토리, 링크로 친구들에게 공유해 보세요.'
                  }
                </M11>
              </View>

              <View>
                <M11>{'\n티클링 진행 도중 티클링을 중단할 수 있어요.'}</M11>
              </View>

              <View>
                <M11>
                  {
                    '티클을 하나도 받지 않은 상태에서 티클링 중단시, 티클링 티켓을 돌려받아요.'
                  }
                </M11>
              </View>

              <View>
                <M11>
                  {
                    '티클이 하나 이상 모인 상태에서 티클링을 중료하면, 남은 티클을 구매해서 상품으로 교환하거나 모은 티클을 환급 받을 수 있어요.'
                  }
                </M11>
              </View>
            </View>
          </View>
        }
        placement="bottom"
        animated={true}
        backgroundColor="rgba(0,0,0,0.1)"
        // backgroundColor="transparent"
        disableShadow={true}
        onClose={() => {
          setTooltip_2(false);
        }}>
        {state_id == 1 ? (
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <AnimatedButton
              onPress={() => {
                setTooltip_2(true);
              }}
              style={{...styles.buttonStyle_selec, top: 5}}>
              <B15 customStyle={styles.buttonText_selec}>{'진행중'}</B15>
            </AnimatedButton>
            <View style={styles.arrow} />
          </View>
        ) : (
          <AnimatedButton
            onPress={() => {
              setTooltip_2(true);
            }}
            style={{...styles.buttonStyle}}>
            <B15 customStyle={styles.buttonText}>{'진행중'}</B15>
          </AnimatedButton>
        )}
      </Tooltip>

      <View style={styles.pointer}>
        <ArrowRight
          stroke={COLOR_GRAY}
          width={20}
          height={15}
          strokeWidth={1.5}
          scale={0.85}
        />
      </View>

      <Tooltip
        topAdjustment={Platform.OS === 'android' ? -StatusBarHeight : 0}
        isVisible={tooltip_3}
        content={
          <View style={{padding: 12, paddingVertical: 4}}>
            <View style={{}}>
              <B15 customStyle={{color: COLOR_PRIMARY}}>{'티클링 종료'}</B15>
              {/* <AnimatedButton
                onPress={() => {
                  Linking.openURL('https://www.lifoli.co.kr');
                }}>
                <B12 customStyle={{marginRight: 10, color: COLOR_GRAY}}>
                  {'더보기'}
                </B12>
              </AnimatedButton> */}
            </View>
            <View style={{}}>
              <View>
                <M11>
                  {
                    '티클링이 종료되면 티클을 상품으로 교환하거나 환급받지 선택해요.'
                  }
                </M11>
              </View>

              <View>
                <M11>
                  {
                    '티클이 완성되지 못한 경우 남은 티클을 구매하고 상품으로 교환 받거나, 모은 티클만 환급 받을 수 있어요.'
                  }
                </M11>
              </View>
            </View>
          </View>
        }
        placement="bottom"
        animated={true}
        backgroundColor="rgba(0,0,0,0.1)"
        // backgroundColor="transparent"
        disableShadow={true}
        onClose={() => {
          setTooltip_3(false);
        }}>
        {state_id == 2 || state_id == 3 || state_id == 4 || state_id == 5 ? (
          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <AnimatedButton
              onPress={() => {
                setTooltip_3(true);
              }}
              style={{...styles.buttonStyle_selec, top: 5}}>
              <B15 customStyle={styles.buttonText_selec}>{'종료'}</B15>
            </AnimatedButton>
            <View style={styles.arrow} />
          </View>
        ) : (
          <AnimatedButton
            onPress={() => {
              setTooltip_3(true);
            }}
            style={{...styles.buttonStyle}}>
            <B15 customStyle={styles.buttonText}>{'종료'}</B15>
          </AnimatedButton>
        )}
      </Tooltip>

      <View style={styles.pointer}>
        <ArrowRight
          stroke={COLOR_GRAY}
          width={20}
          height={15}
          strokeWidth={1.5}
          scale={0.85}
        />
      </View>

      <Tooltip
        topAdjustment={Platform.OS === 'android' ? -StatusBarHeight : 0}
        isVisible={tooltip_4}
        content={
          <View style={{padding: 12, paddingVertical: 4}}>
            <View style={{}}>
              <B15 customStyle={{color: COLOR_PRIMARY}}>{'티클 교환/환급'}</B15>
              {/* <AnimatedButton
                onPress={() => {
                  Linking.openURL('https://www.lifoli.co.kr');
                }}>
                <B12 customStyle={{marginRight: 10, color: COLOR_GRAY}}>
                  {'더보기'}
                </B12>
              </AnimatedButton> */}
            </View>
            <View style={{}}>
              <View>
                <M11>
                  {'티클링을 종료하면 상품의 배송, 티클의 환급이 진행돼요.'}
                </M11>
              </View>

              <View>
                <M11>
                  {
                    '상품의 배송은 티클에서 상품 배송을 요청하는 기간 + 판매자 측의 배송기간이 소요돼요.'
                  }
                </M11>
              </View>

              <View>
                <M11>
                  {
                    '상품의 배송 과정은 운송장 번호 발급 후 프로필 페이지의 티클링 내역에서 확인 가능해요!'
                  }
                </M11>
              </View>

              <View>
                <M11>
                  {
                    '티클의 환급시 환급 수수료 10%가 부과되며, 티클의 부분 환급은 불가능해요.'
                  }
                </M11>
              </View>

              <View>
                <M11>{'티클의 환급은 신청순으로 3영업일 정도 소요돼요.'}</M11>
              </View>
            </View>
          </View>
        }
        placement="bottom"
        animated={true}
        backgroundColor="rgba(0,0,0,0.1)"
        // backgroundColor="transparent"
        disableShadow={true}
        onClose={() => {
          setTooltip_4(false);
        }}>
        <AnimatedButton
          onPress={() => {
            setTooltip_4(true);
          }}
          style={{...styles.buttonStyle}}>
          <B15 customStyle={styles.buttonText}>{'교환/환급'}</B15>
        </AnimatedButton>
      </Tooltip>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: COLOR_WHITE,
    marginHorizontal: SPACING_2,
    borderRadius: 16,
    marginBottom: 24,
    marginTop: 4,
  },
  innerContainer: {
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
    backgroundColor: COLOR_WHITE,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  innerRowDirection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR_SEPARATOR,
  },
  innerViewStyle: {
    padding: 0,
    width: windowWidth - 96 - 80,
  },
  productNameContainer: {
    flexDirection: 'row',
    marginLeft: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productDetails: {
    width: windowWidth - 96 - 80 - 12 + 20,
  },
  mainContainer: {
    width: '100%',
    justifyContent: 'center',
    backgroundBottomColor: COLOR_WHITE,
  },
  centeredContainer: {
    alignItems: 'center',
  },
  congratulationsText: {
    fontFamily: EB,
    marginBottom: 12,
  },
  infoText: {
    color: COLOR_SECOND_BLACK,
  },
  lottieStyle: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  leftDetailsContainer: {
    alignItems: 'flex-start',
  },
  labelText: {
    fontFamily: EB,
    color: COLOR_GRAY,
  },
  dataText: {
    color: COLOR_BLACK,
  },
  buttonStyle: {
    padding: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: COLOR_SEPARATOR,
    borderWidth: 1,
  },
  buttonStyle_selec: {
    padding: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: COLOR_PRIMARY,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: COLOR_PRIMARY,
    borderWidth: 1,
  },
  buttonText: {
    color: COLOR_GRAY,
    fontFamily: EB,
  },
  buttonText_selec: {
    color: COLOR_WHITE,
    fontFamily: EB,
  },
  arrow: {
    width: 0,
    height: 0,
    top: 5,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: COLOR_PRIMARY,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    marginTop: -1, // Adjust as needed to align with the bubble
    // Adjust 'left' or 'right' here if needed
  },
  pointer: {flexDirection: 'column', alignItems: 'center', padding: 3},
});
