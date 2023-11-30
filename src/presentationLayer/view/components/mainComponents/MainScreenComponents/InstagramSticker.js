import { useRef } from "react";
import { Pressable, Text, View } from "react-native";
import ViewShot from "react-native-view-shot";

const ExampleViewShot = () => {
  // 캡처할 ViewShot 영역을 참조하는 ref
  const viewShotRef = useRef();
  
  // onPress 액션을 통해 캡처를 실행
  const onPressCapture = async () => {
    const uri = await viewShotRef.current?.capture?.();
    // to do with uri
  };
  
  return (
    <View>
      <ViewShot ref={ref}>
        <View>
          <Text>Something to capture...</Text>
        </View>
      </ViewShot>

	  <Pressable onPress={onPressCapture}>
        <Text>Capture!</Text>
      <Pressable>
    </View>
  )
}