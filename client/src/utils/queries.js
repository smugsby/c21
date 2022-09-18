import{gql} from "@apollo/client";
export const refreshUser = gql`
query currentUser {
    currentUser{
        _id
        email
        username
        savedBooks {
            bookId
            authors
            title
            description
            image
            link    
        }
    }
}
`;