import { createCustomElement, actionTypes } from '@servicenow/ui-core';
import { snabbdom, createRef } from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-icon';
import '@servicenow/now-button';
import '@servicenow/now-popover'
import '@servicenow/now-modal'
import '@servicenow/now-card'
import '../choose-column'
import styles from './styles.scss';
import { LIST_COMLUMN } from './constants'

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
	console.log(state.selectedColumns);
}



const onChangeLinePerPage = (linesPerPage, dispatch, updateState) => {
	updateState({ linesPerPage: linesPerPage })
	dispatch("SEARCH_RESULTS_REQUESTED", {
		linesPerPage: linesPerPage,
		selectedPage: 1,
	});
}

const onSearchKeyword = (searchRef, e, dispatch, state, updateState) => {
	if (e.which == 13) {
		const value = searchRef.current.value;
		updateState({ searchKeyword: value });
		dispatch("SEARCH_RESULTS_REQUESTED", {
			linesPerPage: state.linesPerPage,
			selectedPage: 1,
			searchKeyword: value
		});

	}

}
const onChangeSelect = (e, updateState) => {
	const action = e.target.value;
	if(action== "delete") updateState({openModal: true});

}
const onComment =(e)=>{
	console.log(e.target.value);

}



const view = (state, { updateState, dispatch }) => {
	const searchRef = createRef();

	return (
		<div>
			<now-modal
				opened={state.openModal}
				size='sm'
				header-label='Delete RFC'
				footer-actions='[
             {
              "variant": "primary",
              "label": "Save"
              }
             ]'
			>
				 Delete {state.selectIds.toString()}
				 <br/>
				<textarea style={{ width:"100%"}} row={10} on-input={onComment}></textarea>

			</now-modal>

			
			<div className="sn-list-header">
				<div className="sn-list-header-title-container">
					<now-popover interaction-type="dialog" positions={[{ "target": "bottom-center", "content": "top-center" }]}
					>
						<now-button slot="trigger" icon="menu-fill" size="md" />
						<now-card slot="content">
							<div>
								{[5, 10, 15, 20, 50, 100].map(item => (
									<div
										on-click={() => onChangeLinePerPage(item, dispatch, updateState)}
										style={{ display: 'flex', padding: '5px', cursor: 'pointer' }} >
										{state.linesPerPage === item ?
											<now-icon icon="check-fill" size="md" />
											: <div style={{ width: '16px', height: '16px' }}></div>
										}
										<div>{item} rows per page</div>
									</div>
								))}
							</div>
						</now-card>

					</now-popover>

					<h2 className="now-heading -header -secondary"> RFC list</h2>
					<div className="margin-x2">Search</div>
					<input className="header-input" type="text"
						ref={searchRef}
						on-keyup={e => onSearchKeyword(searchRef, e, dispatch, state, updateState)}
						placeholder="Search" />
				</div>
				<div></div>
				<div className="sn-list-header-title-container">
					{/* <now-icon className="margin-x2" icon="gear-outline" size="lg"></now-icon> */}
					<choose-column selectedColumns={state.selectedColumns} submitColumn={updateState}></choose-column>

					<select id="selection" className="margin-x2" onchange={e => onChangeSelect(e, updateState)}>
						<option value="default">Action on select row...</option>
						<option value="delete">Delete</option>
					</select>
					<now-button onclick={() => dispatch("EVENT_CREATE_NEW_RFC", { 'eventpayload': 'createnew' })}
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
									<a type="button" >
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
											<input
												checked={state.selectIds.indexOf(item.rfcId) > -1}
												type="checkbox"
												onchange={() => onCheckChange(item.rfcId, state, updateState)} />
										</div>

									</td>

									<td>
										<div className="sn-text-link cursor-pointer">
											<a className="text-link"
												on-click={() => dispatch("EVENT_DETAIL", { 'event-payload': item.rfcId })}
											>{item.rfcId}</a>
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
								<div className="bottom-paging">Data is empty</div>
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
					{state.linesPerPage * state.currentPage < state.total ? state.linesPerPage * state.currentPage : state.total}
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

const onCheckChange = (id, state, updateState) => {
	let selectIds = [...state.selectIds];
	let index = selectIds.indexOf(id);
	if (index > -1) {
		selectIds.splice(index, 1);
	} else {
		selectIds.push(id);
	}
	updateState({ selectIds });

}

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
		linesPerPage: 5,
		openModal: false,
		searchKeyword: '',
		selectIds: [],
		selectedColumns: LIST_COMLUMN
	},
	properties: {
		// no longer use. ignore
		list: { default: [{ rfcId: "RFC-001", subject: "subject", url: "google.com", createTime: "2022-04-21" }] }
	},
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: requestSearchResults,

		"NOW_MODAL#FOOTER_ACTION_CLICKED" : ({ action, state, updateState }) => {
			console.log("action out")


		},
		"NOW_MODAL#OPENED_SET": ({ action, state, updateState }) =>{
			updateState({openModal: action.payload.value});
		},


		SEARCH_RESULTS_REQUESTED: ({ action, state, updateState }) => {
			const payload = action.payload;
			let body = {
				"pagination": {
					"linesPerPage": payload.linesPerPage,
					"selectedPage": payload.selectedPage
				}
			};
			if (payload.searchKeyword) body.searchKeyword = payload.searchKeyword;
			else if (state.searchKeyword) body.searchKeyword = state.searchKeyword;
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
