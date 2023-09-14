export const getKoreanDate = () => {
  const currentDate = new Date();
  const koreanOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
  return new Date(currentDate.getTime() + koreanOffset);
};
