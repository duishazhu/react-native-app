import PropTypes from 'prop-types';
import { useEnv } from 'plugin/env-plugin';
import isFunction from 'lodash/isFunction';
import style from 'common/input-image/style';
import { onUploadError } from 'common/helper';
import React, { useState, useCallback } from 'react';
import { View, Text, Image } from 'react-native';
import { UPLOAD_URL, UPLOAD_LIMIT_SIZE } from 'common/constants';
import { Loading, ImagePicker, InputItem } from '@terminus/nusi-mobile';
import closeIcon from 'images/common/image-picker-close.png';

const MAX_TEXT_LENGTH = 500;

const InputImage = ({
  imageLength = 6,
  onChange,
  limit = UPLOAD_LIMIT_SIZE,
  styles = {},
  multiple = true,
  placeholder,
}) => {
  const [images, setImages] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const { url: uploadHost } = useEnv();

  const handleImagesChange = useCallback(
    (data) => {
      setImages(data);
      isFunction(onChange) && onChange({ images: data.map(({ url }) => url), text });
    },
    [onChange, text]
  );

  const handleSelectImageChange = useCallback(
    async (uploadFunc) => {
      setLoading(true);
      try {
        const result = await uploadFunc();
        const formattedResult = (result || []).map((it) => ({ url: Object.values(JSON.parse(it))[0] }));
        const imagesList = [...images, ...formattedResult];
        const newImages =
          imagesList && imagesList.length <= imageLength ? imagesList : imagesList.slice(0, imageLength);
        handleImagesChange(newImages);
      } catch (error) {
        onUploadError(error);
      }
      setLoading(false);
    },
    [handleImagesChange, imageLength, images]
  );

  const handleTextChange = (val) => {
    setText(val);
    isFunction(onChange) && onChange({ images: images.map(({ url }) => url), text: val });
  };

  return (
    <View style={[style.contentContainer, styles.wrap]}>
      <Loading toast visible={loading} />
      <InputItem
        last
        style={style.inputContainer}
        rows={6}
        count={MAX_TEXT_LENGTH}
        inline={false}
        borderRadius={false}
        onChange={handleTextChange}
        placeholder={placeholder || '请输入您的内容'}
        placeholderTextColor="rgba(200, 201, 204, 1)"
      />
      <Text style={style.subTitle}>
        请上传图片{images.length}/{imageLength}
      </Text>
      <ImagePicker
        styles={{
          container: { marginLeft: -12 },
          imageWrap: { width: '33%' },
          imageContainer: { width: '100%' },
          image: { width: 96, height: 96 },
          upload: { marginTop: 8 },
          uploadIconWrap: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: 'rgba(227, 227, 227, 1)',
          },
          closeIconWrap: {
            top: 4,
            right: 4,
          },
        }}
        closeIcon={<Image source={closeIcon} style={style.closeIcon} />}
        rowNum={3}
        maxLength={imageLength}
        limit={limit}
        onError={onUploadError}
        multiple={multiple}
        onChange={handleSelectImageChange}
        files={images}
        selectable={images.length < imageLength}
        onRemove={handleImagesChange}
        url={`${uploadHost}${UPLOAD_URL}`}
      />
    </View>
  );
};

export default InputImage;

InputImage.propTypes = {
  imageLength: PropTypes.number,
  onChange: PropTypes.func,
  styles: PropTypes.object,
};
