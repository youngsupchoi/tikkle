export const BASE_SPACING = 16;
export const SPACING_1 = 8;
export const SPACING_2 = 16;
export const SPACING_3 = 24;
export const SPACING_4 = 32;
export const SPACING_5 = 40;
export const SPACING_6 = 48;

export const HEADER_HEIGHT = 56;
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {StatusBar, Platform} from 'react-native';

export const StatusBarHeight =
  Platform.OS === 'ios' ? -30 : StatusBar.currentHeight;
