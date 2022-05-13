export const LIST_COMLUMN = [
	{
		"key": "changeId","label": "Change ID"
	},
	
	{
		"key": "referenceId","label": "Reference Id"
	},
	{
		"key": "referenceCategory","label": "Reference Category"
	},
	{
		"key": "summary","label": "Summary"
	},
	{
		"key": "submitter","label": "Submitter"
	},
	{
		"key": "assignee","label": "Assignee"
	},
	{
		"key": "createdTime","label": "Created Time"
	},
	{
		"key": "updatedTime","label": "Updated Time"
	},
	{
		"key": "status","label": "Status"
	},
	
]; 

export const LIST_ALL_COMLUMN = [
	{
		"key": "changeId","label": "Change ID"
	},
	
	{
		"key": "referenceId","label": "Reference Id"
	},
	{
		"key": "referenceCategory","label": "Reference Category"
	},
	{
		"key": "summary","label": "Summary"
	},
	{
		"key": "submitter","label": "Submitter"
	},
	{
		"key": "assignee","label": "Assignee"
	},
	{
		"key": "createdTime","label": "Created Time"
	},
	{
		"key": "updatedTime","label": "Updated Time"
	},
	{
		"key": "status","label": "Status"
	},
	
]; 
export const api = {
	chg_property_list : {
		path: "/chgproperty/list",
		method: 'put'
	},
	delete_all : {
		path: "/chgproperty/removeAll",
		method: 'put'

	},
	close_all : {
		path: "/chgproperty/closeAll",
		method: 'put'
	},
	lot_list : {
		path: "/lot/lots",
		method: "post"
	},
	init_list : {
		path: "/chgproperty/list/Init",
		method: 'get'
	}
	
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