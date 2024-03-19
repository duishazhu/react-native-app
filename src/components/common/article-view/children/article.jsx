import React, { memo } from 'react';
import { ScrollView, View, TouchableHighlight, Text } from 'react-native';
import { WebView } from '@terminus/nusi-mobile';
import { isNative } from 'utils/platform';
import { formatDate } from 'common/helper';

import defaultStyle from 'common/article-view/style';

const ContainerCom = isNative ? View : ScrollView;

function Article(props) {
  const { data = {}, headTitle = null, buttons = false } = props;

  return (
    <>
      {headTitle ? null : (
        <View>
          <Text style={defaultStyle.titleStyle}>{data.title}</Text>
          <Text style={defaultStyle.dateStyle}>{formatDate(data.createdAt)}</Text>
        </View>
      )}
      <ContainerCom style={defaultStyle.scrollStyle}>
        <WebView
          source={{
            html: data.content,
          }}
        />
        {Array.isArray(buttons) && (
          <View style={defaultStyle.bottomButton}>
            {buttons?.map(({ text, onPress, color, backgroundColor }) => (
              <TouchableHighlight
                underlayColor="transparent"
                key={text}
                onPress={onPress}
                style={[defaultStyle.cancelStyle, { backgroundColor }]}
              >
                <Text style={{ color }}>{text}</Text>
              </TouchableHighlight>
            ))}
          </View>
        )}
      </ContainerCom>
    </>
  );
}

export default memo(Article);
