## useCountDown

一个用于管理倒计时的 Hook

提供的功能：

- 提供常规倒计时逻辑，支持配置倒计时间隔 interval、倒计时结束触发函数 onEnd；
- 支持不同时间单位的入参，毫秒、秒、分等；
- 支持输出格式化时间，便于组件展示；
- 支持人为触发、暂停、恢复等操作；

### API

```js
  const { leftTime, leftTimeFormat, pause, run } = useCountDown(restTime: 5, {
    unit: 's',
    interval: 1000,
    manual: false,
    onEnd: () => { console.log('end >>>') },
    leftPadLength: 2,
  })
```

### Params

| 参数                  | 说明                               | 类型     | 默认值 |
| --------------------- | ---------------------------------- | -------- | ------ |
| restTime              | 剩余时间                           | number   | 无     |
| options.unit          | 剩余时间的时间单位                 | UnitType | ms     |
| options.interval      | 倒计时触发事件间隔（以 ms 为单位） | number   | 1000   |
| options.manual        | 是否人为触发倒计时                 | boolean  | false  |
| options.onEnd         | 倒计时结束回调函数                 | Function | 无     |
| options.leftPadLength | 格式化时间的填充长度               | number   | 2      |

### Return

| 参数           | 说明                                                         | 类型     |
| -------------- | ------------------------------------------------------------ | -------- |
| leftTime       | 当前剩余时间，以 ms 为单位                                   | number   |
| leftTimeFormat | 剩余时间格式化后的对象，{d: ’00’, h: ’00’, m: ’05’, s: ‘40'} | object   |
| pause          | 倒计时暂停函数                                               | function |
| run            | 倒计时执行函数，可人为触发倒计时或恢复暂停的倒计时           | function |
