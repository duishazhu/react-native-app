import { request } from '@terminus/mall-utils';

/**
 * 获取文章内容
 */
export function getArticle(id) {
  return request('/api/item/content/article/query', {
    method: 'GET',
    data: { id },
  });
}

/**
 * 获取文章内容
 */
export function getArticleDetails(articleId) {
  return request('/api/cms/article/detail', {
    method: 'GET',
    data: { articleId },
  });
}
