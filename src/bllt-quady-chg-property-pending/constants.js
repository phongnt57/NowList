export const LIST_COMLUMN = [
	{
		"key": "changeId","label": "Change ID"
	},
	
	{
		"key": "referenceId","label": "Reference Id"
	},

	{
		"key": "requestId", "label": "Request ID"
	},

	{
		"key": "submitter","label": "Submitter"
	},

	{
		"key": "assignee","label": "Assignee"
	},
	{
		"key": "requestTime", "label" :"requestTime"
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
		"key": "requestId", "label": "Request ID"
	},

	{
		"key": "submitter","label": "Submitter"
	},

	{
		"key": "assignee","label": "Assignee"
	},
	{
		"key": "requestTime", "label" :"requestTime"
	},

	{
		"key": "status","label": "Status"
	},
	{
		"key": "enableApproval" , "label": "Enable Approval"
    },

	{
		"key": "reviewed" , "label": "Reviewed"
    }
	
]; 
export const api = {
	chg_property_pending_list : {
		path: "/chgproperty/pending/list",
		method: 'put'
	},
	approve_all : {
		path: "/chgproperty/pending/approveAll",
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

export const statusChg = [
	{id: '', label :"All", type: "status"},
	{id: '3100', label: "In Progress",  type: "status"},
	{ id: '3600', label : "Close",  type: "status"},
	{ id: '9100', label: "Merged",  type: "status"}
];

// export const DEFAULT_BASE_URL = "http://192.168.1.137:8080/trinity/api";
export const DEFAULT_BASE_URL= "https://jenkins.quady-cloud.com/trinity/api/sn"
// export const DEFAULT_BASE_URL= "http://localhost:8080/trinity/api"