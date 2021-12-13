export const schema = gql`
    type Team {
        id: Int!
        name: String!
        teamMembers: [TeamMember]!
    }
`;
