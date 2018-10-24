module.exports = {
  pathPrefix: '/patientaider-web-app',
  siteMetadata: {
    title: 'PatientAider',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `xbvvg00rroa3`,
        accessToken: `65cb8df68f03a23c901de20bbc878395c6e1db8908ad454f6d857ff8bd6288d4`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'patientaider',
        start_url: '/',
        display: 'minimal-ui',
        icon: 'src/images/patientaider.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
