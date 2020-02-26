const path = require('path');

const makeRequest = (graphql, request) => new Promise((resolve,reject) =>{
    resolve(
        graphql(request).then(resp=>{
            if(resp.errors){
                reject(resp.errors)
            }
            return resp;
        })
    )
})
const queryArticle = `
    {
      allStrapiArticle {
        edges {
          node {
            id
          }
        }
      }
    }
    `
    const queryAuthors = `
    {
      allStrapiUser {
        edges {
          node {
            id
          }
        }
      }
    }
    `
exports.createPages = ({actions, graphql}) =>{
    
    const { createPage} = actions;
    const getArticles = makeRequest(graphql,queryArticle).then(resp=>{
        resp.data.allStrapiArticle.edges.forEach(({node})=>{
            createPage({
                path: `/${node.id}`,
                component: path.resolve(`src/templates/article.js`),
                context: {
                  id: node.id,
                },
            })
        })
    })
    const getAuthors = makeRequest(graphql, queryAuthors).then(result => {
    // Create pages for each user.
    result.data.allStrapiUser.edges.forEach(({ node }) => {
      createPage({
        path: `/authors/${node.id}`,
        component: path.resolve(`src/templates/author.js`),
        context: {
          id: node.id,
        },
      })
    })
  });
        return Promise.all([getArticles,getAuthors]);
};