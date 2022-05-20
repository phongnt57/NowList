
export const api = {
	lot_init : {
		path: "/lot/init",
		method: 'get'
	},

	lot_detail : {
		path: "/lot/details",
		method: 'get'
	},
	lot_edit : {
		path: "/lot/edit",
		method: 'put'
	},

	lot_close : {
		path: "/lot/close",
		method: 'put'
	},
	lot_delete : {
		path: "/lot/remove",
		method: 'put'
	}
	
};
export const headers =  {
	'Accept': 'application/json, text/plain, */*',
	'Content-Type': 'application/json',
	'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA',
}

export const requestAddOption = [
	 "Don't output Error and Warning",
	 "Output Warning",
	 "Output Error"
	 
	 
	 
]


// export const DEFAULT_BASE_URL = "http://192.168.1.137:8080/trinity/api";
export const DEFAULT_BASE_URL= "https://jenkins.quady-cloud.com/trinity/api/sn"
// export const DEFAULT_BASE_URL= "http://localhost:8080/trinity/api"