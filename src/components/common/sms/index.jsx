import React, { useEffect, useState } from 'react';
import useInterval from 'common/sms/useInterval';
import { Text, TouchableHighlight } from 'react-native';
import { Toast } from '@terminus/nusi-mobile';
import { useIntl } from 'utils/react-intl';
import styles from 'common/sms/style';

export default function Sms({ style = {}, onSendSms = () => {}, isSend = false }) {
  const [count, setCount] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const { formatMessage } = useIntl();

  useInterval(
    () => {
      if (count) {
        setCount(count - 1);
        return;
      }
      setIsRunning(false);
      setCount(60);
    },
    isRunning ? 1000 : null
  );

  useEffect(() => {
    if (isSend) {
      setIsRunning(true);
      Toast.info(formatMessage({ id: 'common.sms.sendSuccess', defaultMessage: `验证码发送成功` }), 2);
    }
  }, [isSend, formatMessage]);

  return isRunning ? (
    <Text style={styles.sendText}>
      {formatMessage({ defaultMessage: '验证码已发送{count}s', id: 'common.sms.countDown' }, { count })}
    </Text>
  ) : (
    <TouchableHighlight style={[styles.sendBtn, style]} disabled={isRunning} size="small" onPress={onSendSms}>
      <Text style={styles.sendText}>{formatMessage({ defaultMessage: '重新发送', id: 'common.sms.reSendCode' })}</Text>
    </TouchableHighlight>
  );
}
