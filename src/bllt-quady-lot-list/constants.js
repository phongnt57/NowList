export const LIST_COMLUMN = [
	{
		"key": "lotId","label": "Lot ID"
	},
	
	{
		"key": "lotName","label": "Name"
	},

	{
		"key": "status", "label": "Status"
	},

	
	
]; 


export const api = {
	lot_list : {
		path: "/lot/lots",
		method: 'post'
	},
	
	
};
export const headers =  {
	'Accept': 'application/json, text/plain, */*',
	'Content-Type': 'application/json',
	'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA'
}

export const statusLot = [

	{id: 'selectedInProgress', label: "In Progress",  type: "status"},
	{ id: 'selectedClosed', label : "Closed",  type: "status"},
]
	


// export const DEFAULT_BASE_URL = "http://192.168.1.137:8080/trinity/api";
export const DEFAULT_BASE_URL= "https://jenkins.quady-cloud.com/trinity/api/sn"
// export const DEFAULT_BASE_URL= "http://localhost:8080/trinity/api"