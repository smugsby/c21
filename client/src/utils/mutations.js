import { gql } from "@apollo/client";
export const login_user = gql`
mutation login ($email: String, $password: String) {
login(email: $email, password: $password) {
    token
    user {
        _id
        username
    }
}
}
`;

export const add_user = gql`
mutation addUser ($username: String!, $email: String!, $password: String!) {
    addUser(username: $username , email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
} 
`;

export const add_book = gql`
mutation addBook ($bookId: String!, $title: String!, $authors: [ String ]!, $description: String, $image: String, $link: String) {
    addBook (bookId: $bookId, title: $title, authors: $authors, description: $description, image: $image, link: $link) {
    username
    savedBooks {
        bookId
        title
        authors
        description
        image
        link
    }
    }
} 
`;
export const delete_book = gql`
mutation deleteBook ($bookId: String) {
    deleteBook (bookId: $bookId) {
        username
        savedBooks {
            bookId
            title
            authors
            description
            image
            link
        }
    }
} 
`;
