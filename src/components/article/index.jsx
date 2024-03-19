import React, { memo } from 'react';
import { useQuery } from '@terminus/octopus-hooks';
import { getArticleDetails } from 'article/service';

import ArticleView from 'common/article-view';

function Article() {
  const { buttons, routeName, title, articleId } = useQuery();

  return (
    <ArticleView
      buttons={buttons}
      routeName={routeName}
      headTitle={title}
      articleId={articleId}
      getArticle={getArticleDetails}
    />
  );
}

export default memo(Article);
