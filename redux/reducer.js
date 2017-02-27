
let reducer = function(state, action) {
  switch (action.type) {
    case 'FETCH_PROV_SUCCESS':
    debugger;
      return Object.assign({}, state, {
        providers: action.payload
      });
        case 'FETCH_PRAC_MODEL_SUCCESS':
      return Object.assign({}, state, {
        practiceModel: action.payload
      });
         case 'FETCH_TESTIMONIAL_MODEL_SUCCESS':
      return Object.assign({}, state, {
        testimonialModel: action.payload
      });
    default: 
      return state;
  }
}
export default reducer