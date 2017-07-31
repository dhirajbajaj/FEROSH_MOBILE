// @flow
import React from 'react';
// import productsMessages from '../../common/new/productsMessages';
import { Box, Text, Image, Loading } from '../../common/components';
import { FormattedNumber } from 'react-intl';
import { FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { isEmpty } from 'ramda';
import { Subject } from 'rxjs/Subject';
import { SearchBar } from 'react-native-elements';
import CategoriesWithData from './CategoriesWithData';
import * as Animatable from 'react-native-animatable';

const screenSize = Dimensions.get('window');
const ProductItem = ({ product }) =>
  <Box
    backgroundColor="white"
    flexDirection="column"
    marginTop={0.5}
    // marginHorizontal={0.5}
    height={15}
    style={() => ({
      width: screenSize.width / 2,
    })}
  >
    <Image
      height={10}
      source={{
        uri: product.media && product.media[0] ? product.media[0].link : '',
      }}
      size={{ height: 1 }}
    />
    <Text height={1} marginHorizontal={0.5} marginTop={2} bold>
      {product.brand.name.toUpperCase()}
    </Text>
    <Text height={2} marginHorizontal={0.5}>
      {product.name}
    </Text>

    <FormattedNumber value={product.price} style="currency" currency="VND">
      {message =>
        <Text height={2} marginHorizontal={0.5}>
          {message}
        </Text>}
    </FormattedNumber>
  </Box>;

const IsEmpty = () =>
  <Box alignItems="center" justifyContent="center" flex={1}>
    <Image source={require('./img/EmptyState.png')} />
    {/* <FormattedMessage {...productsMessages.empty}>
      {message =>
        <Text bold color="gray" marginTop={1} size={1}>
          {message}
        </Text>}
    </FormattedMessage> */}
  </Box>;

type NewListProps = {
  data: Object,
  onLoadMore: Function,
};

const NewList = ({ data, onLoadMore, ...props }: NewListProps) => {
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

  // headerAnimation must be declared here so the ref callback can refer to it
  let headerAnimation = null;
  const scrollDirection$ = new Subject();
  scrollDirection$
    .throttleTime(1000)
    .map(event => event.nativeEvent.contentOffset.y)
    .bufferCount(2, 1)
    .map(buffer => (buffer[0] > buffer[1] ? 'UP' : 'DOWN'))
    .distinctUntilChanged()
    .subscribe(x => {
      if (x === 'UP') {
        headerAnimation.transitionTo({ translateY: 0 }, 800);
      } else if (x === 'DOWN') {
        headerAnimation.transitionTo({ translateY: -49 }, 800);
      }
    });

  return (
    <Box backgroundColor="white">
      <FlatList
        data={data.products.products}
        refreshing={data.networkStatus === 4}
        onRefresh={() => data.refetch()}
        onEndReachedThreshold={0.5}
        onEndReached={onLoadMore}
        renderItem={product => <ProductItem product={product.item} />}
        keyExtractor={product => product.id}
        horizontal={false}
        numColumns={2}
        ListFooterComponent={<Loading height={4} />}
        ListHeaderComponent={<Box height={2} />}
        marginTop={48}
        ItemSeparatorComponent={() => <Box height={4} />}
        backgroundColor="white"
        onScroll={event => {
          scrollDirection$.next(event);
        }}
      />

      <Animatable.View
        style={{ position: 'absolute' }}
        ref={input => {
          headerAnimation = input;
        }}
      >
        <CategoriesWithData />
      </Animatable.View>
    </Box>
  );
};

export default NewList;
