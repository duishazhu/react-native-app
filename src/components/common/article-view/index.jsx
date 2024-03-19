import React, { useEffect, useState } from 'react';
import _get from 'lodash/get';

import ArticleBasePage from 'common/article-view/children/article-base-page';
import { formatHtmlString } from 'common/helper';
// import { NavigationService } from '@terminus/react-navigation';

export default function ArticleView(props) {
  const { articleId, getArticle = () => {} } = props;
  const [loading, setLoading] = useState(false);
  const [articleStatus, setArticleStatus] = useState('');
  const [data, setData] = useState({});
  useEffect(() => {
    if (articleId && articleId !== 'undefined') {
      setLoading(true);
      getArticle(articleId)
        .then((res) => {
          setArticleStatus(res.articleStatus);
          const content = formatHtmlString(_get(res, 'content') || '');
          setData({ ...res, content });
          setLoading(false);
        })
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articleId]);

  return <ArticleBasePage loading={loading} data={data} articleStatus={articleStatus} {...props} />;
}
