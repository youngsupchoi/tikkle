import React from 'react';
import {View, Image, Text, Dimensions} from 'react-native';
import {
  COLOR_PRIMARY,
  COLOR_SECONDARY,
  COLOR_SEPARATOR,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {
  windowHeight,
  windowWidth,
} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';
import {
  B,
  B15,
  B20,
  EB,
  H,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import moment from 'moment';
require('moment/locale/ko');

const CompleteTikklingBackground = ({list_data, itemImage}) => {
  // state_id가 1인 항목만 필터링
  //   const filteredData = list_data.filter(item => item.state_id === 1);
  const filteredData = list_data;
  //컨테이너 사이즈
  const containerSize =
    filteredData.length > 20 ? windowWidth - 100 : windowWidth - 32;

  // 원의 반지름과 중심점 계산
  const baseRadius = containerSize / 3; // 기본 원의 반지름
  const layerDistance = containerSize / 8.5; // 각 층마다 추가할 거리
  const centerCircleRadius = containerSize / 2.2;
  const centerX = containerSize / 2; // 원의 중심 X 좌표
  const centerY = containerSize / 2; // 원의 중심 Y 좌표

  // 각 층의 요소 수 계산
  const getItemsPerLayer = (totalItems, itemsPerCircle, layer) => {
    const maxItemsInLayer = itemsPerCircle * (layer + 1);
    return totalItems > maxItemsInLayer
      ? itemsPerCircle
      : totalItems - itemsPerCircle * layer;
  };

  // 각 객체의 위치 계산
  const getPositionAndSize = (index, layer, totalItems) => {
    const itemsPerCircle = 10; // 한 원에 배치할 최대 객체의 수
    const itemsInThisLayer = getItemsPerLayer(
      totalItems,
      itemsPerCircle,
      layer,
    );
    const angle = (2 * Math.PI) / itemsInThisLayer; // 각 객체 사이의 각도
    const layerRadius = baseRadius + layerDistance * layer; // 층별 원의 반지름 조정

    // 층에 따른 이미지 크기 조정
    const imageSize = (containerSize / 10) * (1 - 0.2 * layer); // 각 층마다 이미지 크기를 5씩 줄임

    const x = centerX + layerRadius * Math.cos(angle * index) - imageSize / 2; // 이미지 중심을 맞추기 위해 imageSize / 2 빼기
    const y = centerY + layerRadius * Math.sin(angle * index) - imageSize / 2; // 이미지 중심을 맞추기 위해 imageSize / 2 빼기

    return {
      position: 'absolute',
      left: x,
      top: y,
      width: imageSize,
      height: imageSize,
      borderRadius: imageSize / 2, // 원형 이미지를 유지하기 위해
    };
  };

  // 중앙 View의 스타일
  const centerViewStyle = {
    position: 'absolute',
    left: centerX - centerCircleRadius / 2, // 중앙 View의 너비의 절반을 빼줌
    top: centerY - centerCircleRadius / 2, // 중앙 View의 높이의 절반을 빼줌
    width: centerCircleRadius,
    height: centerCircleRadius,
    borderRadius: centerCircleRadius / 2, // 원형으로 만들기 위해
    justifyContent: 'center', // 내부 컨텐츠를 중앙에 배치
    alignItems: 'center', // 내부 컨텐츠를 중앙에 배치
    borderColor: COLOR_SECONDARY,
    borderWidth: 1,
  };
  // 중앙 View의 스타일
  const centerViewStyleBackgroundFirst = {
    position: 'absolute',
    left: centerX - (centerCircleRadius * 3) / 4, // 중앙 View의 너비의 절반을 빼줌
    top: centerY - (centerCircleRadius * 3) / 4, // 중앙 View의 높이의 절반을 빼줌
    width: (centerCircleRadius * 3) / 2,
    height: (centerCircleRadius * 3) / 2,
    borderColor: COLOR_SECONDARY,
    borderWidth: 1,
    borderRadius: centerCircleRadius, // 원형으로 만들기 위해
    justifyContent: 'center', // 내부 컨텐츠를 중앙에 배치
    alignItems: 'center', // 내부 컨텐츠를 중앙에 배치
    zIndex: -1,
  };
  // 중앙 View의 스타일
  const centerViewStyleBackgroundSecond = {
    position: 'absolute',
    left: centerX - centerCircleRadius, // 중앙 View의 너비의 절반을 빼줌
    top: centerY - centerCircleRadius, // 중앙 View의 높이의 절반을 빼줌
    width: centerCircleRadius * 2,
    height: centerCircleRadius * 2,
    borderColor: COLOR_SECONDARY,
    borderWidth: 1,
    borderRadius: centerCircleRadius, // 원형으로 만들기 위해
    justifyContent: 'center', // 내부 컨텐츠를 중앙에 배치
    alignItems: 'center', // 내부 컨텐츠를 중앙에 배치
    zIndex: -1,
  };
  // 중앙 View의 스타일
  const centerViewStyleBackgroundThird = {
    position: 'absolute',
    left: centerX - centerCircleRadius * 1.25, // 중앙 View의 너비의 절반을 빼줌
    top: centerY - centerCircleRadius * 1.25, // 중앙 View의 높이의 절반을 빼줌
    width: centerCircleRadius * 2.5,
    height: centerCircleRadius * 2.5,
    borderColor: COLOR_SECONDARY,
    borderWidth: 1,
    borderRadius: centerCircleRadius * 1.25, // 원형으로 만들기 위해
    justifyContent: 'center', // 내부 컨텐츠를 중앙에 배치
    alignItems: 'center', // 내부 컨텐츠를 중앙에 배치
    zIndex: -1,
  };

  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: windowWidth,
        height: windowHeight,
      }}>
      <Image
        source={require('src/assets/images/instagram_background_2.png')}
        resizeMode="contain"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />
      {/* <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundColor: 'white',
        }}
      /> */}

      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontFamily: EB, fontSize: 40}}>잊지 못할 오늘</Text>
        {console.log(moment().format('LLLL'))}
        <Text style={{fontFamily: B, fontSize: 16}}>
          {moment().format('YYYY년 MM월 DD일')}
        </Text>
      </View>
      <View
        style={{
          width: containerSize,
          height: containerSize,
        }}>
        {filteredData.map((item, index) => {
          const totalItems = filteredData.length;
          const layer = Math.floor(index / 10); // 층 계산
          const positionInCircle = index % 10; // 현재 층에서의 위치
          const style = getPositionAndSize(positionInCircle, layer, totalItems);

          return (
            <View key={index} style={style}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: style.width,
                  height: style.height,
                  borderRadius: style.borderRadius,
                }}
              />
              {/* <Text style={{marginTop: 8, textAlign: 'center'}}>{item.NAME}</Text> */}
            </View>
          );
        })}

        <View style={centerViewStyleBackgroundFirst} />
        {console.log(filteredData.length)}
        {filteredData.length > 10 ? (
          <View style={centerViewStyleBackgroundSecond} />
        ) : null}
        {filteredData.length > 20 ? (
          <View style={centerViewStyleBackgroundThird} />
        ) : null}
        <View style={centerViewStyle}>
          <Image
            source={{uri: itemImage}}
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
              borderRadius: centerCircleRadius / 2,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default CompleteTikklingBackground;
