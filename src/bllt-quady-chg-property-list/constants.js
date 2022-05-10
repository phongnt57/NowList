export const LIST_COMLUMN = [
	{
		"key": "rfcId","label": "ID"
	},
	
	{
		"key": "subject","label": "Subject"
	},
	{
		"key": "createdTime","label": "Created Time"
	},
	{
		"key": "url","label": "URL"
	},
	{
		"key": "updatedTime","label": "Updated Time"
	},
	{
		"key": "createdBy","label": "Created By"
	},
	
]; 
export const api = {
	rfc_list : {
		path: "/chagproperty/list",
		method: 'post'
	},
	delete_all : {
		path: "/chagproperty/deleteAll",
		method: 'delete'

	},
	close_all : {
		path: "/chagproperty/closeAll",
		method: 'put'
	},
	lot_list : {
		path: "/lot/lots",
		method: "post"
	},
	init_list : {
		path: "/chagproperty/list/Init",
		method: 'get'
	}
	
};
export const headers =  {
	'Accept': 'application/json, text/plain, */*',
	'Content-Type': 'application/json',
	'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA'
}

export const statusChg = [
	{id: '', label :"All"},
	{id: 3100, label: "In Progress"},
	{ id: 4100, label : "Close"},
	{ id: 5100, label: "Merged"}
];

// export const DEFAULT_BASE_URL = "http://192.168.1.137:8080/trinity/api";
export const DEFAULT_BASE_URL= "https://jenkins.quady-cloud.com/trinity/api"