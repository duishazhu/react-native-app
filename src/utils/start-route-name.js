import { getAppVersionName } from '@terminus/react-native-appinfo';
import { AsyncStorage } from '@terminus/nusi-mobile';
import { isWeb } from 'utils/platform';
import FileManager from 'utils/file-manager';
import { forceShowGuide, forceShowPrivacy } from 'common/constants';

export default async function initialRouteName() {
  // 是否同意了隐私政策
  const agreePrivacy = isWeb ? 1 : Number(await AsyncStorage.get('agreePrivacy'));
  // 是否完成了引导
  const finishGuide = Number(isWeb ? 1 : await AsyncStorage.get('finishGuide'));

  // 该版本是否是第一次进入
  const isEnter = Number(isWeb ? 1 : await AsyncStorage.get(`version${getAppVersionName()}isEnter`));

  // 拿到缓存的广告页，如果没有则不进入广告页
  const advertisement = JSON.parse((await AsyncStorage.get('advertisement')) || '{}');

  const cachedPath = await FileManager.queryCache(advertisement?.startUpImage || '');
  const hasAdvertisement = !!cachedPath;

  // 如果未同意隐私政策，必须进入隐私政策；如果已经同意，并且从未进入过该版本，并且强制显示隐私政策，则进入隐私政策
  if (!agreePrivacy || (agreePrivacy && forceShowPrivacy && !isEnter)) {
    return 'Privacy';
  }
  // 如果未完成引导，必须进入引导；如果已经完成，并且从未进入过该版本，并且强制显示引导，则进入引导页
  if (!finishGuide || (finishGuide && forceShowGuide && !isEnter)) {
    return 'Guide';
  }
  // 如果已经进入过，并且有缓存的广告图，则显示广告页
  if (isEnter && hasAdvertisement && !isWeb) {
    return 'Advertisement';
  }
  return undefined;
}
