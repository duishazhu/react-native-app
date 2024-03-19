import React from 'react';
import { ScrollView } from 'react-native';
import CommonApps from 'common/apps';
import useRequest from 'hooks/useRequest';
import BasePage from 'common/base-page';
import { Empty } from 'common/empty';
import DevelopingImg from 'images/common/developing.png';
import { getAllApps } from 'apps/service';
import styles from 'apps/style';

export default function Apps() {
  const { result } = useRequest(getAllApps);

  return (
    <BasePage forceInset={{ bottom: 'never' }} leftContent={null} title="全部应用">
      {result?.length ? (
        <ScrollView contentContainerStyle={styles.page}>
          {result.map((item) => (
            <CommonApps key={item.key} title={item.name} data={item.appMetas} />
          ))}
        </ScrollView>
      ) : (
        <Empty emptyLabel="开发中，敬请期待..." imgOpt={{ img: DevelopingImg, width: 120, height: 120 }} />
      )}
    </BasePage>
  );
}
