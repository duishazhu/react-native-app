import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { Loading, Picker, DatePicker } from '@terminus/nusi-mobile';
import Button from 'common/button';
// import { NavigationService } from '@terminus/react-navigation';
import { Icon } from 'common/icon';
import Card from 'common/card';
import FieldDisplay from 'common/field/display';
import { formatDate } from 'common/helper';
import useRequest from 'hooks/useRequest';
import styles from 'home/style';

const mockData = [
  {
    title: '预报货任务',
    time: '10:12—12:22',
    status: '未完成',
  },
  {
    title: '预报货任务',
    time: '10:12—12:22',
    status: '未完成',
  },
  {
    title: '预报货任务',
    time: '10:12—12:22',
    status: '未完成',
  },
];

const statusOptions = [
  { label: '全部', value: 'ALL' },
  { label: '未完成', value: 'UN_DONE' },
];

export default function Task() {
  const [status, setStatus] = useState('ALL');
  const [date, setDate] = useState(new Date());
  const { loading, result, executor } = useRequest(() => mockData, { immediate: false });

  const fetchData = useCallback(
    () => executor({ status: status === 'ALL' ? undefined : status, date }),
    [date, executor, status]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <Loading visible={loading} toast />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>我的任务</Text>
        <View style={styles.filterContainer}>
          <Picker data={statusOptions} value={status} onConfirm={([v]) => setStatus(v)}>
            <TouchableWithoutFeedback>
              <View style={styles.filter}>
                <Text style={styles.filterText}>{statusOptions.find(({ value }) => value === status).label}</Text>
                <Icon type="icon-arrow-down" size={10} color="#999999" />
              </View>
            </TouchableWithoutFeedback>
          </Picker>
          <DatePicker mode="date" value={date} onConfirm={(v) => setDate(v)}>
            <TouchableWithoutFeedback>
              <View style={styles.filter}>
                <Text style={styles.filterText}>{formatDate(date, null, 'yyyy.MM.dd')}</Text>
                <Icon type="icon-arrow-down" size={10} color="#999999" />
              </View>
            </TouchableWithoutFeedback>
          </DatePicker>
        </View>
      </View>
      {result?.length
        ? result.map((item, index) => {
            return (
              <Card title={item.title} key={index}>
                <View style={styles.taskBody}>
                  <View>
                    <FieldDisplay label="时间" labelWidth={40} value={item.time} />
                    <FieldDisplay label="状态" labelWidth={40} value={item.status} />
                  </View>
                  <Button type="primary">去执行</Button>
                </View>
              </Card>
            );
          })
        : null}
    </>
  );
}
