/* eslint-disable react/no-danger */
import externalLinks from 'remark-external-links';
import html from 'remark-html';
import parseToMarkdown from 'remark-parse';
import PropTypes from 'prop-types';
import React from 'react';
import numbered from 'remark-numbered-footnotes';
import styled from 'styled-components';
import unified from 'unified';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import languageCodes from '../lib/language-codes';

const slug = require('slug');

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;

  img {
    max-width: 100%;
  }

  img.hero {
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }

  sup a:after {
    content: ', ';
  }

  * sup:last-child a {
    &:after {
      content: '';
    }
  }

  &:focus {
    background: red;
  }

  .footnotes {
    font-size: 0.75rem;

    p {
      display: inline;
    }

    a {
      word-break: break-all;
    }
  }
`;

function friendlyName(code) {
  switch (code) {
    case 'en-US':
      return 'English';
    case 'es-419':
      return 'Spanish';
    case 'zh-Hant-TW':
      return 'Chinese';
    case 'ar-SA':
      return 'Arabic';
    default:
      return '';
  }
}

class Topic extends React.Component {
  componentDidMount() {
    window.postMessage(
      JSON.stringify({
        componentDidMount: 'Topic',
      }),
      '*',
    );
  }

  render() {
    const { data, location, pageContext, ...rest } = this.props;
    return (
      <Layout location={location} {...rest} showLanguages={false}>
        <Wrapper>
          <If condition={data.contentfulTopic.hero}>
            <img
              src={data.contentfulTopic.hero.file.url}
              className="hero"
              alt={data.contentfulTopic.title}
            />
          </If>
          <div>
            <h2>{data.contentfulTopic.title}</h2>
            <div
              dangerouslySetInnerHTML={{
                __html: unified()
                  .use(parseToMarkdown, {
                    commonmark: true,
                    footnotes: true,
                  })
                  .use(numbered)
                  .use(externalLinks, {
                    target: '_blank',
                    rel: ['noopener', 'noreferrer'],
                  })
                  .use(html)
                  .processSync(data.contentfulTopic.content.content),
              }}
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <For each="translation" of={pageContext.translations}>
              <small>
                <a
                  href={`/${
                    languageCodes[translation.node.node_locale]
                  }/topic/${slug(data.contentfulTopic.slug)}`}
                >
                  {friendlyName(translation.node.node_locale)}
                </a>{' '}
              </small>
            </For>
          </div>
        </Wrapper>
      </Layout>
    );
  }
}

export const query = graphql`
  query($id: String!) {
    contentfulTopic(id: { eq: $id }) {
      title
      content {
        content
      }
      hero {
        file {
          url
          fileName
          contentType
        }
      }
      slug
    }
  }
`;

/* eslint-disable */
Topic.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    translations: PropTypes.string,
  }),
};
/* eslint-enable */

export default Topic;
