const initialState = {
  category: null,
  sortBy: {
    type: 'rating',
    order: 'desc'
  }
};

const filters = (state = initialState, action) => {
  if(action.type === 'SET_CATEGORY'){
    return {
      ...state,
      category: action.payload,
    }
  }
  if(action.type === 'SET_SORT_BY'){
    return {
      ...state,
      sortBy: action.payload,
    }
  }
  return state;
};

export default filters;