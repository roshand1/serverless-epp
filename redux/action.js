
export function getProvidersByPracticeId(practiceId, skip, take){
const uri = '?practiceId=' + practiceId +'&skip='+skip+'&take='+take;
    return function(dispatch){
        fetch('https://8afzabjeui.execute-api.us-east-1.amazonaws.com/Prod/GetProviders'+uri)
          .then((response)=> response.json())
          .then((response) =>{
              debugger;
              dispatch({type:'FETCH_PROV_SUCCESS',payload:response});
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
              dispatch({type:'FETCH_PRAC_MODEL_SUCCESS',payload:response});
          })
          .catch((error)=>{
              return dispatch({type:'FETCH_PRAC_MODEL_ERROR',payload:error});
          });
    }
}