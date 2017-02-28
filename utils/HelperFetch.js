let agent = require('superagent');

const fetch = (url,options = {},callBack) => {
    if(!url && typeof url !== 'string'){
        let response = 'InvalidPayload';
        callBack(response);
    }
    const {method, body = {}}=options;
    if (!method){
        get(url,callBack);
    }
    if(method == 'GET'){
            get(url,callBack);
    }
    else if(method =='POST'){
                post(url,body,callBack);
                //var req = request(url).post(body);
    }
}

const post = function(url,body,callBack){
    // helper functions: options, head, get, post, put, patch, del 
agent.post(url, body)
  .then(function(res) {
    callBack('OK', JSON.parse(res.body));
  });
}

const get =function(url,callBack){
        agent('GET',url)
         .then(function onResult(res) {
      if(res.body){
        callBack('OK', res.body);
      }
      else{
        callBack('OK', JSON.parse(res.text));
      }
  }, function onError(err) {
        callBack(err);
  });
}

export default fetch;