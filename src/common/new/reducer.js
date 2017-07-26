// @flow
import { assocPath, dissocPath, filter } from 'ramda';

const reducer = (state = { catergories: [] }, action) => {
  console.log('action ===');
  console.log(action);
  switch (action.type) {
    case 'SET_CATERGORY_FILTER':
      const catergory = action.payload;
      return {
        ...state,
        catergories:
          state.catergories.indexOf(catergory) === -1
            ? [...state.catergories, catergory]
            : state.catergories,
      };
    default:
      return state;
  }
};

export default reducer;
