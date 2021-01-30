const queries = {
    getUsers: `query getUsers {
        getUsers {
          id
          firstName
          stateOfResidence
        }
      }`,
    delete: `mutation deleteUser($userId: ID!) {
        deleteUser(userId: $userId) {
          data
        }
      }`,
    update: `mutation updateItem($userId: ID!, $firstName: String!, $stateOfResidence: String!) {
        updateItem(userId: $userId, firstName: $firstName, stateOfResidence: $stateOfResidence) {
          data
        }
      }`,
    create: `mutation createUser($id: ID!, $firstName: String!, $stateOfResidence: String!) {
        createUser(userId: $id, firstName: $firstName, stateOfResidence: $stateOfResidence) {
          id
          firstName
          stateOfResidence
        }
      }`
}

const getQueryObj = (type, variables) => {
    switch (type) {
        case "getUsers":
            return {
                query: queries.getUsers
            }
        case "delete":
            return {
                query: queries.delete,
                variables
            }
        case "update":
            return {
                query: queries.update,
                variables
            }
        case "create":
            return {
                query: queries.create,
                variables
            }
    }
}

export const callQuery = async (type, variables) => {
    // get query to be called
    const queryToCall = getQueryObj(type, variables)

    // call API and return response data
    try {
        const req = await fetch('https://7e5c5nsvczarlh7aguuoe3trgi.appsync-api.us-east-2.amazonaws.com/graphql', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-api-key': 'da2-gaiuwdcqhvf5vgolj2rhv4ujvu'
            },
            body: JSON.stringify(queryToCall)
        })
        const res = await req.json()
        return res
    } catch (error) {
        return error
    }
}