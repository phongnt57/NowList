import { createCustomElement, actionTypes } from '@servicenow/ui-core';
import { snabbdom, createRef } from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-icon';
import '@servicenow/now-button';
import '@servicenow/now-popover'
import '@servicenow/now-modal'
import '@servicenow/now-split-button'
import '../choose-column'
import '../lot-search-modal'
import '@servicenow/now-card'
import '@servicenow/now-tabs'
import '@servicenow/now-alert'

import styles from '../styles.scss';
import { LIST_COMLUMN, LIST_ALL_COMLUMN, api, headers, statusChg, DEFAULT_BASE_URL } from './constants'

const getDetail = ({ state, dispatch }) => {
	dispatch("GET_DETAIL_REQUESTED", {

	});
};


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

const onEnterLot = (lotRef, e, dispatch, state, updateState) => {
	if (e.which == 13) {
		const value = lotRef.current.value;
		updateState({ selectedLotId: value });
		dispatch("SEARCH_RESULTS_REQUESTED", {
			linesPerPage: state.linesPerPage,
			selectedPage: 1,
			selectedLotId: value
		});

		dispatch("GET_LIST_INIT_REQUEST", {});


	}

}


const onComment = (comment, updateState) => {
	updateState({ comment: comment });

}

const onCheckChangeAll = (ref, state, updateState) => {
	if (ref.current.checked) {
		let seletedIds = state.data.map(item => item.changeId);
		updateState({ selectIds: seletedIds });
	} else updateState({ selectIds: [] });

}



const view = (state, { updateState, dispatch }) => {
	const searchRef = createRef();
	const lotRef = createRef();
	const checkBoxRef = createRef();

	return (
		<div>
			<now-modal
				opened={state.openModal}
				size='sm'
				header-label='Approve Change Property'
				footer-actions='[
					{
					"variant": "primary",
					"label": "Submit",
					"type": "approve" 
					}
					]'
			>
				<div style={{ marginBottom: "10px" }}>Approve this request?</div>

				<textarea
					className="border-input"
					style={{ width: "100%" }} rows={5}
					onblur={(e) => onComment(e.target.value, updateState)}></textarea>

			</now-modal>

			<now-modal
				opened={state.openModalReject}
				size='sm'
				header-label='Return to Submitter '
				footer-actions='[
					{
					"variant": "primary",
					"label": "Submit",
					"type": "reject" 
					}
					]'
			>
				<div style={{ marginBottom: "10px" }}>Return to Submitter this Request?</div>

				<textarea
					className="border-input"
					style={{ width: "100%" }} rows={5}
					onblur={(e) => onComment(e.target.value, updateState)}></textarea>

			</now-modal>



			<div className="sn-list-header">
				<div className="sn-list-header-title-container">
					<now-button style={{ marginLeft: "10px" }}
						className="cursor-pointer margin-x2"
						icon="chevron-left-fill" size="md" />
					<now-popover interaction-type="dialog" positions={[{ "target": "bottom-center", "content": "top-center" }]}
					>
						<now-button style={{ marginLeft: "10px" }}
							className="cursor-pointer margin-x2" slot="trigger"
							icon="menu-fill" size="md" />
						<now-card slot="content">
						</now-card>

					</now-popover>

					<div className="now-heading -header -secondary">
						<div>Change Property Pending Approval Details</div>
						<div> LOT-001</div>
					</div>

				</div>
				<div></div>
				<div className="sn-list-header-title-container">

					<now-button onclick={() => dispatch("BUTTON_MENU#ACTION_CLICKED", { 'type': 'approve' })}
						className="margin-x2" label="Approve" variant="primary" size="md"  ></now-button>

					<now-button onclick={() => dispatch("EVENT_QUADY_CREATE", { 'type': 'reject' })}
						className="margin-x2" label="Reject" variant="secondary" size="md"  ></now-button>
				</div>
			</div>
		

			{state.alert &&
				<div>
					<now-alert
						status={state.alert}
						header=""
						content={state.alert == "warning" ? state.errorMessage : "Request successful"}
						action={{ "type": "dismiss" }}>
					</now-alert>
				</div>
			}

			<div>
				<table className="filter-table">
				</table>
			</div>
			<div>
				Pending Approval Selection
			</div>

			<div className="container now-grid">
				<table className="auto content-table" role="grid">
					<thead>
						<tr>
							<th>Request ID</th>
							<th>Subject</th>
							<th>Request Time</th>
							<th>Submitter</th>
							<th>Group</th>
							<th>Status</th>
						</tr>

					</thead>
					<tbody className="table-body">
						{data.pendingRequests.map(item=>(
							<tr>
								<td>{item.requestId}</td>
								<td>{item.subject}</td>
								<td>{item.requestTime}</td>
								<td>{item.submitter}</td>
								<td>{item.group}</td>
								<td>
									<div className={`status-label amStatus${item.statusId}`}>{item.status}</div>
									</td>


							</tr>
						))}
						

					</tbody>
				</table>
			</div>


			<div>
				 Approval Request
			</div>

			<div className="container now-grid">
				<table className="auto content-table" role="grid">
					<thead>
						<tr>
							<th>Request ID</th>
							<th>Subject</th>
							<th>Request Time</th>
							<th>Submitter</th>
							<th>Group</th>
							<th>Status</th>
						</tr>

					</thead>
					<tbody className="table-body">
						{data.approvedRequests.map(item=>(
							<tr>
								<td>{item.requestId}</td>
								<td>{item.subject}</td>
								<td>{item.requestTime}</td>
								<td>{item.submitter}</td>
								<td>{item.group}</td>
								<td>
									<div className={`status-label amStatus${item.statusId}`}>{item.status}</div>
									</td>


							</tr>
						))}
						

					</tbody>

				</table>

			</div>
			
		</div>
	);
};



