import React from 'react';

const AuthContext = React.createContext({
    policy: null,
    policyChange: () => {}
});

export default AuthContext;
