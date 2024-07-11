const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({req, res, next}) {
    // allows token to be sent via  req.query or headers
    let token = req?.query?.token || req?.headers?.authorization || req?.body?.token;
    // ["Bearer", "<tokenvalue>"]
    if (req?.headers?.authorization) {
      console.log("token before split")
      token = token.split(' ').pop().trim();
      
    }
    if (!token) {
      return req;
    }

    // if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      console.log(data);
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    // return the request object so it can be passed to the resolver as `context`
    return req;

    // send to next endpoint
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    console.log("token?", payload);
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
