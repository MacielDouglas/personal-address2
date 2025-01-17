const userTypeDef = `#graphql

type Comment {
    cardId: ID!  
    text: String!   
}

type Address {
    id: ID!
    street: String!
    number: String!
    neighborhood: String
    city: String!
    gps: String
    complement: String
    userId: String!
    type: String!
    photo: String
    confirmed: Boolean!
    active: Boolean!
    visited: Boolean
}

type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    profilePicture: String!
    isAdmin: Boolean!
    group: String!
    isSS: Boolean!
    isSCards: Boolean!
    myCards: [CardAssociation]
    myTotalCards: [CardAssociation]
    comments: [Comment] 
    idToken: String
}

type CardAssociation {
    cardId: ID!
    date: String!
}

type CardWithStreet {
    id: ID!
    number: Int
    startDate: String
    endDate: String
    streets: [Address]
}

type UserSummary {
    id: ID!
    name: String!
    group: String
}

type Query {
    user(action: String!, id: ID, email: String, password: String, group: String): UserResponse
    getUsers: UsersResponse
    firebaseConfig: EncryptedConfig
}

type Mutation {
    userMutation(action: String!, user: NewUserInput, id: ID, updateUserInput: UpdateUserInput, idToken: String): UserMutationResponse!
}

type UserResponse {
    user: User
    success: Boolean
    message: String
}

type UsersResponse {
    users: [UserSummary]
    success: Boolean!
    message: String
}

type UserMutationResponse {
    success: Boolean!
    message: String
    user: User
}

input UpdateUserInput {
    name: String
    group: String
}

input NewUserInput {
    name: String!
    email: String!
    password: String!
    profilePicture: String!
    isAdmin: Boolean
    group: String
    isSS: Boolean
}

type EncryptedConfig {
  encryptedData: String
}
`;

export default userTypeDef;
