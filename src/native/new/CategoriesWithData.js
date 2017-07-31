// @flow
import type { State, Todo } from '../../common/types';
import React from 'react';
import { ScrollView } from 'react-native';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { Box, Button, Loading } from '../../common/components';
import { withApollo } from 'react-apollo';
import Checkbox from './Checkbox';
import gql from 'graphql-tag';
import { setCategoryFilter } from '../../common/new/actions';
import { setCategories } from '../../common/data/actions';

type CategoriesProps = {
  categories: Array<Object>,
  loading: boolean,
};

const CATEGORIES_QUERY = gql`
  query CATEGORIES_QUERY {
    categories {
      categories {
        id
        name
        parentId
      }
    }
  }
`;

const Categories = ({
  categories,
  loading,
  setCategoryFilter,
  newFilter,
  client,
  setCategories,
  ...props
}: CategoriesProps) => {
  const runQuery = () => {
    client
      .query({
        query: CATEGORIES_QUERY,
      })
      .then(data => {
        const { data: { categories: { categories } = [] } } = data;
        setCategories(categories);
      })
      .catch(err => {
        console.log('catch', err);
      });
  };

  if (!categories || categories.length === 0) {
    console.log('request categories');
    runQuery();
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <Box height={4} {...props} backgroundColor="white" flexDirection="column">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map(category =>
          <Checkbox
            marginHorizontal={0.5}
            marginVertical={0.5}
            key={category.id}
            onPress={() => setCategoryFilter(category.id)}
            title={category.name.toUpperCase()}
            checked={!!(newFilter.categories && newFilter.categories.indexOf(category.id) !== -1)}
          />,
        )}
      </ScrollView>
      <Box
        height={2}
        borderTopWidth={1}
        borderTopColor="#9f9f9f"
        borderBottomWidth={1}
        borderBottomColor="#9f9f9f"
        alignItems="flex-end"
      >
        <Button width={4}>Chon</Button>
      </Box>
    </Box>
  );
};

export default connect(
  state => ({
    newFilter: state.newFilter,
    categories: state.data.categories,
  }),
  { setCategoryFilter, setCategories },
)(withApollo(Categories));
