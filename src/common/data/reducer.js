// @flow
import { stringBoDau } from '../lib/string';
import { filter } from 'ramda';

const initValue = { categories: [], brands: [], filterTableData: [] };
const reducer = (state = initValue, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES': {
      const categories = action.payload.map(item => ({
        ...item,
        nameBoDau: stringBoDau(item.name),
      }));

      const sortedCategories = categories.reduce((result, parent, _, array) => {
        if (parent.parentId === '0') {
          result.push(parent);
          const child = filter(item => item.parentId === parent.id)(array);
          return child.length > 0 ? result.concat(child) : result;
        }
        return result;
      }, []);

      return { ...state, categories: sortedCategories };
    }

    case 'SET_BRANDS': {
      const brands = action.payload.map(item => ({
        ...item,
        nameBoDau: stringBoDau(item.name),
      }));
      return { ...state, brands };
    }
    case 'SET_FILTER_TABLE_DATA':
      return { ...state, filterTableData: action.payload };
    default:
      return state;
  }
};

export default reducer;
