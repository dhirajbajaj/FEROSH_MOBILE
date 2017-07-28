// @flow
import type { State, Todo } from '../../common/types';
import React from 'react';
import { ScrollView } from 'react-native';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { Box, Button, Loading } from '../../common/components';
import { graphql } from 'react-apollo';
import Checkbox from './Checkbox';
import gql from 'graphql-tag';
import { setCategoryFilter } from '../../common/new/actions';

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
      }
    }
  }
`;

const withData = graphql(CATEGORIES_QUERY, {
  props: ({ data: { loading, categories: { categories } = [] } }) => ({
    loading,
    categories,
  }),
});

const Categories = ({ categories, loading, setCategoryFilter, newFilter }: CategoriesProps) => {
  if (loading) {
    return <Loading />;
  }
  return (
    <Box height={2} borderBottomWidth={1} borderBottomColor="#9f9f9f">
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
    </Box>
  );
};

const CategoriesWithData = withData(Categories);

export default connect(
  state => ({
    newFilter: state.newFilter,
  }),
  { setCategoryFilter },
)(CategoriesWithData);