import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import NewList from './NewList';

const PRODUCTS_QUERY = gql`
  query NEW_LIST_QUERY($offset: Int, $limit: Int) {
    products(offset: $offset, limit: $limit) @connection(key: "products", filter: ["filter"]) {
      total
      offset
      size
      limit
      products {
        id
        link
        name
        price
        brand {
          id
          name
          link
        }
        media {
          link
          type
        }
      }
    }
  }
`;

const fetchMore = data =>
  data.fetchMore({
    variables: {
      offset: data.products.products.length,
    },

    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult || fetchMoreResult.products.products.length === 0) {
        return prev;
      }
      console.log('prev ====');
      console.log(prev);
      return Object.assign({}, prev, {
        products: {
          ...prev.products,
          products: [...prev.products.products, ...fetchMoreResult.products.products],
        },
      });
    },
  });

const NewListWithData = ({ data }) => <NewList data={data} onLoadMore={() => fetchMore(data)} />;

const ITEMS_PER_PAGE = 10;
const withData = graphql(PRODUCTS_QUERY, {
  options: {
    variables: {
      // filter: (props.params && props.params.filter && props.params.filter.toUpperCase()) || null,
      offset: 0,
      limit: ITEMS_PER_PAGE,
    },
    notifyOnNetworkStatusChange: true,
  },
});

export default withData(NewListWithData);
