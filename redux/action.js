import _fetch from '../utils/HelperFetch.js'

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
    var pracId = getParameterByName("practiceid",location.href)
    pracId = pracId ? pracId : 'YBRWWS';
    return function(dispatch){
        _fetch('https://syfyr9lyyk.execute-api.us-east-1.amazonaws.com/prod/getpracticeview',{method:'POST',body:{"practiceId":pracId}},function(status, practiceModel){
            if(status =='OK'){
                dispatch({type:'FETCH_PRAC_MODEL_SUCCESS',payload:practiceModel});
                var event = new CustomEvent('displayAds', { 'detail': {AdModel:practiceModel.Adds,PageTracking:practiceModel.PageTracking} });
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

export function getProvidersByPracticeId(practiceId, skip, take){
const uri = '?practiceId=' + practiceId +'&skip='+skip+'&take='+take;
    return function(dispatch){
        _fetch('https://8afzabjeui.execute-api.us-east-1.amazonaws.com/Prod/GetProviders'+uri,{method:'GET'},function(status, response){
            if(status == 'OK'){
                dispatch({type:'FETCH_PROV_SUCCESS',payload:response});
            }
            else{
                 return dispatch({type:'FETCH_PRAC_MODEL_ERROR',payload:error});
            }
        })
    }
};

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
          