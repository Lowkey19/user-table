import React from 'react';

import UserTable from './components/UserTable';
import UserContext from './providers/users';
import { useUser } from './api/user';

function App() {
  const [user, userDispatch] = useUser();

  return (
    <UserContext.Provider value={{ store: { ...user }, dispatch: userDispatch }}>
      <UserTable />
    </UserContext.Provider>
  );
}

export default App;
