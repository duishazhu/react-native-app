import React, { useState, useEffect } from 'react';
import { AddressPicker, Loading } from '@terminus/nusi-mobile';
import { getParentIdAndLevel } from 'common/address-picker/helper';
import { getAddressFromStorage } from 'common/helper';
import { ADDRESS_STORAGE_KEY } from 'common/constants';
import { getAddressList } from 'common/address-picker/service';

function AddressCommonPicker(props) {
  const {
    style,
    childWrapStyle,
    title,
    children,
    initAddress = {},
    level = 4,
    handleOk,
    remembered = false,
    mustComplete = false,
  } = props;
  const [pickerList, setPickerList] = useState([]);
  const [currentParentId, setCurrentParentId] = useState();
  const [currentLevel, setCurrentLevel] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let defaultAddress = initAddress;
      if (remembered) {
        defaultAddress = await getAddressFromStorage();
      }
      const { parentId, current } = getParentIdAndLevel(defaultAddress, level);
      setCurrentLevel(current);
      setCurrentParentId(parentId);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remembered]);

  useEffect(() => {
    // 是否点击的是街道
    if (currentParentId) {
      setLoading(true);
      getAddressList(currentParentId, currentLevel)
        .then((data) => {
          setPickerList(data);
        })
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentParentId]);

  // 选择步骤条
  const onStepSelect = ({ level: current, parentId }) => {
    setCurrentLevel(current);
    setCurrentParentId(parentId);
  };

  // 为了适配nusi-mobile 不得不改
  const onSelect = ({ current, parentId }) => {
    setCurrentLevel(current + 1);
    setCurrentParentId(parentId);
  };

  return (
    <AddressPicker
      style={style}
      modalStyle={{ height: '80%', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      childWrapStyle={childWrapStyle}
      source={pickerList}
      title={title}
      level={level}
      initAddress={initAddress}
      remembered={remembered}
      mustComplete={mustComplete}
      handleOk={handleOk}
      onStepPress={onStepSelect}
      onSelect={onSelect}
      ADDRESS_STORAGE_KEY={ADDRESS_STORAGE_KEY}
    >
      <Loading visible={loading} toast />
      {children}
    </AddressPicker>
  );
}

export default AddressCommonPicker;
