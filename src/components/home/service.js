import { request } from '@terminus/mall-utils';

export async function getCarouselData() {
  const result = await request('/gateway/cargo-forecast-service/api/home/queryBannerList', {});
  if (result?.length) {
    return Promise.all(
      result.map(({ groupId }) =>
        request(`/gateway/filemanage/api/fileGroup/listByGroupId?groupId=${groupId}`, { method: 'POST' })
      )
    ).then((groupList) => {
      return groupList.reduce((current, fileList, index) => {
        return [...current, ...fileList.map((file) => ({ ...file, ...result[index] }))];
      }, []);
    });
  }
  return [];
}

export function getHomeApps() {
  return request('/api/qywx/acl/app/homeUserAppMeta', { method: 'POST' });
}
