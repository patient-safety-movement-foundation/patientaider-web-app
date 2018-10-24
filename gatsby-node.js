const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local Contentful graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.
    graphql(`
      {
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
      resolve();
    });
  });
};
