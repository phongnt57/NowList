import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';


const requestSearchResults = ({ properties, dispatch }) => {
		dispatch("SEARCH_RESULTS_REQUESTED", {
			page: 1,
			pageSize: 10,
		});
	
};

const view = (state, {updateState}) => {
	const {properties} = state;

	return (
		<div className="container now-grid">
			<table className="auto" role="grid">
				<thead>
					<tr>
						<th className="-checkbox"></th>
						<th className="list-column-header" dir="ltr" id="id_0" role="columnheader">
						<div className="sn-text-link hide-columnreorder-off">
								<a type="button">
							      <span className="column-resizing-enabled">ID</span>
							   </a>

							</div>
						</th>
						<th className="list-column-header" dir="ltr" id="subject-1" scope="col" title="Subject" role="columnheader">
							<div className="sn-text-link hide-columnreorder-off">
								<a type="button">
							      <span className="column-resizing-enabled">Subject</span>
							   </a>

							</div>
						</th>
						<th className="list-column-header" dir="ltr" id="url-2" scope="col" title="URL" role="columnheader">
							<div className="sn-text-link hide-columnreorder-off">
							<a type="button">
							   <span className="column-resizing-enabled">URL</span>
							</a>	

							</div>
						</th>
						<th className="list-column-header" dir="ltr" id="create-time-3" scope="col" title="Create time" role="columnheader">
							<div className="sn-text-link hide-columnreorder-off">
							<a type="button">
							   <span className="column-resizing-enabled">Created Time</span>
							   </a>
							</div>
						</th>
						<th className="list-column-header" dir="ltr" id="update-time-4" scope="col" title="Updated time" role="columnheader">
							<div className="sn-text-link hide-columnreorder-off">
							<a type="button">
							   <span className="column-resizing-enabled">Updated Time</span>
							   </a>
							</div>
						</th>
					</tr>

				</thead>
				<tbody className="table-body">
					{state.data.length ? (
						state.data.map(item => (
						<tr className="row">
						<td>
							<div className="sn-grid-checkbox">
								<input type="checkbox"/>
							</div>

						</td>

						<td>
							{item.rfcId}
						</td>
						<td>
							{item.subject}
						</td>

						<td>
							{item.url}
						</td>
						<td>
							{item.createTime}
						</td>
						<td>
							{item.updatedTime}
						</td>


					</tr>
						))
					):
					(
						 <div>Empty</div>
						 )
				    }
					
				</tbody>

			</table>

		</div>
	);
};

createCustomElement('bllt-quady-list-component', {
	renderer: {type: snabbdom},
	view,
	styles,
	initialState: {
		showLoading: true,
		data: [],
	},
	properties: {
		// no longer use. ignore
        list: {default: [{rfcId: "RFC-001", subject:"subject", url:"google.com", createTime:"2022-04-21" }]}
    },
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: requestSearchResults,
		
		SEARCH_RESULTS_REQUESTED: (all)=>{
			const action = all.action;
			console.log(all);
			let body = {
				"pagination": {
					"linesPerPage":5,
					"selectedPage":1
				}
			};
			// const API = "'https://api.jsonbin.io/b/625f90fbc5284e31154fbffe/3";
			const API = "http://18.178.235.108:8089/trinity/api/sn/rfc/list"
			fetch(API, {
				method: 'post',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
					'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA'
				},
				body: JSON.stringify(body)
			})
			.then(function (response) {
				return response.json();
			})
			.then(function (result) {
				console.log("result");
				console.log(result);
				all.updateState({data: result.results});
				// dispatch("SEARCH_RESULTS_FETCHED", {
				// 	result: result,
				// });
			})
			.catch (function (error) {
				console.log('Request failed', error);
			});

		},
		SEARCH_RESULTS_STARTED: ({ updateState }) =>
			updateState({ showLoading: true }),
		SEARCH_RESULTS_FETCHED: ({ action, updateState }) =>
			updateState({ data: action.payload.result, showLoading: false }),
	},
});
