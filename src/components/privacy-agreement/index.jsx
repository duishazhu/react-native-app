import React, { useState, useEffect, useCallback } from 'react';
import PrivacyAgreementContent from 'privacy-agreement/children/PrivacyAgreementContent';
import BasePage from 'common/base-page';
import { NavigationService } from '@terminus/react-navigation';
import { AsyncStorage, Modal } from '@terminus/nusi-mobile';

import { requestPrivacyInfo } from 'privacy-agreement/services';
import { privacyStyle as styles } from 'privacy-agreement/style';

const PrivacyAgreement = () => {
  const [visible, setVisible] = useState(false);
  const [agreementList, setAgreementList] = useState([]);
  const [loading, setLoading] = useState(false);

  const formatDateTime = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };

  const handleClose = async () => {
    const nowTime = new Date().getTime();

    await AsyncStorage.set('readPrivacyStatus', nowTime);

    setVisible(false);
    NavigationService.navigate('Home');
  };

  const getPrivacyInfo = useCallback(async () => {
    setLoading(true);

    try {
      const result = await requestPrivacyInfo();
      setLoading(false);
      setAgreementList(result);
      getListLimit(result);
    } catch {
      setLoading(false);
    }
  }, [getListLimit]);

  useEffect(() => {
    getPrivacyInfo();
  }, [getPrivacyInfo]);

  const getListLimit = useCallback(async (result) => {
    let res = await AsyncStorage.get('readPrivacyStatus');
    if (res) {
      res = formatDateTime(new Date(res));

      const timeArray = result.map((item) => {
        return formatDateTime(new Date(item.updatedAt));
      });

      timeArray.push(res);
      if (Array.from(new Set(timeArray)).length < timeArray.length) {
        setVisible(true);
        return;
      }

      const maxRes = timeArray.reduce((a, b) => (a > b ? a : b));
      if (maxRes !== res) {
        setVisible(true);
      } else {
        NavigationService.navigate('Home');
      }
    } else {
      setVisible(true);
    }
  }, []);

  return (
    <BasePage>
      <Modal
        normalWrap
        maskClosable={false}
        visible={visible}
        useScrollView={false}
        onClose={handleClose}
        style={styles.modal}
        bodyStyle={{ paddingHorizontal: 0 }}
      >
        <PrivacyAgreementContent loading={loading} agreementList={agreementList} agreePrivacy={handleClose} />
      </Modal>
    </BasePage>
  );
};

export default PrivacyAgreement;
