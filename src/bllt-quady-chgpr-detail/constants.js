export const LIST_RFC_COLUMN = [
	{
		"key": "rfcId","label": "ID"
	},

	{
		"key": "subject","label": "Subject"
	},
	{
		"key": "summary","label": "Summary"
	},
	{
		"key": "createdBy","label": "Created By"
	},
	{
		"key": "status","label": "Status"
	},
	{
		"key": "url","label": "URL"
	},

];
export const api = {
	chg_property_approved_list : {
		path: "/chgproperty/approved/list",
		method: 'put'
	},
	approve_all : {
		path: "/chgproperty/approved/returnToPending",
		method: 'put'

	},
	init_list : {
		path: "/chgproperty/list/Init",
		method: 'get'
	}

};
export const headers =  {
	'Accept': 'application/json, text/plain, */*',
	'Content-Type': 'application/json',
	'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA'
}


// export const DEFAULT_BASE_URL = "http://192.168.1.137:8080/trinity/api";
export const DEFAULT_BASE_URL= "https://jenkins.quady-cloud.com/trinity/api/sn"
// export const DEFAULT_BASE_URL= "http://localhost:8080/trinity/api"
