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
	{id: '', label :"All", type: "status"},
	{id: 3100, label: "In Progress",  type: "status"},
	{ id: 4100, label : "Close",  type: "status"},
	{ id: 5100, label: "Merged",  type: "status"}
];

// export const DEFAULT_BASE_URL = "http://192.168.1.137:8080/trinity/api";
export const DEFAULT_BASE_URL= "https://jenkins.quady-cloud.com/trinity/api"
// export const DEFAULT_BASE_URL= "http://localhost:8080/trinity/api"