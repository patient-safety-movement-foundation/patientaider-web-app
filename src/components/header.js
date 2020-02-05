import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import qs from 'qs';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';

import logoEnglish from '../images/patientaider-logomark.png';
import logoArabic from '../images/patientaider-logomark-ar.png';
import logoChinese from '../images/patientaider-logomark-zh.png';
import info from '../images/icons/info.svg';
import arrowLeft from '../images/icons/arrow-left.svg';
import arrowRight from '../images/icons/arrow-right.svg';

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

const Back = styled.button`
  background: transparent;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  outline: none;
`;

function logo(language) {
  const logoMap = {
    en: logoEnglish,
    es: logoEnglish,
    zh: logoChinese,
    ar: logoArabic,
  };

  return logoMap[language];
}

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setHistory();
  }

  componentDidUpdate() {
    this.setHistory();
  }

  setHistory() {
    if (typeof window !== 'undefined') {
      this.setState({
        historyLength: window.history.length,
      });
    }
  }

  render() {
    const { location } = this.props;
    const { historyLength } = this.state;

    const language =
      qs.parse(location.search, {
        ignoreQueryPrefix: true,
      }).lang || 'en';

    return (
      <Wrapper>
        <If condition={historyLength > 2 && location.pathname !== '/'}>
          <Back onClick={() => window.history.back()}>
            <img src={language === 'ar' ? arrowRight : arrowLeft} alt="back" />
          </Back>
        </If>
        <Link
          to={`/${qs.stringify(
            {
              lang: qs.parse(location.search, {
                ignoreQueryPrefix: true,
              }).lang,
            },
            { addQueryPrefix: true },
          )}`}
        >
          <img
            key={language}
            src={logo(language)}
            height="24px"
            alt="PatientAider"
          />
        </Link>
        <Icons>
          <Link
            to={`/info${qs.stringify(
              {
                lang: qs.parse(location.search, {
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
  }
}

Header.propTypes = {
  location: PropTypes.object.isRequired, // eslint-disable-line
};

export default Header;
