import React, { useState } from 'react';
import { View } from 'react-native';
import { useEnv } from 'plugin/env-plugin';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Loading } from '@terminus/nusi-mobile';
import BasePage from 'common/base-page';
import TouchableWithoutFeedback from 'common/touchable-without-feedback';
import Article from 'common/article-view/children/article';
import ViewMoreModal from 'common/view-more-modal';
import Share from 'common/article-view/children/share';
import { formatImgOssPath } from 'common/helper';
import { Icon } from 'common/icon';
import { useIntl } from 'utils/react-intl';
import defaultStyle from 'common/article-view/style';

export default function ArticleBasePage(props) {
  const { loading, articleId, data = {}, headTitle = null } = props;
  const { host } = useEnv();
  const [viewMoreVisible, setViewMoreVisible] = useState(false);
  const { formatMessage } = useIntl();

  // 分享的数据
  const formatShareData = () => {
    return {
      title: data.title,
      image: data?.headImageUrl ? formatImgOssPath(data.headImageUrl) : '',
      url: `${host}/article/${articleId}`,
    };
  };

  return (
    <BasePage
      title={headTitle || formatMessage({ id: 'article.articleDetail.title', defaultMessage: '文章详情' })}
      style={defaultStyle.container}
      rightContent={
        headTitle ? null : (
          <View style={defaultStyle.rightAction}>
            <Share size="md" color={EStyleSheet.value('$colorBtnText')} shareData={formatShareData()} />
            <TouchableWithoutFeedback
              onPress={(e) => {
                e.preventDefault && e.preventDefault();
                setViewMoreVisible(true);
              }}
            >
              <View>
                <Icon style={[defaultStyle.iconStyle, defaultStyle.rightIcon]} type="more" />
              </View>
            </TouchableWithoutFeedback>
          </View>
        )
      }
    >
      <Loading toast visible={loading} />
      <Article {...props} data={data} />
      <ViewMoreModal
        visible={viewMoreVisible}
        onClose={() => setViewMoreVisible(false)}
        btns={['message', 'home']}
        rowNum={5}
      />
    </BasePage>
  );
}
