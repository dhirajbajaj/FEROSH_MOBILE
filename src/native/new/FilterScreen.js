// @flow
import type { State, Todo } from '../../common/types';
import React from 'react';
import { FlatList } from 'react-native';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { stringBoDau } from '../../common/lib/string';
import { Subject } from 'rxjs/Subject';
import { Box, Text, Loading, TextInput } from '../../common/components';
import { withApollo } from 'react-apollo';
import Checkbox from './Checkbox';
import FilterTableView from './FilterTableView';
import gql from 'graphql-tag';
import { setCategoryFilter } from '../../common/new/actions';
import { setBrands, setFilterTableData, setDesigners } from '../../common/data/actions';
import Icon from 'react-native-vector-icons/Ionicons';
import { compose, isEmpty, prop, reverse, sortBy, filter, where, contains, last } from 'ramda';

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

const DESIGNERS_QUERY = gql`
  query DESIGNERS_QUERY {
    designers {
      users {
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
  designers,
  setBrands,
  setDesigners,
  setFilterTableData,
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

  const runDesignersQuery = () => {
    client
      .query({
        query: DESIGNERS_QUERY,
      })
      .then(data => {
        const { data: { designers: { users } = [] } } = data;
        setDesigners(users);
        setFilterTableData(categories.concat(users));
      })
      .catch(err => {
        console.log('catch', err);
      });
  };

  if (!brands || brands.length === 0) {
    console.log('request brands');
    runQuery();
  }

  if (!designers || designers.length === 0) {
    console.log('request designers');
    runDesignersQuery();
  }

  if (loading) {
    return <Loading />;
  }

  const onSubmitEditing = event => {
    console.log('onSubmitEditing', event, event.nativeEvent.text);
  };

  const onChangeText$ = new Subject();
  onChangeText$.debounceTime(500).subscribe(searchstring => {
    console.log('searchstring ===', searchstring);
    const str = stringBoDau(searchstring.trim());
    if (str === '') {
      setFilterTableData(categories.concat(designers));
      return;
    }
    const searchInArray = filter(
      where({
        nameBoDau: text => {
          const result = text.search(new RegExp(`(\\b${str})`));
          return result >= 0;
        },
      }),
    );

    const searchedCategories = searchInArray(categories);
    const goCategories = searchedCategories.reduce((prev, item, index, array) => {
      const lastItem = last(prev);
      if (
        (!lastItem && item.parentId !== '0') ||
        (lastItem &&
          item.parentId !== '0' &&
          item.parentId !== lastItem.parentId &&
          item.parentId !== lastItem.id)
      ) {
        prev.push(last(filter(itemFilter => itemFilter.id === item.parentId, categories)));
      }
      prev.push(item);
      return prev;
    }, []);

    setFilterTableData(goCategories.concat(searchInArray(designers)));
  });

  return (
    <Box backgroundColor="white" flexDirection="column">
      <Box
        marginVertical={0.25}
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
          // placeholder="..."
          returnKeyType="search"
          onSubmitEditing={onSubmitEditing}
          onChangeText={text => {
            onChangeText$.next(text);
          }}
          blurOnSubmit
        />
      </Box>
      <FilterTableView />
    </Box>
  );
};

export default connect(
  state => ({
    newFilter: state.newFilter,
    categories: state.data.categories,
    brands: state.data.brands,
    designers: state.data.designers,
  }),
  { setBrands, setDesigners, setCategoryFilter, setFilterTableData },
)(withApollo(FilterScreen));
