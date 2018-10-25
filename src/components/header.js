import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';

import logo from '../images/patientaider-logomark.png';
import info from '../images/icons/info.svg';
import flag from '../images/icons/flag.svg';

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
    <Link to="/">
      <img src={logo} height="24px" alt="PatientAider" />
    </Link>
    <Icons>
      <Link to="/info">
        <SVG src={info} />
      </Link>
      <SVG src={flag} />
    </Icons>
  </Wrapper>
);

export default Header;
