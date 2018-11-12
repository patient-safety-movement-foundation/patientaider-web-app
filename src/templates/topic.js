/* eslint-disable react/no-danger */
import html from 'remark-html';
import parseToMarkdown from 'remark-parse';
import PropTypes from 'prop-types';
import React from 'react';
import numbered from 'remark-numbered-footnotes';
import styled from 'styled-components';
import unified from 'unified';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

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
  }
`;

class Topic extends React.Component {
  componentDidMount() {
    if (
      window.injectedJavaScript &&
      typeof window.injectedJavaScript === 'function'
    ) {
      window.injectedJavaScript();
    }
  }

  render() {
    const { data } = this.props;
    return (
      <Layout>
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
                  .use(parseToMarkdown, { commonmark: true, footnotes: true })
                  .use(numbered)
                  .use(html)
                  .processSync(data.contentfulTopic.content.content),
              }}
            />
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
    }
  }
`;

Topic.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line
};

export default Topic;
