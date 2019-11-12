import gql from 'graphql-tag'

export const ALL_REPORTS = gql`
query {
  reports {
    id
    title
    generator {
      name
    }
    status
    request {
      url
    }
  }
}`;

export const GET_REPORT = gql`
query getReport($id: String!) {
  report(id: $id) {
    id
    title
    generator {
      name
    }
    status
    request {
      url
    }
    cases {
      lines
    }
  }
}`;
