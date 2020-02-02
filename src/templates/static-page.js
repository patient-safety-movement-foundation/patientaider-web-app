/* eslint-disable react/no-danger */
import PropTypes from 'prop-types';
import marked from 'marked';
import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';

export default class Template extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { html: '' };
  }

  componentDidMount() {
    this.setLanguage();
  }

  componentDidUpdate() {
    this.setLanguage();
  }

  setLanguage() {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      this.setState({
        // eslint-disable-next-line
        html: this.props.data.markdownRemark.frontmatter[
          searchParams.get('lang') || 'en'
        ],
      });
    }
  }

  render() {
    const { html } = this.state;
    const { data } = this.props;
    const { markdownRemark } = data; // data.markdownRemark holds our post data
    const { frontmatter } = markdownRemark;
    return (
      <Layout
        location={{
          pathname: markdownRemark.frontmatter.path,
        }}
      >
        <div className="blog-post-container">
          <div className="blog-post">
            <h1>{frontmatter.title}</h1>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: marked(html) }}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

Template.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        en
        es
        zh
        ar
      }
    }
  }
`;
