import { gql, GraphQLClient } from 'graphql-request';
import type { AllPostsData, PostData } from './schema';

export const getClient = () => {
    return new GraphQLClient('https://gql.hashnode.com');
};

const myHashnodeURL = 'joeattardi.dev';

export const getAllPosts = async (): Promise<AllPostsData> => {
    const client = getClient();
    const allEdges: AllPostsData['publication']['posts']['edges'] = [];
    let hasNextPage = true;
    let cursor: string | null = null;
    let publicationId = '';
    let publicationTitle = '';

    while (hasNextPage) {
        const response: AllPostsData = await client.request(
            gql`
              query allPosts($cursor: String) {
                publication(host: "${myHashnodeURL}") {
                  id
                  title
                  posts(first: 50, after: $cursor) {
                    pageInfo {
                      hasNextPage
                      endCursor
                    }
                    edges {
                      node {
                        id
                        author {
                          name
                          profilePicture
                        }
                        title
                        subtitle
                        brief
                        slug
                        coverImage {
                          url
                          attribution
                          photographer
                        }
                        tags {
                          name
                          slug
                        }
                        publishedAt
                        readTimeInMinutes
                      }
                    }
                  }
                }
              }
            `,
            { cursor }
        );

        publicationId = response.publication.id;
        publicationTitle = response.publication.title;
        allEdges.push(...response.publication.posts.edges);
        hasNextPage = response.publication.posts.pageInfo.hasNextPage;
        cursor = response.publication.posts.pageInfo.endCursor;
    }

    return {
        publication: {
            id: publicationId,
            title: publicationTitle,
            posts: {
                pageInfo: { hasNextPage: false, endCursor: '' },
                edges: allEdges
            }
        }
    };
};

export const getPost = async (slug: string) => {
    const client = getClient();

    const data = await client.request<PostData>(
        gql`
      query postDetails($slug: String!) {
        publication(host: "${myHashnodeURL}") {
          id
          post(slug: $slug) {
            id
            author{
              name
              profilePicture
            }
            publishedAt
            title
            subtitle
            readTimeInMinutes
            content{
              html
              markdown
            }
            tags {
              name
              slug
            }
            coverImage {
              url
              attribution
              photographer
            }
          }
        }
      }
    `,
        { slug: slug }
    );

    return data.publication.post;
};
