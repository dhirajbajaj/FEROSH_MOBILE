// @flow
import type { State } from '../../common/types';
import React from 'react';
import { Box, Text } from '../../common/components';
import { FlatList } from 'react-native';

// Redux
import { connect } from 'react-redux';

const FilterTableView = ({ filterTableData }) => {
  console.log('filterTableData', filterTableData);
  return (
    <FlatList
      style={{
        backgroundColor: 'white',
      }}
      data={filterTableData}
      renderItem={({ item }) =>
        <Text
          height={1}
          marginLeft={item.parentId && item.parentId !== '0' ? 1.5 : 0.5}
          marginRight={0.5}
        >
          {item.name.toUpperCase()}
        </Text>}
      keyExtractor={product => product.id}
      horizontal={false}
      numColumns={1}
      ItemSeparatorComponent={() => <Box height={0.5} />}
      ListFooterComponent={<Box height={15} />}
      ListHeaderComponent={<Box height={2} />}
      backgroundColor="white"
    />
  );
};

export default connect((state: State) => ({
  filterTableData: state.data.filterTableData,
}))(FilterTableView);
