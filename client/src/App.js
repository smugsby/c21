import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { setContext } from '@apollo/client/link/context';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
const http = createHttpLink({
  uri: "/graphql"
})
const auth = setContext((_, headers)=>{
  const token = localStorage.getItem("id_token");
  return {headers:{
    ...headers, authorization: `Bearer ${token}`
  }}
})
const apolloclient = new ApolloClient({
  link: auth.concat(http),
  cache: new InMemoryCache()
})
function App() {
  return (
    <ApolloProvider client = {apolloclient}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
