import React from 'react';
import {Image, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import Svg, {Polygon, Path, Rect, Ellipse} from 'react-native-svg';
import Candle1 from 'src/assets/images/Candle1';
import Candle2 from 'src/assets/images/Candle2';
import Candle3 from 'src/assets/images/Candle3';
import Candle4 from 'src/assets/images/Candle4';
import {COLOR_WHITE} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  B15,
  CHRISTMAS_TITLE,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';

const CakeWithCandles = ({list_data, itemImage, width, height}) => {
  const candleCount = list_data.length;
  const svgWidth = width;
  const svgHeight = svgWidth;
  const ellipseCenterX = svgWidth / 2;
  const ellipseCenterY = svgHeight * 0.5; // 케이크의 2층 타원의 Y 위치
  const ellipseRadiusX = svgWidth * 0.5; // 케이크의 2층 타원의 X 반경
  const ellipseRadiusY = svgHeight * 0.12; // 케이크의 2층 타원의 Y 반경

  const candles = list_data
    .filter(item => item.NAME !== 'TIKKLE')
    .map((item, i) => {
      const angle = ((2 * Math.PI) / candleCount) * i + (360 / 20) * 7;
      const xPosition =
        ellipseCenterX +
        (ellipseRadiusX * Math.cos(angle) - (svgHeight * 0.4 * 40) / 280) * 0.6;
      const yPosition =
        (ellipseCenterY * 12) / 10 + ellipseRadiusY * Math.sin(angle) * 0.6;

      return (
        <View
          key={i}
          style={{
            position: 'absolute',
            left: xPosition,
            bottom: yPosition,
            alignSelf: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              top: -svgWidth * 0.1,
              zIndex: 2,
              width: 100,
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                alignSelf: 'center',
                alignItems: 'center',
                backgroundColor: COLOR_WHITE,
                padding: 4,
                paddingHorizontal: 12,
                borderRadius: 16,
              }}>
              <B15
                customStyle={{
                  fontFamily: CHRISTMAS_TITLE,
                }}>
                {item.NAME}
              </B15>
            </View>
          </View>
          {console.log(item.quantity)}
          {item.quantity == 1 ? <Candle1 height={svgHeight * 0.4} /> : null}
          {item.quantity == 2 ? <Candle2 height={svgHeight * 0.4} /> : null}
          {item.quantity == 3 ? <Candle3 height={svgHeight * 0.4} /> : null}
          {item.quantity == 4 ? <Candle4 height={svgHeight * 0.4} /> : null}
          {item.quantity >= 5 ? <Candle4 height={svgHeight * 0.4} /> : null}
        </View>
      );
    });

  return (
    <View style={{zIndex: -9, width: svgWidth, height: svgHeight}}>
      <Svg
        height={svgHeight}
        width={svgWidth}
        viewBox={`0 0 200 200`}
        fill="none">
        {/* 테이블 바닥 */}
        {/* <Polygon
          points="-10,100 -10,200 210,200 210,100"
          fill="#EACBB5"
          stroke="black"
        /> */}
        {/* 케이크의 접시 */}
        {/* <Ellipse
          cx="100"
          cy="146"
          rx="100"
          ry="32"
          fill="#eeeeee"
          stroke={'black'}
        />
        <Ellipse
          cx="100"
          cy="140"
          rx="100"
          ry="34"
          fill="white"
          stroke={'black'}
        /> */}
        {/* 케이크의 바닥 타원 */}
        <Ellipse cx="100" cy="140" rx="78" ry="24" fill="#4A301E" />
        {/* 케이크의 1층 사각형 */}
        <Polygon
          points="21,120 22,140 178,140 179,120"
          fill="#4A301E"
          stroke="#4A301E"
        />
        {/* 케이크의 1층 타원 */}
        <Ellipse
          cx="100"
          cy="120"
          rx="80"
          ry="24"
          stroke="white"
          strokeWidth="2"
        />
        {/* 케이크의 2층 사각형 */}
        <Polygon
          points="20,100 21,120 179,120 180,100"
          fill="#4A301E"
          stroke="#4A301E"
        />
        {/* 케이크의 2층 타원 */}
        <Ellipse
          cx="100"
          cy="100"
          rx="81"
          ry="24"
          //   fill="#7D5135"
          stroke="white"
          strokeWidth="2"
        />
        {/* 케이크의 3층 사각형 */}
        <Polygon
          points="19,80 20,100 180,100 181,80"
          fill="#4A301E"
          stroke="#4A301E"
        />
        {/* 케이크의 3층 타원 */}
        <Ellipse
          cx="100"
          cy="80"
          rx="81"
          ry="24"
          fill="#7D5135"
          stroke="#7D5135"
          strokeWidth="2"
        />
        {/* 케이크 3층 위의 초콜릿 장식 */}
        <Polygon
          points="90,80 92,87 110,80 107,73"
          fill="#4A301E"
          stroke="#906140"
        />
        {/* 초들 */}
      </Svg>
      <View
        style={{
          position: 'absolute',
          width: svgWidth,
          height: svgHeight,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}>
        {candles}
      </View>
    </View>
  );
};

export default CakeWithCandles;
