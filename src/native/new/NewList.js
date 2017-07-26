// @flow
import Checkbox from './Checkbox';
import React from 'react';
import productsMessages from '../../common/newList/productsMessages';
import { Box, TextInput } from '../../common/components';
import { FormattedMessage } from 'react-intl';
import { Image, StyleSheet, FlatList, Text, Dimensions, ActivityIndicator } from 'react-native';
import { isEmpty } from 'ramda';

const screenSize = Dimensions.get('window');
const ProductItem = ({ product, toggleProductCompleted }) =>
  <Box
    backgroundColor="primary"
    marginTop={0.5}
    // marginHorizontal={0.5}
    height={5}
    style={() => ({
      width: screenSize.width / 2,
    })}
  >
    <Checkbox
      alignItems="center"
      checked={product.completed}
      height={2}
      marginVertical={0}
      onPress={() => toggleProductCompleted(product)}
      width={2}
    />
    <TextInput editable={false} flex={1} height={2} marginHorizontal={0.5} value={product.title} />
  </Box>;

const IsEmpty = () =>
  <Box alignItems="center" justifyContent="center" flex={1}>
    <Image source={require('./img/EmptyState.png')} />
    <FormattedMessage {...productsMessages.empty}>
      {message =>
        <Text bold color="gray" marginTop={1} size={1}>
          {message}
        </Text>}
    </FormattedMessage>
  </Box>;

type NewListProps = {
  data: Object,
  onLoadMore: Function,
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const NewList = ({ data, onLoadMore }: NewListProps) => {
  if (data.networkStatus === 1) {
    return <ActivityIndicator />;
  }

  if (data.error) {
    return (
      <Text>
        Error: {data.error.message}
      </Text>
    );
  }

  if (!data.products || isEmpty(data.products.products)) {
    return <IsEmpty />;
  }

  // const sortedProducts = compose(
  //   reverse,
  //   sortBy(prop('createdAt')),
  //   values, // object values to array
  // )(products);

  return (
    <FlatList
      data={data.products.products}
      refreshing={data.networkStatus === 4}
      onRefresh={() => data.refetch()}
      onEndReachedThreshold={0.5}
      onEndReached={onLoadMore}
      renderItem={product => <ProductItem product={product} key={product.id} />}
    />
  );
};

export default NewList;
