export const LIST_COMLUMN = [
	{
		"key": "ruId","label": "ID"
	},
	
	{
		"key": "subject","label": "Subject"
	},
	{
		"key": "baselinelTag","label": "Baseline Tag"
	},
	{
		"key": "createdBy","label": "Create By"
	},
	{
		"key": "startTime","label": "Start time"
	},
	{
		"key": "endTime","label": "End time"
	},
	{
		"key":"status", "label": "Status"
	}
	
	
]; 

export const LIST_ALL_COMLUMN = [
	{
		"key": "ruId","label": "ID"
	},
	
	{
		"key": "subject","label": "Subject"
	},
	{
		"key": "baselinelTag","label": "Baseline Tag"
	},
	{
		"key": "createdBy","label": "Create By"
	},
	{
		"key": "startTime","label": "Start time"
	},
	{
		"key": "endTime","label": "End time"
	},
	{
		"key":"status", "label": "Status"
	}
	
	
]; 
export const api = {
	ru_list : {
		path: "/ru/list",
		method: 'put'
	},
	delete_all : {
		path: "ru/removeAll",
		method: 'put'

	},
	
	
	
};
export const headers =  {
	'Accept': 'application/json, text/plain, */*',
	'Content-Type': 'application/json',
	'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA',
}

export const statusRu = [
	{id: '', label :"All", type: "status"},
	{id: '2600', label: "In Progress",  type: "status"}
	
];

// export const DEFAULT_BASE_URL = "http://192.168.1.137:8080/trinity/api";
export const DEFAULT_BASE_URL= "https://jenkins.quady-cloud.com/trinity/api/sn"
// export const DEFAULT_BASE_URL= "http://localhost:8080/trinity/api"