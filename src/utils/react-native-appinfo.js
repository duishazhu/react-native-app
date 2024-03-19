export function getAppInfos() {
  return {
    channelCode: getDefaultChannelCode(),
    channelValue: getDefaultChannelValue(),
    devId: getDevId(),
    appVersion: getAppVersion(),
    appVersionName: getAppVersionName(),
    sn: getSN(),
  };
}

export function openAppSettings() {}

export function getDefaultChannelCode() {}

export function getDefaultChannelValue() {}

export function getDevId() {
  return Math.random() * 100;
}

export function getAppVersion() {}

export function getSN() {}

export function getAppVersionName() {}

export function getPlatformCode() {}

// eslint-disable-next-line
export function setAppType(key, description) {}

export function getAppType() {}

export function getPcode() {}
