import AMapLoader from '@amap/amap-jsapi-loader';
import '@amap/amap-jsapi-types'; // 目前仅包含 JSAPI2.0 核心文件的接口，不包含插件的接口

type noop = (...args: any[]) => void;

class Map {
  // 校验是否加载sdk，使用 v2.0 JSAPI Loader加载sdk
  loadSdk(callback: noop) {
    if (!window.AMap) {
      AMapLoader.load({
        key: '4acf169e511ed9086c58181d7e94a66c',
        version: '1.4.16',
        AMapUI: {
          version: '1.1',
        },
      })
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('[amap] sdk load success!');
          callback();
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error('[amap] sdk load fail: ', err);
        });
    } else {
      callback();
    }
  }

  // 定位 https://lbs.amap.com/api/javascript-api/guide/services/geolocation
  // 安卓微信7.0后 http协议访问定位组件会导致定位失败
  getLocation() {
    return new Promise((resolve, reject) => {
      this.loadSdk(() => {
        window.AMap.plugin('AMap.Geolocation', () => {
          const geolocation = new window.AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000, // 超过10秒后停止定位，默认：无穷大
            extensions: 'all',
          });
          geolocation.getCurrentPosition((status, result) => {
            if (status === 'error') {
              // eslint-disable-next-line no-console
              console.error('[amap] getLocation fail: ', result);
              return reject(result);
            }
            // eslint-disable-next-line no-console
            console.log('[amap] getLocation success: ', result);
            return resolve(result);
          });
        });
      });
    });
  }

  // 获取附近poi https://lbs.amap.com/api/jsapi-v2/guide/services/autocomplete
  getNearBy({ longitude, latitude }, radius = 2000, options?: any) {
    return new Promise((resolve, reject) => {
      this.loadSdk(() => {
        window.AMap.plugin(['AMap.PlaceSearch'], () => {
          const placeSearch = new window.AMap.PlaceSearch({
            pageSize: 20,
            extensions: 'all',
            ...options,
          });

          placeSearch.searchNearBy('', [longitude, latitude], radius, (status, result) => {
            if (status === 'error') {
              // eslint-disable-next-line no-console
              console.error('[amap] searchNearBy fail: ', result);
              return reject(result);
            }
            // eslint-disable-next-line no-console
            console.log('[amap] searchNearBy success: ', result);
            return resolve(result.poiList);
          });
        });
      });
    });
  }

  // 输入提示  https://lbs.amap.com/api/jsapi-v2/documentation#autocomplete
  placeSearch(keyword: string, options?: any) {
    return new Promise((resolve, reject) => {
      if (!`${keyword.trim()}`) {
        resolve([]);
      } else {
        this.loadSdk(() => {
          window.AMap.plugin(['AMap.PlaceSearch'], () => {
            const placeSearch = new window.AMap.PlaceSearch({
              extensions: 'all',
              ...options,
            });
            placeSearch.search(keyword, (status, result) => {
              if (status === 'error') {
                // eslint-disable-next-line no-console
                console.error('[amap] placeSearch fail: ', result);
                return reject(result);
              }
              // eslint-disable-next-line no-console
              console.log('[amap] placeSearch success: ', result);
              return resolve(result.poiList);
            });
          });
        });
      }
    });
  }

  // 渲染拖拽选址地图 https://lbs.amap.com/api/amap-ui/reference-amap-ui/other/positionpicker
  renderMapPicker(
    container: string | HTMLDivElement,
    center: AMap.LngLat | undefined,
    onChange: noop,
    opts?: AMap.MapOptions
  ) {
    return new Promise((resolve) => {
      this.loadSdk(() => {
        const map = new AMap.Map(container, {
          zoom: 16,
          ...opts,
        });
        AMap.plugin(['AMap.ToolBar', 'AMap.Geolocation'], () => {
          const toolbar = new AMap.ToolBar();
          const geoLocation = new AMap.Geolocation();
          map.addControl(toolbar);
          map.addControl(geoLocation);
        });
        window.AMapUI.loadUI(['misc/PositionPicker'], (PositionPicker) => {
          const positionPicker = new PositionPicker({ mode: 'dragMap', map });

          positionPicker.on('success', (positionResult) => {
            onChange?.(positionResult);
          });
          positionPicker.on('fail', () => {});

          positionPicker.start(center);

          resolve(map);
        });
      });
    });
  }

  // 渲染普通地址点标记 https://lbs.amap.com/api/javascript-api/guide/overlays/marker
  renderNormalMapPicker(
    container: string | HTMLDivElement,
    center: AMap.Vector2,
    opts?: AMap.MapOptions,
    markerOptions?: AMap.MarkerOptions
  ) {
    return new Promise((resolve) => {
      this.loadSdk(() => {
        const map = new AMap.Map(container, {
          zoom: 16,
          center,
          ...opts,
        });

        let marker = new AMap.Marker({
          position: center,
          ...markerOptions,
          label: { ...markerOptions.label, offset: new AMap.Pixel(0, 0) },
        });

        map.add(marker);

        resolve(map);
      });
    });
  }
}

export default new Map();
