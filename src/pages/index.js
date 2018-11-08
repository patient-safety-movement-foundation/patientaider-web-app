import { graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';

import Layout from '../components/layout';
import livingRoom from '../images/illustrations/living-room.svg';
import hospitalRoom from '../images/illustrations/hospital-room.svg';
import bedroom from '../images/illustrations/bedroom.svg';

const Helper = styled.div`
  display: flex;
  flex-direction: column;

  ul {
    list-style-type: none;
    margin: 0 0 1rem;
    padding: 0;
  }

  ul li {
    h4 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 0 0 2rem;
      padding: 1rem;
      box-shadow: 0 2px 1.5rem 0 rgba(0, 0, 0, 0.25);
      border-radius: 0.85rem;
      min-height: 10rem;
    }

    a {
      text-shadow: 2px 2px 12px rgba(0, 0, 0, 0.25);
      display: flex;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      text-decoration: none;

      svg {
        height: 4rem;
        width: auto;
      }

      svg path,
      rect {
        fill: #fff;
      }
    }
  }
`;

const Small = styled.small`
  display: inline-block;
  border: 1px solid rgb(0, 87, 184);
  border-radius: 4px;
  padding: 0.5rem;
  opacity: 0.8;
  margin: 0 auto;

  a {
    display: block;
    text-decoration: none;
  }
`;

const Index = () => (
  <Layout>
    <h3>Where is the patient?</h3>
    <Helper>
      <ul>
        <li>
          <Link to="/topics?category=before-the-hospital">
            <h4
              style={{
                background:
                  'linear-gradient(to top left, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0)), rgb(0, 169, 224)',
              }}
            >
              At home, preparing
              <SVG src={livingRoom} />
            </h4>
          </Link>
        </li>
        <li>
          <Link to="/topics?category=in-the-hospital">
            <h4
              style={{
                background:
                  'linear-gradient(to top left, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0)), rgb(108, 194, 74)',
              }}
            >
              In the hospital
              <SVG src={hospitalRoom} />
            </h4>
          </Link>
        </li>
        <li>
          <Link to="/topics?category=after-the-hospital">
            <h4
              style={{
                background:
                  'linear-gradient(to top left, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0)), rgb(0, 37, 84)',
              }}
            >
              At home, recovering
              <SVG src={bedroom} />
            </h4>
          </Link>
        </li>
      </ul>

      <Small>
        <Link to="/topics?category=all">
          I don’t know, I’m just browsing...
        </Link>
      </Small>
      <br />
      <br />
      <br />
    </Helper>
  </Layout>
);

export const data = graphql`
  query {
    contentfulTopic {
      categories
    }
  }
`;

export default Index;
