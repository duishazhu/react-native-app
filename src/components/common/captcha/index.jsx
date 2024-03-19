import React, { useState, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react';
import { TouchableHighlight, View } from 'react-native';
import CommonImage from 'common/image';
import { getImageCaptcha } from 'common/captcha/services';
import style from 'common/captcha/style';

const transparentSrc =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2NgYGCQAgAAHwAbT1anDgAAAABJRU5ErkJggg==';

const Captcha = forwardRef((props, ref) => {
  const [imageCode, setImageCode] = useState(transparentSrc);
  const [timeStamp, setTimeStamp] = useState(new Date().valueOf());

  const refresh = () => {
    setTimeStamp(new Date().valueOf());
  };

  useImperativeHandle(ref, () => ({ refresh }));

  useEffect(() => {
    fetchImage();
  }, [fetchImage, timeStamp]);

  const fetchImage = useCallback(async () => {
    const { imageUrl, token } = await getImageCaptcha({ t: timeStamp });
    props.getToken(token);
    setImageCode(imageUrl);
  }, [props, timeStamp]);

  return (
    <TouchableHighlight underlayColor="transparent" onPress={refresh}>
      <View>
        <CommonImage style={style.image} source={{ uri: imageCode }} resizeMode="stretch" />
      </View>
    </TouchableHighlight>
  );
});

export default Captcha;
