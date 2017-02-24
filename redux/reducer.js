
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
        case 'FETCH_PRAC_MODE_SUCCESS':
      return Object.assign({}, state, {
        practiceModel: action.payload
      });
    default: 
      return state;
  }
}

export default reducer