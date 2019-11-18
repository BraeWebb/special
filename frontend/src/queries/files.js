import gql from 'graphql-tag'

export const UPLOAD_FILE = gql`
mutation ($file: Upload!){
    uploadSubmissions(file: $file) {
        filename
    }
}`;

export const LOG_SUBSCRIPTION = gql`
subscription {
  log
}
`;
