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
exports.createPages = ({actions, graphql}) =>{
    console.log(actions, graphql)
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
        return getArticles;
};