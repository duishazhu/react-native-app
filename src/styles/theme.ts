import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ThemeManager } from '@terminus/nusi-mobile';
import themes from './default-themes';

ThemeManager.inject(themes);

type ThemesConstants = keyof typeof themes;

type AddConstants<T> = {
  [P in keyof T]?: ThemesConstants | T[P];
};

type Styles = AddConstants<ViewStyle | TextStyle | ImageStyle>;

type StyleObject<T> = {
  [P in keyof T]: ThemesConstants | Styles | StyleObject<Styles>;
};

function createStyle<T>(styles: StyleObject<T>) {
  return EStyleSheet.create(styles) as T;
}

export { themes, createStyle };
