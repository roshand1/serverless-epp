
let reducer = function(state, action) {
  switch (action.type) {
    case 'FETCH_PROV':
      return Object.assign({}, state, {
        providers: action.payload
      });
      case 'GET_SOMETHING':
      return Object.assign({}, state, {
        providers: action.payload.providerArr
      });
    default: 
      return state;
  }
}

export default reducer