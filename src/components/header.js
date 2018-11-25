import { Link } from 'gatsby';
import React from 'react';
import qs from 'qs';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';

import logo from '../images/patientaider-logomark.png';
import info from '../images/icons/info.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
`;

const Icons = styled.div`
  display: flex;
  svg {
    height: 1rem;
    stroke: #7b8b8e;
  }
`;

const Header = () => (
  <Wrapper>
    <Link
      to={`/${qs.stringify(
        {
          lang: qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
          }).lang,
        },
        { addQueryPrefix: true },
      )}`}
    >
      <img src={logo} height="24px" alt="PatientAider" />
    </Link>
    <Icons>
      <Link
        to={`/info${qs.stringify(
          {
            lang: qs.parse(window.location.search, {
              ignoreQueryPrefix: true,
            }).lang,
          },
          { addQueryPrefix: true },
        )}`}
      >
        <SVG src={info} />
      </Link>
    </Icons>
  </Wrapper>
);

export default Header;
