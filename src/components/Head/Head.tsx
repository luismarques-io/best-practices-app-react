import { Helmet } from 'react-helmet-async';
import { APP_TITLE } from '../../config';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title = '', description = '' }: HeadProps = {}) => {
  return (
    <Helmet title={title ? `${title} | ${APP_TITLE}` : undefined} defaultTitle={APP_TITLE}>
      <meta name='description' content={description} />
    </Helmet>
  );
};
