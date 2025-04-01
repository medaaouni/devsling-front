import {ApolloClientOptions, InMemoryCache} from '@apollo/client';
import { HttpLink } from 'apollo-angular/http';
import {inject} from '@angular/core';
import {environment} from '../environments/environment';


export function createApollo(): ApolloClientOptions<any> {
  const httpLink = inject(HttpLink);

  return {
    link: httpLink.create({
      uri: environment.GRAPHQL_BASE_URL
    }),
    cache: new InMemoryCache(),
  };
}

