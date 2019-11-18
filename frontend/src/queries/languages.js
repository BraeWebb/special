import gql from 'graphql-tag'

export const GET_LANGUAGES = gql`
query getLanguages {
  languages {
    value: id
    text: name
  }
}`;
