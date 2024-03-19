## useRequest

对异步函数做简单处理的 hook。一般来说项目里对 fetch 都会做了一定程度的封装。这个简单的 hook 仅做自动 loading、mutate 的处理。返回处理过后的函数和 loading、error 等状态。

### 类型声明

```ts
function useRequest<A extends AsyncFunction>(
  asyncFunction: A,
  {
    immediate,
    onResult,
  }?: {
    immediate?: boolean;
    onResult?: (res: any) => void;
  }
): {
  executor: (...args: any[]) => Promise<any>;
  result: any;
  error: any;
  loading: boolean;
  status: 'success' | 'loading' | 'idle' | 'fail' | 'mutate success';
  mutate: (...args: any[]) => any;
};
```

### 用法

#### 自动触发请求

默认自动发请求

```javascript
const fetchData = (params) => {
  return request('/api/xxx');
};

function MyComponent() {
  const { loading, result } = useRequest(fetchData);

  if (result) return <>...</>;
  if (loading) return <>...</>;
  return null;
}
```

#### 手工触发请求

```javascript
// 手工处理请求返回值
function MyComponent() {
  const { executor: loadData, loading, result } = useRequest(fetchData, { immediate: false });

  useEffect(() => {
    loadData();
  }, []);

  // 或
  useEffect(() => {
    loadData().then((result) => {});
  }, []);
}
```

#### onResult

请求成功返回数据会触发 onResult 回调，一般情况下直接.then 后处理或使用 result 即可，但有时候希望自动同步状态，则可以配置 onResult 方法

```javascript
// 自动更新数据
const [address, setAddress] = useStore('address');
const {
  executor: loadData,
  loading,
  result,
} = useRequest(fetchData, {
  onResult: (data) => setAddress({ addressList: data }),
});
```

#### mutate

很多时候我们会加载数据，更新数据，重新加载数据。如，购物车页面，加载列表 -> 勾选某个商品 -> 请求数据 -> 刷新列表。如果等待请求成功后再设置选中体验会很不好，因此我们可以在请求回来之前先设置选中的效果

```javascript
// 自动更新数据
const { loadData, loading, result, mutate } = useRequest(fetchData);

const handleClick = (key) => {
  mutate({ ...result, data: result.data.map((v) => ({ ...v, selected: v.key === key })) });
  loadData();
};
```
