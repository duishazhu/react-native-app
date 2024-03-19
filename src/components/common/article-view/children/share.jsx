import React, { useState } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { Toast } from '@terminus/nusi-mobile';
import { SharePanel, SocialResultCode } from '@terminus/react-native-social';
import { Icon } from 'common/icon';
import Modal from 'common/modal';
import { isNative } from 'utils/platform';
import { useIntl, FormattedMessage } from 'utils/react-intl';

import EStyleSheet from 'react-native-extended-stylesheet';

export default function ({ shareData = {}, size, color }) {
  const { formatMessage } = useIntl();
  const [visible, setVisible] = useState(false);

  if (!isNative) return null;

  const handleShare = () => {
    setVisible(true);
  };

  const shareResult = (result, error) => {
    if (result) {
      Toast.info(formatMessage({ id: 'trade.itemDetail.shareSuccess', defaultMessage: '分享成功' }));
    } else {
      if (error === SocialResultCode.APP_NOT_INSTALL) {
        Toast.fail(formatMessage({ id: 'trade.itemDetail.pleaseInstallApp', defaultMessage: '请先安装应用' }));
        return;
      }
      Toast.fail(formatMessage({ id: 'trade.itemDetail.sharingFailure', defaultMessage: '分享失败' }));
    }
  };

  return (
    <>
      <TouchableHighlight style={{ marginRight: 8 }} underlayColor="transparent" onPress={() => handleShare()}>
        <View>
          <Icon type="share" size={size || 'md'} color={color || EStyleSheet.value('$primaryColor')} />
        </View>
      </TouchableHighlight>
      <Modal
        popup
        maskClosable
        visible={visible}
        hasHeader
        closable
        onClose={() => setVisible(false)}
        title={<FormattedMessage defaultMessage="分享至" id="member.articleCenter.share" />}
        useScrollView={false}
        animationType="slide-up"
        style={{ height: 240 }}
      >
        <SharePanel shareContent={shareData} onShareResult={(result, error) => shareResult(result, error)} />
      </Modal>
    </>
  );
}
