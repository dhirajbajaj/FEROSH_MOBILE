// @flow
import _ from 'ramda';

const reducer = (state = { categories: [], brands: [] }, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'SET_BRANDS':
      return { ...state, brands: action.payload };

    default:
      return state;
  }
};

export default reducer;
