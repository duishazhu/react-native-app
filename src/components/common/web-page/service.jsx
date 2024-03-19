import { getApiMarketingWebCampaignDetail } from 'services/member.marketing';

export function getIsShare({ campaignId, playInstanceId }) {
  return getApiMarketingWebCampaignDetail({ id: campaignId }).then((res) => {
    return !!res?.campaignPlays?.find((item) => item?.id === Number(playInstanceId))?.supportShare;
  });
}
