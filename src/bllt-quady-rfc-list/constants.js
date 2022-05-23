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
		path: "/rfc/list",
		method: 'post'
	},
	delete_all : {
		path: "/rfc/removeAll",
		method: 'post'

	}
};
export const headers =  {
	'Accept': 'application/json, text/plain, */*',
	'Content-Type': 'application/json',
	'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA'
}

export const DEFAULT_BASE_URL= "https://jenkins.quady-cloud.com/trinity/api/sn";
