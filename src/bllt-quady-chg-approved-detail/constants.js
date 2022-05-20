
export const api = {
	chg_property_approved_detail : {
		path: "/chgproperty/approved/details",
		method: 'get'
	},

	returnToPending : {
		path: "/chgproperty/approved/returnToPending",
		method: 'put'
	},
	
};
export const headers =  {
	'Accept': 'application/json, text/plain, */*',
	'Content-Type': 'application/json',
	'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA',
}


// export const DEFAULT_BASE_URL = "http://192.168.1.137:8080/trinity/api";
export const DEFAULT_BASE_URL= "https://jenkins.quady-cloud.com/trinity/api/sn"
// export const DEFAULT_BASE_URL= "http://localhost:8080/trinity/api"