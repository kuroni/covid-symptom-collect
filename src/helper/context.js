import React from 'react';

const AuthContext = React.createContext({
    user: null,
    userChange: () => {}
});

export default AuthContext;
