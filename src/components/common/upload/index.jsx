import React, { useState, useCallback, useMemo } from 'react';
import { Image } from 'react-native';
import { Loading, ImagePicker } from '@terminus/nusi-mobile';
import { useEnv } from 'plugin/env-plugin';
import { onUploadError } from 'common/helper';
import { UPLOAD_URL, UPLOAD_LIMIT_SIZE } from 'common/constants';
import styles from 'common/upload/style';
import closeIcon from 'images/common/image-picker-close.png';

export default function Upload({ value, onChange, ...props }) {
  const { url: host } = useEnv();

  const [loading, setLoading] = useState(false);

  const rowNum = useMemo(() => (props.multiple ? props.rowNum : 1), [props.multiple, props.rowNum]);

  const maxLength = useMemo(() => (props.multiple ? props.maxLength : 1), [props.maxLength, props.multiple]);

  const files = useMemo(() => {
    if (value) {
      if (props.multiple) {
        return value.map((url) => ({ url }));
      }
      return [{ url: value }];
    }
    return [];
  }, [props.multiple, value]);

  const handleChange = useCallback(
    (data) => {
      if (data?.length) {
        if (props.multiple) {
          onChange(data.map(({ url }) => url));
        } else onChange(data[0].url);
      } else onChange();
    },
    [onChange, props.multiple]
  );

  const handleFilesChange = useCallback(
    async (uploadFunc) => {
      setLoading(true);
      try {
        const result = await uploadFunc();
        const newFiles = (result || []).map((it) => ({ url: Object.values(JSON.parse(it))[0] }));
        const allFiles = [...files, ...newFiles];
        const finalFiles = allFiles.length <= maxLength ? allFiles : allFiles.slice(0, maxLength);
        handleChange(finalFiles);
      } catch (error) {
        onUploadError(error);
      }
      setLoading(false);
    },
    [files, maxLength, handleChange]
  );

  return (
    <>
      <Loading toast visible={loading} />
      <ImagePicker
        {...props}
        styles={{ imageTouchWrap: styles.imageTouchWrap, uploadIconWrap: styles.uploadIconWrap }}
        style={styles.container}
        imageStyle={styles.imageStyle}
        closeIcon={<Image source={closeIcon} style={styles.closeIcon} />}
        rowNum={rowNum}
        maxLength={maxLength}
        files={files}
        url={`${host}${UPLOAD_URL}`}
        selectable={files.length < maxLength}
        onError={onUploadError}
        onChange={handleFilesChange}
        onRemove={handleChange}
      />
    </>
  );
}

Upload.defaultProps = {
  multiple: true,
  rowNum: 4,
  maxLength: 6,
  limit: UPLOAD_LIMIT_SIZE,
};
