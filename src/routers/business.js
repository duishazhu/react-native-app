export const businessRouterConfig = {
  Article: { screen: () => import('pages/article'), path: 'article/:articleId' },
  Activity: { screen: () => import('pages/activity'), path: 'activity' },
};

export const businessRouter = businessRouterConfig;
