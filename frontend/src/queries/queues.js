import gql from 'graphql-tag'

export const ALL_QUEUE_PAGES = gql`
query {
  pages: queuePages {
    id
    title
    owner {
      name
    }
  }
}`;

export const GET_QUEUE = gql`
query getQueue($id: String!) {
  page: queuePage(id: $id) {
    title
    queues {
      title
      description
      waiting {
        user {
          name
        }
        joined
      }
    }
  }
}`;
