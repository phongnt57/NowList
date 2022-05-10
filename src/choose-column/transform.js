function getData () {
 try { 
	  var r = new sn_ws.RESTMessageV2('x_bllt_test_projec.quady-ui-api', 'rfc-list');

	 var body = {
    "pagination": {
        "linesPerPage":5,
        "selectedPage":1
    }
};
 r.setRequestBody(JSON.stringify(body));
	
//override authentication profile 
//authentication type ='basic'/ 'oauth2'
//r.setAuthenticationProfile(authentication type, profile name);

//set a MID server name if one wants to run the message on MID
//r.setMIDServer('MY_MID_SERVER');

//if the message is configured to communicate through ECC queue, either
//by setting a MID server or calling executeAsync, one needs to set skip_sensor
//to true. Otherwise, one may get an intermittent error that the response body is null
//r.setEccParameter('skip_sensor', true);

 var response = r.execute();
 var responseBody = response.getBody();
 var httpStatus = response.getStatusCode();
 gs.info(" http response status_code:  " + httpStatus);    
gs.info(responseBody);
 var  parsed = new global.JSON().decode(responseBody);

	// return data;
	 
var returnValue = { 
  "page_cursor": "e2JlY2E4ZTYyNWIwMjEwMTA4NDhiMjg1ODJkODFjNzYzPTI5LCA3NDRiODJhMjViMDIxMDEwODQ4YjI4NTgyZDgxYzc1Zj0yMDAsIDAxYjQzNWEwNzMyMTEwMTBjMzQyZDVmZGJkZjZhN2UzPTExfQ", 
  "page_size": 5, 
  "page_number": 0, 
  "is_last_page": false, 
  "all_actions": [ 
    { 
      "assignmentId": "d46f400473211010c342d5fdbdf6a7cf", 
      "name": "navigation", 
      "label": "Navigation", 
      "actionType": "uxf_client_action", 
      "actionDispatch": "NAVIGATION", 
      "actionPayload": "{\r\n \"table\": \"{{table}}\",\r\n \"sysId\": \"{{sys_id}}\",\r\n \"url\": \"{{navigation_url}}\"\r\n}" 
    }, 
    { 
      "assignmentId": "e3a173c073151010c342d5fdbdf6a7a2", 
      "name": "call_number", 
      "label": "Call Number", 
      "actionType": "uxf_client_action", 
      "actionDispatch": "HOME_PHONE_CALL", 
      "actionPayload": "{\r\n\t\"phoneNumber\": \"{{home_phone}}\"\r\n}" 
    } 
  ], 
  "selected_filter": "", 
  "items": [ 

  ], 
  "available_filters": [ 
    { 
      "sys_id": "", 
      "label": "Default" 
    }, 
    { 
      "sys_id": "c10d1e42737e10108d991e666bf6a761", 
      "label": "Active entities" 
    }, 
    { 
      "sys_id": "808ed682737e10108d991e666bf6a793", 
      "label": "Assigned to me" 
    }, 
    { 
      "sys_id": "1213fb41733210108d991e666bf6a77a", 
      "label": "Recently updated" 
    } 
  ] 
};
	 
//  return  JSON.stringify(parsed) ;
   var results = parsed.results;
   var items = results.map(function(item){
	   var setItem = { 
      "template": "now-card-evam-record", 
      "propValues": { 
        "highlightedHeaderLabel": "", 
        "textHeaderLabel": "", 
        "titleLabel": item.rfcId, 
        "imageURL": "", 
        "subtitle": item.status, 
        "subtitleAvatarName": "", 
        "subtitleAvatarURL": "", 
        "detailValueOne": item.subject, 
        "detailValueTwo": item.summary, 
        "detailValueThree": item.url, 
        "highlightedHeaderIcon": "clock-outline", 
        "highlightedHeaderBkgColor": "moderate", 
        "subtitleIcon": "calendar-fill", 
        "imageType": "image", 
        "subtitleImageType": "avatar", 
        "detailLabelOne": "Subject", 
        "detailLabelTwo": "Summary", 
        "detailLabelThree": "URL"
      }
     
    } 
	   return setItem;
		 
	 });
	 returnValue.items = items;
	 return returnValue;
}
catch(ex) {
 var message = ex.message;
	return message;
}

}