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

export const GET_QUEUE_SUBSCRIPTION = gql`
subscription subQueue($id: String!) {
  page: queue(page: $id) {
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


export const GET_QUEUE_PAGE_CONFIG = gql`
query getQueuePageConfig($id: String!) {
  page: queuePage(id: $id) {
    title
    queues {
      id
      title
    }
  }
}`;

export const GET_QUEUE_CONFIG = gql`
query getQueueConfig($id: String!) {
  queue: queue(id: $id) {
    id
    title
    description
    admins {
      id
      name
    }
    config {
      waitTime
      questionsAsked
      signedOn
    }
  }
}`;

export const NEW_QUEUE_PAGE = gql`
mutation newQueuePage($title: String!) {
  newQueuePage(title: $title) {
    id
  }
}
`;

export const ADD_ADMIN = gql`
mutation addAdmin ($user: String!, $queue: String!) {
  addAdmin (queue: $queue, user: $user)
}
`;

export const REMOVE_ADMIN = gql`
mutation removeAdmin ($user: String!, $queue: String!) {
  removeAdmin (queue: $queue, user: $user)
}
`;

export const UPDATE_QUEUE_CONFIG = gql`
mutation configureQueue($id: String!, $title: String, $description: String, $signedOn: Int, $questionsAsked: Int, $waitTime: Int) {
  configureQueue(id: $id, title: $title, description: $description, signedOn: $signedOn, questionsAsked: $questionsAsked, waitTime: $waitTime) {
    id
  }
}
`;

