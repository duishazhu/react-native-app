import { createStyle } from 'styles/theme';

export const styles = createStyle({
  emptyWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyImg: {
    width: 60,
    height: 60,
  },
  emptyText: {
    fontSize: 13,
    marginTop: 12,
    color: 'rgba(153, 153, 153, 1)',
  },
  linkWrap: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: '$primaryColor',
  },
});
