import { createCustomElement, actionTypes } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-icon';
import '@servicenow/now-button';
import '@servicenow/now-popover'
import '@servicenow/now-modal'
// import '@servicenow/sn-content'

import styles from './styles.scss';


const requestSearchResults = ({ state, dispatch }) => {
	dispatch("SEARCH_RESULTS_REQUESTED", {
		linesPerPage: state.linesPerPage,
		selectedPage: 1,
	});

};
const clickNext = (state, dispatch) => {
	if (state.currentPage < state.pages)
		dispatch("SEARCH_RESULTS_REQUESTED", {
			linesPerPage: state.linesPerPage,
			selectedPage: state.currentPage + 1,
		})
}

const clickBack = (state, dispatch) => {
	if (state.currentPage > 1)
		dispatch("SEARCH_RESULTS_REQUESTED", {
			linesPerPage: state.linesPerPage,
			selectedPage: state.currentPage - 1,
		})
}
const clickLatest = (state, dispatch) => {
	dispatch("SEARCH_RESULTS_REQUESTED", {
		linesPerPage: state.linesPerPage,
		selectedPage: state.pages,
	})
}

const showModalPageSize = (updateState) => {
	updateState({ openModalPageSize: true })
}


const view = (state, { updateState, dispatch }) => {


	return (
		<div>
			<div className="sn-list-header">

				<div className="sn-list-header-title-container">
					<now-popover interaction-type="dialog" positions={[{ "target": "bottom-center", "content": "top-center" }]}
					>
						<now-button slot="trigger" icon="menu-fill" size="md" />
						<now-button slot="content">
							<div>
								<h1>ddwdwdw</h1>
								<input type="text" />
							</div>
						</now-button>

					</now-popover>

					<h2 className="now-heading -header -secondary"> RFC list</h2>
					<div className="margin-x2">Search</div>
					<input className="header-input" type="text" placeholder="Search" />
				</div>
				<div></div>
				<div className="sn-list-header-title-container">
					<now-icon className="margin-x2" icon="gear-outline" size="lg"></now-icon>

					<select id="selection" className="margin-x2">
						<option value="volvo">Action on select row...</option>
						<option value="saab">Delete</option>
					</select>
					<now-button onclick={() => dispatch("EVENT_CREATE_NEW_RFC", { 'event-payload': 'createnew' })}
						className="margin-x2" label="New" variant="primary" size="md"  ></now-button>


				</div>
			</div>

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
											<input type="checkbox" />
										</div>

									</td>

									<td>
										<div className="sn-text-link">
											{item.rfcId}
										</div>
									</td>
									<td>
										<div className="sn-text-link">
											{item.subject}
										</div>
									</td>

									<td>
										<div className="sn-text-link">
											{item.url}
										</div>
									</td>
									<td>
										<div className="sn-text-link">
											{item.createdTime}
										</div>
									</td>
									<td>
										<div className="sn-text-link">
											{item.updatedTime}
										</div>
									</td>
								</tr>
							))
						) :
							(
								<div>Empty</div>
							)
						}

					</tbody>

				</table>

			</div>
			<div className="bottom-paging">
				<now-button
					className="margin-x2 cursor-pointer"
					onclick={() => requestSearchResults({ state, dispatch })}
					icon="arrow-left-most-fill" size="lg">
				</now-button>
				<now-button className="margin-x2 cursor-pointer"
					disabled={state.currentPage === 1}
					onclick={() => clickBack(state, dispatch)}
					icon="caret-left-fill" size="lg">
				</now-button>
				<div>
					{state.linesPerPage * (state.currentPage - 1) + 1}
					&nbsp; to &nbsp;
					{state.linesPerPage * state.currentPage}
					&nbsp;of &nbsp;
					{state.total}
				</div>

				<now-button className="margin-x2 cursor-pointer"
					onclick={() => clickNext(state, dispatch)}
					disabled={state.currentPage === state.pages}
					icon="caret-right-fill" size="lg">
				</now-button>

				<now-button className="margin-x2 cursor-pointer"
					onclick={() => clickLatest(state, dispatch)}
					icon="arrow-right-most-fill" size="lg">
				</now-button>

			</div>
		</div>
	);
};

createCustomElement('bllt-quady-list-component', {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: {
		showLoading: true,
		data: [],
		pages: 0,
		total: 0,
		currentPage: 0,
		linesPerPage: 4,
		openModalPageSize: false
	},
	properties: {
		// no longer use. ignore
		list: { default: [{ rfcId: "RFC-001", subject: "subject", url: "google.com", createTime: "2022-04-21" }] }
	},
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: requestSearchResults,

		SEARCH_RESULTS_REQUESTED: ({ action, state, updateState }) => {
			const payload = action.payload;
			let body = {
				"pagination": {
					"linesPerPage": payload.linesPerPage,
					"selectedPage": payload.selectedPage
				}
			};
			// const API = "https://api.jsonbin.io/b/626e53e6019db46796940c1a";
			const API = "http://18.178.235.108:8089/trinity/api/sn/rfc/list"
			fetch(API, {
				method: 'get',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
					'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA'
				},
				// body: JSON.stringify(body)
			})
				.then(function (response) {
					return response.json();
				})
				.then(function (result) {
					console.log("result");
					console.log(result);
					updateState({
						data: result.results,
						total: result.pagination.total,
						pages: result.pagination.pages,
						currentPage: result.pagination.currentPage
					});

				})
				.catch(function (error) {
					console.log('Request failed', error);
				});

		},
		SEARCH_RESULTS_STARTED: ({ updateState }) =>
			updateState({ showLoading: true }),
		SEARCH_RESULTS_FETCHED: ({ action, updateState }) =>
			updateState({ data: action.payload.result, showLoading: false }),
	},
});
