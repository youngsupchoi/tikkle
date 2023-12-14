import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, SectionList} from 'react-native';
import {format, startOfWeek, addDays, isSameMonth, getMonth} from 'date-fns';
import {
  B12,
  B17,
  B20,
  EB,
} from 'src/presentationLayer/view/components/globalComponents/Typography/Typography';
import {
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_SEPARATOR,
  COLOR_WHITE,
} from 'src/presentationLayer/view/components/globalComponents/Colors/Colors';
import {windowWidth} from 'src/presentationLayer/view/components/globalComponents/Containers/MainContainer';

const WeekCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayedWeeks, setDisplayedWeeks] = useState(1); // 초기에 표시할 주의 수

  // 주 단위 날짜 데이터 생성
  const createWeeks = weeksCount => {
    let weeks = [];
    let startDay = startOfWeek(new Date());
    for (let i = 0; i < weeksCount * 7; i += 7) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        week.push(addDays(startDay, i + j));
      }
      weeks.push({title: `Week ${i / 7 + 1}`, data: week});
    }
    return weeks;
  };

  // 무한 스크롤을 위한 로딩 함수
  const loadMoreWeeks = () => {
    setDisplayedWeeks(prevWeeks => prevWeeks + 1); // 1주씩 추가
  };

  // 섹션 데이터 생성
  const sectionData = createWeeks(displayedWeeks);

  // 선택된 날짜의 앞뒤 날짜 계산
  const selectedDates = [
    addDays(selectedDate, -2),
    addDays(selectedDate, -1),
    selectedDate,
  ];

  // 날짜 선택 핸들러
  const handleDateSelect = date => {
    setSelectedDate(date);
  };

  // 월 표시 여부 확인
  const shouldShowMonth = (day, index, data) => {
    return index === 0 || getMonth(day) !== getMonth(data[index - 1]);
  };

  const containerWidth = windowWidth / 7;

  return (
    <SectionList
      onEndReached={loadMoreWeeks}
      onEndReachedThreshold={0.5} // 리스트의 50% 지점에 도달했을 때 다음 데이터 로드
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      sections={sectionData}
      keyExtractor={(item, index) => item + index}
      renderItem={({item, index, section}) => (
        <View style={{width: containerWidth}}>
          {shouldShowMonth(item, index, section.data) ? (
            <B17 customStyle={{}}>{format(item, 'MM')}</B17>
          ) : (
            <B20 customStyle={{}}> </B20>
          )}
          <TouchableOpacity
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              margin: 2,
              borderRadius: 12,
              backgroundColor: selectedDates.some(
                selectedDay =>
                  format(selectedDay, 'yyyy-MM-dd') ===
                  format(item, 'yyyy-MM-dd'),
              )
                ? COLOR_PRIMARY
                : COLOR_WHITE,
            }}
            onPress={() => handleDateSelect(item)}>
            <B12
              customStyle={{
                color: selectedDates.some(
                  selectedDay =>
                    format(selectedDay, 'yyyy-MM-dd') ===
                    format(item, 'yyyy-MM-dd'),
                )
                  ? COLOR_WHITE
                  : COLOR_BLACK,
              }}>
              {format(item, 'dd')}
            </B12>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default WeekCalendar;
