import PropTypes from 'prop-types';
import qs from 'qs';
import React from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 1rem;
  }

  li a {
    text-decoration: none;
  }

  li .isvg {
    min-width: 2.5rem;
    text-align: center;
  }

  li svg {
    height: 2rem;
    width: auto;
    opacity: 0.5;

    path {
      fill: #333;
    }
  }

  .subtitle {
    opacity: 0.5;
  }
`;

function sortAlphabetically(a, b) {
  const nameA = a.node.title.toLowerCase();
  const nameB = b.node.title.toLowerCase();
  if (nameA < nameB)
    // sort string ascending
    return -1;
  if (nameA > nameB) return 1;
  return 0; // default return value (no sorting)
}

function filterCategories(node) {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get('category') === 'all') {
    return true;
  }
  return node.node.categories.includes(searchParams.get('category'));
}

const languageIds = {
  en: 'en-US',
  es: 'es-419',
};

function filterLanguages(topic) {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.has('lang')) {
    return topic.node.node_locale === languageIds[searchParams.get('lang')];
  }
  return true;
}

const Index = ({ data, location }) => (
  <Layout location={location}>
    <Ul>
      <For
        each="topic"
        of={data.allContentfulTopic.edges
          .filter(filterCategories)
          .filter(filterLanguages)
          .sort(sortAlphabetically)}
      >
        <li key={topic.node.id}>
          <span>
            <Link
              to={`/topic/${topic.node.id}${qs.stringify(
                {
                  lang: qs.parse(window.location.search, {
                    ignoreQueryPrefix: true,
                  }).lang,
                },
                { addQueryPrefix: true },
              )}`}
            >
              {topic.node.title}
            </Link>
            <br />
            <span className="subtitle">{topic.node.subtitle}</span>
          </span>
          <If condition={topic.node.icon}>
            {/* todo: catcherrorboundary */}
            <SVG
              src={
                data.allFile.edges.find(el => el.node.name === topic.node.icon)
                  .node.publicURL
              }
            />
          </If>
        </li>
      </For>
    </Ul>
  </Layout>
);

export const q = graphql`
  query {
    allFile(filter: { extension: { eq: "svg" } }) {
      edges {
        node {
          publicURL
          name
        }
      }
    }
    allContentfulTopic {
      edges {
        node {
          id
          icon
          title
          subtitle
          categories
          node_locale
        }
      }
    }
  }
`;

Index.propTypes = {
  data: PropTypes.object.isRequired, // eslint-disable-line
  location: PropTypes.object.isRequired, // eslint-disable-line
};

export default Index;
