import React, { memo } from 'react';
import { Text } from 'react-native';
import { themes, createStyle } from 'styles/theme';
import { useIntl } from 'utils/react-intl';

const Style = createStyle({
  footerText: {
    fontSize: 12,
    color: themes.$gray,
    paddingTop: 8,
    paddingBottom: 16,
    textAlign: 'center',
  },
});

function Footer(props) {
  const { loading, hasMore } = props;
  const { formatMessage } = useIntl();

  if (loading) {
    return (
      <Text style={Style.footerText}>
        {formatMessage({ id: 'common.list.loading', defaultMessage: '正在加载...' })}
      </Text>
    );
  }
  return (
    <Text style={Style.footerText}>
      {hasMore
        ? formatMessage({ id: 'common.list.scrollForMore', defaultMessage: '上拉加载更多' })
        : formatMessage({ id: 'common.list.noMore', defaultMessage: '没有更多啦！' })}
    </Text>
  );
}

export default memo(Footer);
