import React, { useEffect } from 'react';
import Tap from 'common/field/tap';
import useStoreSelect from 'hooks/useStoreSelect';
import useRefCallback from 'hooks/useRefCallback';

export default function FieldStoreSelect({ multiple, clearAtDestroy, value, onChange, ...props }) {
  const { selected, dispatchSelect, setSelected } = useStoreSelect({ multiple, clearAtDestroy });

  const handleChange = useRefCallback(onChange);

  useEffect(() => {
    if (selected) {
      handleChange(multiple ? selected.map(({ id }) => id) : selected.id);
    } else handleChange();
  }, [handleChange, multiple, selected]);

  useEffect(() => {
    !value && setSelected();
  }, [setSelected, value]);

  return (
    <Tap
      {...props}
      text={selected && ((multiple ? selected : [selected]).map(({ name }) => name).join('; ') || null)}
      onPress={dispatchSelect}
    />
  );
}

FieldStoreSelect.defaultProps = {
  placeholder: '请选择门店',
};
