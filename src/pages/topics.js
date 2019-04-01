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

const Filters = styled.div`
  display: flex;
  margin-bottom: 1rem;

  label {
    margin-right: 0.25rem;
  }
`;

const Label = styled.label`
  border: 1px solid #ccc;
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: baseline;

  input {
    margin-right: 0.5rem;
  }
`;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adult: true,
      pediatric: true,
      pregnancy: true,
    };
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(event) {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  }

  render() {
    const { data, location, ...rest } = this.props;
    const { adult, pregnancy, pediatric } = this.state;

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
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.get('category') === 'all') {
        return true;
      }
      return node.node.categories.includes(searchParams.get('category'));
    }

    const languageIds = {
      en: 'en-US',
      es: 'es-419',
      zh: 'zh-Hant-TW',
    };

    function filterLanguages(topic) {
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.has('lang')) {
        return topic.node.node_locale === languageIds[searchParams.get('lang')];
      }
      return topic.node.node_locale === 'en-US';
    }

    function filterTags(topic) {
      if (topic.node.tags.includes(adult ? 'adult' : undefined)) {
        return true;
      }
      if (topic.node.tags.includes(pediatric ? 'pediatric' : undefined)) {
        return true;
      }
      if (topic.node.tags.includes(pregnancy ? 'pregnancy' : undefined)) {
        return true;
      }
      return false;
    }

    return (
      <Layout location={location} {...rest}>
        <Filters>
          <Label htmlFor="adult">
            <input
              checked={adult}
              type="checkbox"
              name="adult"
              id="adult"
              value="adult"
              onChange={this.onToggle}
            />
            Adult
          </Label>
          <Label htmlFor="pediatric">
            <input
              checked={pediatric}
              type="checkbox"
              name="pediatric"
              id="pediatric"
              value="pediatric"
              onChange={this.onToggle}
            />
            Pediatric
          </Label>
          <Label htmlFor="pregnancy">
            <input
              checked={pregnancy}
              type="checkbox"
              name="pregnancy"
              id="pregnancy"
              value="pregnancy"
              onChange={this.onToggle}
            />
            Pregnancy
          </Label>
        </Filters>
        <Ul>
          <For
            each="topic"
            of={data.allContentfulTopic.edges
              .filter(filterCategories)
              .filter(filterLanguages)
              .filter(filterTags)
              .sort(sortAlphabetically)}
          >
            <li key={topic.node.id}>
              <span>
                <Link
                  to={`/topic/${topic.node.id}${qs.stringify(
                    {
                      lang: qs.parse(location.search, {
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
                    data.allFile.edges.find(
                      el => el.node.name === topic.node.icon,
                    ).node.publicURL
                  }
                />
              </If>
            </li>
          </For>
        </Ul>
      </Layout>
    );
  }
}

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
          tags
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
