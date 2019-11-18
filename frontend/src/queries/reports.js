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

export const ALL_REPORTS_SUBSCRIPTION = gql`
subscription {
  newReports {
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
      number
      student1 {
        id
        percent
      }
      student2 {
        id
        percent
      }
      lines
    }
  }
}`;

export const GENERATE_REPORT = gql`
mutation requestReport($title: String!,
  $file: String!, $language: String!,
	$maxCases: Int, $maxMatches: Int
) {
  requestReport(
    title: $title, file: $file,
    language: $language, maxCases: $maxCases,
    maxMatches: $maxMatches
  ) {
    id
  }
}
`;
