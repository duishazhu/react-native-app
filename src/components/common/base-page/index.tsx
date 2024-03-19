import React, { PropsWithChildren, Fragment } from 'react';
import { Portal } from '@terminus/nusi-mobile';
import SafeAreaView from 'common/safe-area-view';
import Header from 'common/header';
import { IBasePage } from 'common/base-page/type';
import { isMp } from 'utils/platform';

/**
 * BasePage 属性包含了SafeAreaView和Header属性
 * title 用于header展示的title
 *
 */
export default function BasePage({
  forceInset,
  style,
  title,
  headerStyle,
  headerLeftStyle,
  leftIconName,
  leftIconStyle,
  onLeftClick,
  leftContent,
  titleStyle,
  rightContent,
  titleType,
  children,
  safeAreaViewProps = {},
}: PropsWithChildren<IBasePage>) {
  const Wrapper = isMp ? Portal.Host : Fragment;

  return (
    <Wrapper>
      <SafeAreaView forceInset={forceInset} style={style} {...safeAreaViewProps}>
        {(title || leftContent || rightContent) && (
          <Header
            title={title}
            headerStyle={headerStyle}
            leftContent={leftContent}
            titleType={titleType}
            rightContent={rightContent}
            titleStyle={titleStyle}
            onLeftClick={onLeftClick}
            leftIconName={leftIconName}
            leftIconStyle={leftIconStyle}
            headerLeftStyle={headerLeftStyle}
          />
        )}
        {children}
      </SafeAreaView>
    </Wrapper>
  );
}
