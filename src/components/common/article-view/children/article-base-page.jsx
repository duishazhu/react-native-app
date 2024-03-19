import React from 'react';
import { Loading } from '@terminus/nusi-mobile';

import BasePage from 'common/base-page';
import Article from 'common/article-view/children/article';

import defaultStyle from 'common/article-view/style';
import emptyImg from 'images/common/empty.png';
import { Empty } from 'common/empty';

export default function ArticleBasePage(props) {
  const { loading, data = {}, headTitle = null, articleStatus } = props;

  return (
    <BasePage title={headTitle} style={defaultStyle.container}>
      <Loading toast visible={loading} />
      {articleStatus === 'DISABLED' ? (
        <Empty imgOpt={{ img: emptyImg, width: 119, height: 87 }} emptyLabel="该文章已下架" />
      ) : (
        <Article {...props} data={data} />
      )}
    </BasePage>
  );
}
