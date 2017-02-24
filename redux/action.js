
let actions = {
fetchProvidersSuccess(providers){
return {
    type:'GET_PROVIDERS',
    payload:providers
    }
},
  fetchProviders(officeId){
      return(dispatch) => {
       
          return fetch('http://localhost:56054/Provider/GetProviders?practiceId=YBSXXW&skip=0&take=10')
          .then((response)=> response.json())
          .then((response) =>{
              debugger;
              return dispatch(actions.fetchProvidersSuccess(response));
          })
          .catch(logger.error);
      }
  }

}

export function getProvidersByFunc(){
    return function(dispatch){
        fetch('https://8afzabjeui.execute-api.us-east-1.amazonaws.com/Prod/GetProviders?practiceId=YBSXXW&skip=0&take=10')
          .then((response)=> response.json())
          .then((response) =>{
              debugger;
              dispatch({type:'FETCH_PROV',payload:response});
          })
          .catch((error)=>{
              return dispatch({type:'FETCH_PROV_ERROR',payload:error});
          });
    }
}

export function getPracticeModel(){
    return function(dispatch){
        fetch('https://www.healthgrades.com/uisvc/v1_0/eppuiservice/api/Provider/GetViewModel?officeId=oo65fmp')
          .then((response)=> response.json())
          .then((response) =>{
              debugger;
              dispatch({type:'FETCH_PRAC_MODE_SUCCESS',payload:response});
          })
          .catch((error)=>{
              return dispatch({type:'FETCH_PRAC_MODE_ERROR',payload:error});
          });
    }
}

export function provideStaticData(){
    return{
        type:'GET_STATICDATA',
        payload:'this is static'
    }
}


export function getSomething() {
    return {
        type: 'GET_SOMETHING',
        payload: {
            something: 'Here is some data'
        }
    }
}

export default actions