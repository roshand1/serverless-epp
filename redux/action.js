import _fetch from '../utils/HelperFetch.js'

export function getProvidersByPracticeId(practiceId, skip, take){
const uri = '?practiceId=' + practiceId +'&skip='+skip+'&take='+take;
    return function(dispatch){
        fetch('https://8afzabjeui.execute-api.us-east-1.amazonaws.com/Prod/GetProviders'+uri)
          .then((response)=> response.json())
          .then((response) =>{
              dispatch({type:'FETCH_PROV_SUCCESS',payload:response});
          })
          .catch((error)=>{
              return dispatch({type:'FETCH_PROV_ERROR',payload:error});
          });
    }
};

// export function getPracticeModel(){
//     return function(dispatch){
//         _fetch('https://www.healthgrades.com/uisvc/v1_0/eppuiservice/api/Provider/GetViewModel?officeId=oo65fmp',{method:'GET'},function(status, practiceModel){
//             if(status =='OK'){
//                 debugger;
//                dispatch({type:'FETCH_PRAC_MODEL_SUCCESS',payload:practiceModel});
//                 var event = new CustomEvent('displayAds', { 'detail': {AdModel:practiceModel.Adds,OmniturePageTracking:practiceModel.OmniturePageTracking} });
//                 document.dispatchEvent(event);
//             }else{
//               return dispatch({type:'FETCH_PRAC_MODEL_ERROR',payload:error});
//             }
//         }) //YBRWWS , oo65fmp
//     }
// };

export function getPracticeModel(){
    return function(dispatch){
        _fetch('https://syfyr9lyyk.execute-api.us-east-1.amazonaws.com/prod/getpracticeview',{method:'POST',body:{"practiceId":"oo65fmp"}},function(status, practiceModel){
            if(status =='OK'){
                debugger;
                dispatch({type:'FETCH_PRAC_MODEL_SUCCESS',payload:practiceModel});
                var event = new CustomEvent('displayAds', { 'detail': {AdModel:practiceModel.Adds,OmniturePageTracking:practiceModel.PageTracking} });
                document.dispatchEvent(event);
            }
            else{
                 return dispatch({type:'FETCH_PRAC_MODEL_ERROR',payload:error});
            }
        }) //YBRWWS , oo65fmp
    }
};

export function getTestimonialModel (url){
    return function(dispatch){
        _fetch(url,{method:'GET'},function(status, response){
            if(status = 'OK'){
              dispatch({type:'FETCH_TESTIMONIAL_MODEL_SUCCESS',payload:response});
            }
            else{
              dispatch({type:'FETCH_TESTIMONIAL_MODEL_ERROR',payload:response});
            }

        })
}}; 
          