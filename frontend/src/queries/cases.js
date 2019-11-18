import gql from 'graphql-tag'

export const GET_CASE = gql`
query getCase($number: Int!, $report: String!) {
  item: case(report:$report, id:$number) {
    number
    lines
    status
    report {
      id
      title
    }
    student1 {
      id
      percent
      script
    }
    student2 {
      id
      percent
      script
    }
  }
}`;
