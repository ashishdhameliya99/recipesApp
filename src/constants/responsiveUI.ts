import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const RFont = (size: number) => RFValue(size, 926);

export const RWidth = (value: number) =>
  widthPercentageToDP((value * 100) / 428);
export const RHeight = (value: number) =>
  heightPercentageToDP((value * 100) / 926);