createCustomElement('bllt-quady-chg-pending-detail', {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: {
		showLoading: true,
		data: {},
		pendingRequests: [],
		approvedRequests: [],
		openModal: false,
		openModalReject: false,
		selectedLotId: '',
		comment: "",
		alert: null,
		errorMessage: ''
	},
	properties: {
		apiUrl: { default: DEFAULT_BASE_URL },
		pjtId: { default: "PJT-2204050001" }

	},
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: getDetail,

		"NOW_MODAL#FOOTER_ACTION_CLICKED": ({ action, state, updateState, dispatch }) => {
			console.log(action);
			const payload = action.payload;
			let url = "";
			let method = "get";
			const body = {
				changeIds: state.selectIds,
				comment: state.comment
			}
			// apporve change property
			if (payload.action.type === "approve") {
				url = state.properties.apiUrl + api.approve.path + "/" + state.selectedLotId;
				method = api.approve.method;
			} else
				if (payload.action.type === "reject") {
					url = state.properties.apiUrl + api.return_to_submitter.path + "/" + state.selectedLotId;
					method = api.return_to_submitter.method;
				} else {
					return;
				}


			fetch(url, {
				method: method,
				headers: headers,
				body: JSON.stringify(body)
			})
				.then(function (response) {
					return response.json();
				})
				.then(function (result) {
					updateState({ selectIds: [], comment: "" });
					// update list 
					if (result.messages) {
						dispatch("SHOW_NOW_ALERT", { status: "warning", errorMessage: result.messages.toString() });
						return;
					}
					history.back();
					dispatch("SHOW_NOW_ALERT", { status: "info" });


				})
				.catch(function (error) {
					console.log('Request failed', error);
					dispatch("SHOW_NOW_ALERT", { status: "warning", errorMessage: "Oop!! " });
				});





		},
		"NOW_MODAL#OPENED_SET": ({ action, state, updateState }) => {
			updateState({ openModal: action.payload.value, openModalCloseChgProperty: action.payload.value, comment: "" });
		},

		"BUTTON_MENU#ACTION_CLICKED": ({ action, state, updateState }) => {
			const payload = action.payload;
			if (payload.type == "approve") updateState({ openModal: true });
			if (payload.type == "reject") updateState({ openModalReject: true });


		},


		GET_DETAIL_REQUESTED: ({ action, state, updateState }) => {
			console.log("SEARCH_RESULTS_REQUESTED");

			const url = state.properties.apiUrl + api.chg_property_pending_detail.path + "/" + state.properties.pjtId;
			fetch(url, {
				method: api.chg_property_pending_detail.method,
				headers: headers,
			})
				.then(function (response) {
					return response.json();
				})
				.then(function (result) {
					updateState({
						data: result,
						pendingRequests: result.pendingRequests,
						approvedRequests: result.approvedRequests
					});

				})
				.catch(function (error) {
					console.log('Request failed', error);
				});

		},

		"NOW_ALERT#ACTION_CLICKED": ({ action, updateState }) => {
			console.log(action);
			const type = action.payload.action.type;
			if (type == "dismiss") updateState({ alert: null });
		},

		SHOW_NOW_ALERT: ({ action, state, updateState }) => {
			const errorMessage = action.payload.errorMessage || '';
			updateState({ alert: action.payload.status, openModal: false, openModalCloseChgProperty: false, errorMessage: errorMessage });
			setTimeout(() => {
				updateState({ alert: null });
			}, 10000);
		},
		// LOT_MODAL_SELECT_ITEM: ({ action, state, updateState, dispatch }) => {
		// 	updateState({ selectedLotId: action.payload.selectedLotId });
		// 	dispatch("SEARCH_RESULTS_REQUESTED", {
		// 		linesPerPage: state.linesPerPage,
		// 		selectedPage: 1,
		// 	});
		// 	dispatch("GET_LIST_INIT_REQUEST", {});

		// }

	}
});
