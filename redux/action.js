import _fetch from '../utils/HelperFetch.js'

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
};

export function getPracticeModel(){
    return function(dispatch){
        fetch('https://www.healthgrades.com/uisvc/v1_0/eppuiservice/api/Provider/GetViewModel?officeId=oo65fmp') //YBRWWS , oo65fmp
          .then((response)=> response.json())
          .then((response) =>{
              debugger;
                _fetch('https://s3.amazonaws.com/paidpremiumtest/Provider/x2mt8/Files/testimonies.json',{method:'GET'},function(status, testimonies){
            if(status = 'OK'){
                   debugger;
              dispatch({type:'FETCH_TESTIMONIAL_MODEL_SUCCESS',payload:testimonies});
              dispatch({type:'FETCH_PRAC_MODEL_SUCCESS',payload:response});

               var event = new CustomEvent('displayAds', { 'detail': {AdModel:response.Adds} });
               document.dispatchEvent(event);
            }
            else{
                 debugger;
              dispatch({type:'FETCH_TESTIMONIAL_MODEL_ERROR',payload:testimonies});
               dispatch({type:'FETCH_PRAC_MODEL_SUCCESS',payload:response});
            }

        })
             
          })
          .catch((error)=>{
              return dispatch({type:'FETCH_PRAC_MODEL_ERROR',payload:error});
          });
    }
};

var getTestimonialModel = function(url){
    return function(dispatch){
        _fetch(url,{method:'GET'},function(status, response){
            if(status = 'OK'){
                   debugger;
              dispatch({type:'FETCH_TESTIMONIAL_MODEL_SUCCESS',payload:response});
            }
            else{
                 debugger;
              dispatch({type:'FETCH_TESTIMONIAL_MODEL_ERROR',payload:response});
            }

        })
}}; 
          