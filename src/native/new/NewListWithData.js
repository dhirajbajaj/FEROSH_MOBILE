import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import NewList from './NewList';
import Loading from '../../common/components/Loading';

class NewListWithData extends React.Component {
  constructor() {
    super();
    this.offset = 0;
  }

  render() {
    const { filter, loading, products, fetchMore } = this.props;
    console.log('data ========');
    console.log(this.props);
    if (loading) {
      return <Loading />;
    }
    return <NewList entries={products || []} onLoadMore={fetchMore} />;
  }
}

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
const ITEMS_PER_PAGE = 10;
const withData = graphql(PRODUCTS_QUERY, {
  options: props => ({
    variables: {
      // filter: (props.params && props.params.filter && props.params.filter.toUpperCase()) || null,
      offset: 0,
      limit: ITEMS_PER_PAGE,
    },
    fetchPolicy: 'cache-and-network',
  }),
  props: ({ data: { loading, products, fetchMore } }) => ({
    loading,
    products,
    fetchMore: () =>
      fetchMore({
        variables: {
          offset: products.length,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          return Object.assign({}, prev, {
            products: [...prev.products, ...fetchMoreResult.products],
          });
        },
      }),
  }),
});

export default withData(NewListWithData);
