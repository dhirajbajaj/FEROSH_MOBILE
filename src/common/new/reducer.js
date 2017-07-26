// @flow
import { assocPath, dissocPath, filter } from 'ramda';

const newFilter = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CATERGORY_FILTER':
      const { catergory } = action.payload;
      return {
        ...state,
        catergories:
          state.catergories.indexOf(catergory) === -1
            ? state.catergories.push(catergory)
            : state.catergories,
      };
    default:
      return state;
  }
};

export default newFilter;
