const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const markdownTemplate = path.resolve(`src/templates/static-page.js`);

  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local Contentful graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.
    graphql(`
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                path
              }
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
    `).then(result => {
      if (result.errors) {
        reject(result.errors);
      }

      // Create Topic pages
      const topicTemplate = path.resolve('./src/templates/topic.js');
      // We want to create a detailed page for each
      // topic node. We'll just use the Contentful id for the slug.
      result.data.allContentfulTopic.edges.forEach(({ node }) => {
        // Gatsby uses Redux to manage its internal state.
        // Plugins and sites can use functions like "createPage"
        // to interact with Gatsby.
        createPage({
          // Each page is required to have a `path` as well
          // as a template component. The `context` is
          // optional but is often necessary so the template
          // can query data specific to each page.
          path: `/topic/${node.id}/`,
          component: topicTemplate,
          context: { ...node },
        });
      });

      // Create static pages
      result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        if (node.frontmatter.path) {
          createPage({
            path: node.frontmatter.path,
            component: markdownTemplate,
            context: {}, // additional data can be passed via context
          });
        }
      });
      resolve();
    });
  });
};
