import { request } from '@terminus/mall-utils';
import { CONDITION_DISPLAY_TYPE, NO_DIFF, UP_CONDITION_TYPE_DICT } from './constants';

/**
 * 更新用户信息
 * @param {*} data
 * @returns
 */
export async function updateUserInfo(data) {
  return request('/api/member/web/profile/update', {
    data,
    method: 'POST',
  });
}

/**
 * 获取权益列表通过等级
 * @param {*} data
 */
export const getRightsListByLevel = async ({ retailFormatId = 1, ownerId = 106002 }) => {
  return request('/api/member/web/level/benefit/query', {
    method: 'POST',
    data: {
      retailFormatId,
      ownerId,
      ownerTypeDict: 'LEVEL',
    },
  });
};

/**
 * 获取用户成长值信息
 * @param {*} param0
 * @returns
 */
export const getMemberGrowthValue = async ({ customerId, retailFormatId, levelTemplateId }) => {
  return request('/api/member/web/level/available/experience/find', {
    method: 'POST',
    data: {
      ownerType: 'Member',
      ownerId: customerId,
      retailFormatId,
      levelTemplateId,
    },
  });
};

/**
 * 获取付费会员权益
 * @param {*} data
 * @returns
 */
export const getPayingMemberRights = ({ retailFormatId = 1, ownerId }) => {
  return request('/api/member/web/level/benefit/query', {
    method: 'POST',
    data: {
      retailFormatId,
      ownerId,
      ownerTypeDict: 'PAID_SERVICE',
    },
  });
};

/**
 * 获取付费-服务信息
 * @returns
 */
export const getPaidServiceCode = async (retailFormatId = 1) => {
  return request('/api/member/web/profile/paid/query', {
    method: 'POST',
    data: {
      retailFormatId,
      paidServiceStatusDict: 'ENABLED',
    },
  });
};

/**
 * 获取等级列表
 * @param {*} data
 * @returns
 */
export const getLevelList = async ({ levelTemplateId }) => {
  const result = await request('/api/member/web/level/paging', {
    method: 'POST',
    data: {
      levelTemplateId: {
        value: levelTemplateId || 138002,
      },
      levelStatusDict: {
        value: 'ENABLED',
      },
      queryParams: {
        order: {
          field: 'weight',
          asc: true,
        },
      },
    },
  });
  return result;
};

const loopCondition = (condition, conditionList = []) => {
  const { head = {}, tail = {} } = condition;
  if (head?.left && head?.right) {
    const displayName = head.left?.name || UP_CONDITION_TYPE_DICT[head.left?.code];
    conditionList.push({
      title: `${displayName}${head?.right?.value}`,
      value: head.left?.code,
      current: `${displayName}${(head?.right?.value || 0) + (head?.difference || 0)}`,
      status: head?.difference === null || head?.difference === undefined ? true : !(head?.difference < 0),
    });
  }
  if (head?.head || head?.tail) {
    loopCondition(head, conditionList);
  }
  if (tail?.left && tail?.right) {
    const displayName = tail.left?.name || UP_CONDITION_TYPE_DICT[tail.left?.code];
    conditionList.push({
      title: `${displayName}${tail?.right?.value}`,
      value: tail.left?.code,
      current: `${displayName}${(tail?.right?.value || 0) + (tail?.difference || 0)}`,
      status: tail?.difference === null || tail?.difference === undefined ? true : !(tail?.difference < 0),
    });
  }
  if (tail?.head || tail?.tail) {
    loopCondition(tail, conditionList);
  }
  return conditionList;
};

/**
 * 无成长值等级升级规则
 * @returns
 */
export const getLevelUpTaskList = async ({
  customerId = 1,
  levelTemplateId = 126001,
  currentId = 116001,
  levelList = [],
}) => {
  const matchedIndex = Array.isArray(levelList) ? levelList.findIndex((l) => l?.id === currentId) : -1;
  const result = await request('/api/member/web/level/difference/query', {
    method: 'POST',
    data: {
      ownerType: 'Member',
      ownerId: customerId,
      levelId: currentId,
      levelTemplateId,
    },
  });
  const handledResult = {
    levelName: result?.nextLevel?.levelName,
    expireDate: result?.currentLevel?.expireDate,
  };
  const condition = result?.nextLevelDifference || levelList[matchedIndex]?.upCondition;
  if (condition) {
    handledResult.nextLevelDifference = condition;
    if (condition?.left && condition?.right) {
      handledResult.conditionType = CONDITION_DISPLAY_TYPE.single;
      handledResult.displayName = condition.left?.name || UP_CONDITION_TYPE_DICT[condition.left?.code];
      handledResult.displayValue = condition.left?.code;
      handledResult.value = condition.right?.value;
      handledResult.diff =
        condition?.difference === null || condition?.difference === undefined ? NO_DIFF : condition?.difference;
    } else {
      handledResult.conditionType = CONDITION_DISPLAY_TYPE.multi;
      handledResult.conditionList = loopCondition(condition);
    }
  }
  return handledResult;
};

/**
 * 查询当前登录人有效积分
 * @param {*} data
 */
export const getEffectivePoint = async () => {
  return request('/api/member/web/point/loginUser/effectivePoint/query', {
    method: 'POST',
  });
};
