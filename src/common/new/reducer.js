// @flow
import _ from 'ramda';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CATEGORY_FILTER':
      const category = action.payload;
      const categories = state.categories ? state.categories : [];
      const addCaterory =
        categories.indexOf(category) === -1
          ? [...categories, category]
          : categories.filter(element => element !== action.payload);

      if (addCaterory.length === 0) {
        return _.omit(['categories'], state);
      }
      return _.set(_.lensProp('categories'), addCaterory, state);

    default:
      return state;
  }
};

export default reducer;
