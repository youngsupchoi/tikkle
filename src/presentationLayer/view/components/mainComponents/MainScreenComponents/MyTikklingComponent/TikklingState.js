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
      {console.log('state', state_id)}
      <Tooltip
        topAdjustment={Platform.OS === 'android' ? -StatusBarHeight : 0}
        isVisible={tooltip_1}
        content={
          <View style={{padding: 12, paddingVertical: 4}}>
            <View style={{}}>
              <B15 customStyle={{color: COLOR_PRIMARY}}>{'티클링 티켓'}</B15>
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
                <M11>{'티클링 티켓은 티클링을 시작하는데 사용해요.'}</M11>
              </View>

              <View>
                <M11>{'티켓을 얻으려면 친구에게 티클을 선물해보세요!'}</M11>
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
            <B15 customStyle={styles.buttonText_selec}>{'준비'}</B15>
          </AnimatedButton>
        ) : (
          <AnimatedButton
            onPress={() => {
              setTooltip_1(true);
            }}
            style={{...styles.buttonStyle}}>
            <B15 customStyle={styles.buttonText}>{'준비'}</B15>
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
              <B15 customStyle={{color: COLOR_PRIMARY}}>{'티클링 티켓'}</B15>
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
                <M11>{'티클링 티켓은 티클링을 시작하는데 사용해요.'}</M11>
              </View>

              <View>
                <M11>{'티켓을 얻으려면 친구에게 티클을 선물해보세요!'}</M11>
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
              <B15 customStyle={{color: COLOR_PRIMARY}}>{'티클링 티켓'}</B15>
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
                <M11>{'티클링 티켓은 티클링을 시작하는데 사용해요.'}</M11>
              </View>

              <View>
                <M11>{'티켓을 얻으려면 친구에게 티클을 선물해보세요!'}</M11>
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
              <B15 customStyle={{color: COLOR_PRIMARY}}>{'티클링 티켓'}</B15>
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
                <M11>{'티클링 티켓은 티클링을 시작하는데 사용해요.'}</M11>
              </View>

              <View>
                <M11>{'티켓을 얻으려면 친구에게 티클을 선물해보세요!'}</M11>
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
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: COLOR_GRAY,
    borderWidth: 1,
  },
  buttonStyle_selec: {
    padding: 12,
    paddingVertical: 8,
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
