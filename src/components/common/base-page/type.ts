export interface IHeader {
  headerStyle?: any;
  headerLeftStyle?: any;
  leftIconName?: string;
  leftIconStyle?: any;
  onLeftClick?: () => void;
  leftContent?: React.ReactNode;
  titleStyle?: any;
  rightContent?: React.ReactNode;
  titleType?: string;
  title: string;
  safeAreaViewProps?: any;
}

export interface IBasePage extends IHeader {
  forceInset?: any;
  trackTitle?: string;
  isTabRoute?: boolean;
  style?: any;
}
