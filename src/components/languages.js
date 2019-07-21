import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';
import { Link } from 'gatsby';

export default function Languages({ location }) {
  return (
    <div>
      <Link
        to={`${location.pathname}?${qs.stringify({
          ...qs.parse(location.search, {
            ignoreQueryPrefix: true,
          }),
          lang: 'en',
        })}`}
      >
        <small>English</small>
      </Link>
      {' - '}
      <Link
        to={`${location.pathname}?${qs.stringify({
          ...qs.parse(location.search, {
            ignoreQueryPrefix: true,
          }),
          lang: 'es',
        })}`}
      >
        <small>Spanish</small>
      </Link>
      {' - '}
      <Link
        to={`${location.pathname}?${qs.stringify({
          ...qs.parse(location.search, {
            ignoreQueryPrefix: true,
          }),
          lang: 'zh',
        })}`}
      >
        <small>Chinese - Traditional</small>
      </Link>
    </div>
  );
}

Languages.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line
};
