
export const api = {
	chg_property_pending_detail : {
		path: "/chgproperty/pending/details",
		method: 'get'
	},
	approve : {
		path: "/chgproperty/pending/approve",
		method: 'put'

	},
	return_to_submitter : {
		path: "/chgproperty/pending/returnToSubmitter",
		method: 'put'
	},
	
	
};
export const headers =  {
	'Accept': 'application/json, text/plain, */*',
	'Content-Type': 'application/json',
	'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA',
}

export const statusChg = [
	{id: '', label :"All", type: "status"},
	{id: '3100', label: "In Progress",  type: "status"},
	{ id: '3600', label : "Close",  type: "status"},
	{ id: '9100', label: "Merged",  type: "status"}
];

// export const DEFAULT_BASE_URL = "http://192.168.1.137:8080/trinity/api";
export const DEFAULT_BASE_URL= "https://jenkins.quady-cloud.com/trinity/api/sn"
// export const DEFAULT_BASE_URL= "http://localhost:8080/trinity/api"