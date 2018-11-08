import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import 'normalize.css';

import Header from './header';

const Main = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 0.5rem;
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet title={data.site.siteMetadata.title}>
          <html lang="en" />
          <script>
            {`
            (function(w, d){
              var id='embedly-platform', n = 'script';
              if (!d.getElementById(id)){
                w.embedly = w.embedly || function () { (w.embedly.q = w.embedly.q || []).push(arguments); };
                var e = d.createElement(n); e.id = id; e.async=1;
                e.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://cdn.embedly.com/widgets/platform.js';
                var s = d.getElementsByTagName(n)[0];
                s.parentNode.insertBefore(e, s);
              }
            })(window, document);
            `}
          </script>
          <link
            href="https://fonts.googleapis.com/css?family=Rubik"
            rel="stylesheet"
          />
          <style>
            {`

            * {
              box-sizing: border-box;
            }

            html {
              font-size: 16px;
            }

            body {
              font-family: 'Rubik', sans-serif;
              font-weight: 400;
              line-height: 1.45rem;
              color: #333;
              padding-bottom: 1rem;
            }

            body, html {
              height: 100%;
            }

            p {margin-bottom: 1.3em;}

            h1, h2, h3, h4 {
              margin: 1.5rem 0;
              font-weight: inherit;
              line-height: 1.2rem;
            }

            h1 {
              margin-top: 0;
              font-size: 2.074rem;
              line-height: 2rem;
            }

            h2 {font-size: 1.728rem; line-height: 2rem}

            h3 {font-size: 1.44rem;}

            h4 {font-size: 1.2rem;}

            small {font-size: 0.833rem;}
            sup {font-size: 0.578rem;}
            `}
          </style>

          <style>
            {`
              a {
                color: rgb(0, 87, 184);
              }
            `}
          </style>
        </Helmet>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Main>{children}</Main>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
