// @flow
import type { State, Todo } from '../../common/types';
import React from 'react';
import { ScrollView } from 'react-native';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { values } from 'ramda';
import { Box, Button, Loading, Image, TextInput } from '../../common/components';
import { withApollo } from 'react-apollo';
import Checkbox from './Checkbox';
import gql from 'graphql-tag';
import { setCategoryFilter } from '../../common/new/actions';
import { setBrands } from '../../common/data/actions';
import Icon from 'react-native-vector-icons/Ionicons';

type FilterScreenProps = {
  categories: Array<Object>,
  loading: boolean,
};

const BRAND_QUERY = gql`
  query BRAND_QUERY {
    brands {
      brands {
        id
        name
      }
    }
  }
`;

const FilterScreen = ({
  categories,
  setCategoryFilter,
  loading,
  newFilter,
  client,
  brands,
  setBrands,
  ...props
}: FilterScreenProps) => {
  const runQuery = () => {
    client
      .query({
        query: BRAND_QUERY,
      })
      .then(data => {
        const { data: { brands: { brands } = [] } } = data;
        setBrands(brands);
      })
      .catch(err => {
        console.log('catch', err);
      });
  };

  if (!brands || brands.length === 0) {
    console.log('request brands');
    runQuery();
  }
  if (loading) {
    return <Loading />;
  }

  const onSubmitEditing = event => {
    console.log('onSubmitEditing', event, event.nativeEvent.text);
  };
  const onChangeText = text => {
    console.log('onChangeText', text);
  };
  return (
    <Box height={4} {...props} backgroundColor="white" flexDirection="column">
      <Box
        marginTop={0.25}
        marginHorizontal={0.25}
        height={2}
        flexDirection="row"
        borderWidth={1}
        borderColor="gray"
        alignItems="center"
      >
        <Icon style={{ marginLeft: 6 }} name="ios-search" size={32} color="black" />
        <TextInput
          flex={1}
          marginHorizontal={0.25}
          autoCapitalize="none"
          autoCorrect={false}
          disabled={false}
          placeholder="..."
          returnKeyType="search"
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          blurOnSubmit
        />
      </Box>
      <Box>
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
    brands: state.data.brands,
  }),
  { setBrands, setCategoryFilter },
)(withApollo(FilterScreen));
