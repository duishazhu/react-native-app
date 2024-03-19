import React, { useState, useCallback } from 'react';
import { privacyStyle } from 'privacy-agreement/style';
import { useIntl, FormattedMessage } from 'utils/react-intl';
import { Button, Checkbox, Toast, Loading } from '@terminus/nusi-mobile';
import { View, Text, ImageBackground, Platform, TouchableOpacity, ScrollView } from 'react-native';
import privacyBackground from 'images/member/privacy-background.png';
import { NavigationService } from '@terminus/react-navigation';

const PrivacyAgreement = (props) => {
  const { formatMessage } = useIntl();
  const { agreementList, loading = false } = props;

  const [readPrivacyChecked, setReadPrivacyChecked] = useState(false);

  const toAgreement = (data) => {
    NavigationService.navigate('Article', {
      title: formatMessage({ id: 'user.login.registerAgreement', defaultMessage: `${data.title}` }),
      articleId: data.id,
    });
  };

  // 不同意隐私政策
  const closePrivacy = () => {
    Platform.API.exitMiniProgram({
      success() {
        // console.log(res);
      },
    });
  };

  // 同意隐私政策
  const certainAgreePrivacy = () => {
    if (!readPrivacyChecked) {
      Toast.info(formatMessage({ id: 'wxlogin.register.tips', defaultMessage: '请同意隐私政策' }));
      return;
    }
    props.agreePrivacy();
  };

  const formatAgreement = useCallback(
    (i) => {
      if (i === agreementList.length - 1) {
        return '';
      }
      if (i === agreementList.length - 2) {
        return '与';
      }
      return '、';
    },
    [agreementList]
  );
  return (
    <ImageBackground source={privacyBackground} resizeMode="cover" imageStyle={privacyStyle.centerModalImage}>
      <Loading toast visible={loading} />
      <View style={privacyStyle.privacyModalContent}>
        <View style={privacyStyle.centerModalTitle}>隐私政策提示</View>
        <ScrollView>
          <View style={privacyStyle.contentHeight}>
            <View style={privacyStyle.privacyContent}>
              <FormattedMessage
                style={{ lineHeight: 20 }}
                id="common.privacy.beforeUseServiceClick"
                defaultMessage="请您在使用零食很忙会员服务前点击"
              />

              {agreementList?.map((list, i) => {
                return (
                  <>
                    <TouchableOpacity
                      onPress={() => toAgreement(list)}
                      style={[privacyStyle.inline, privacyStyle.protocolBtn]}
                    >
                      《{list.title}》
                    </TouchableOpacity>
                    <Text style={{ fontSize: 14 }}>{formatAgreement(i)}</Text>
                  </>
                );
              })}

              <FormattedMessage
                style={{ lineHeight: 20 }}
                id="common.privacy.readPrivacyCarefully"
                defaultMessage="并仔细阅读。如您同意以上全部服务，请点击“同意”开始使用我们的服务"
              />
            </View>
          </View>
        </ScrollView>
        <View style={privacyStyle.protocolSection}>
          <Checkbox
            style={{ marginRight: -5 }}
            shape="circle"
            checked={readPrivacyChecked}
            onChange={setReadPrivacyChecked}
          />
          <Text style={privacyStyle.protocolLabel}>
            {formatMessage({
              id: 'common.privacy.agreePrivacyProtocol',
              defaultMessage: '本人已年满14岁，可自行授权个人信息处理',
            })}
          </Text>
        </View>
        <View style={privacyStyle.privacyBottom}>
          <Button style={[privacyStyle.submitButton, privacyStyle.agreeButton]} onPress={closePrivacy}>
            {formatMessage({ id: 'common.privacy.notAgree', defaultMessage: '不同意' })}
          </Button>
          <Button
            style={[
              privacyStyle.submitButton,
              privacyStyle.toSubmitButton,
              privacyStyle.agreeButton,
              privacyStyle.agreeButtonMargin,
            ]}
            onPress={certainAgreePrivacy}
          >
            {formatMessage({ id: 'common.privacy.agree', defaultMessage: '同意' })}
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default PrivacyAgreement;
