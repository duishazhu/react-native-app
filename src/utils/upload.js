import { request } from '@terminus/mall-utils';

export default async function upload(files) {
  const formData = new FormData();

  files.forEach((it) => {
    formData.append('file', it);
  });

  return request('/api/herd/files/upload', {
    method: 'POST',
    body: formData,
    ignoreJudgeSuccess: true,
    ignoreConvertData: true,
  });
}
