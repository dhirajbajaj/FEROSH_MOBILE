// @flow
import type { State, Todo } from '../../common/types';
import React from 'react';
import { ScrollView } from 'react-native';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { Box, Button, Loading } from '../../common/components';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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

const Categories = ({ categories, loading }: CategoriesProps) => {
  console.log('categories ===');
  console.log(categories);
  if (loading) {
    return <Loading />;
  }
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map(category =>
        <Button marginHorizontal={0.5} key={category.id}>
          {category.name}
        </Button>,
      )}
    </ScrollView>
  );
};

const CategoriesWithData = withData(Categories);

export default connect((state: State) => ({
  // categories: state.categories.all,
}))(CategoriesWithData);
