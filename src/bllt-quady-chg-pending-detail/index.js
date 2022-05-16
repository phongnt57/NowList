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


const onComment = (comment, updateState) => {
	updateState({ comment: comment });

}


const view = (state, { updateState, dispatch }) => {
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
				header-label='Return to Submitter'
				footer-actions='[
					{
					"variant": "primary",
					"label": "Submit",
					"type": "reject" 
					}
					]'
			>
				<div style={{ marginBottom: "10px" }}>Return to Submitter this request?</div>

				<textarea
					className="border-input"
					style={{ width: "100%" }} rows={5}
					onblur={(e) => onComment(e.target.value, updateState)}></textarea>

			</now-modal>



			<div className="sn-list-header">
				<div className="sn-list-header-title-container">
					<now-button
						on-click={() => history.back()}
						className="cursor-pointer margin-x2"
						icon="chevron-left-fill" size="md" />
					<now-popover interaction-type="dialog" positions={[{ "target": "bottom-center", "content": "top-center" }]}
					>
						<now-button
							className="cursor-pointer margin-x2" slot="trigger"
							icon="menu-fill" size="md" />
						<now-card slot="content">
						</now-card>

					</now-popover>

					<h4 className="now-heading -header -secondary">
						<div>Change Property Pending Approval Details</div>
						<div> {state.data.lotName}</div>
					</h4>

				</div>
				<div></div>
				<div className="sn-list-header-title-container">

					<now-button onclick={() => dispatch("BUTTON_MENU#ACTION_CLICKED", { 'type': 'approve' })}
						className="margin-x2" label="Approve" variant="primary" size="md"  ></now-button>

					<now-button onclick={() => dispatch("BUTTON_MENU#ACTION_CLICKED", { 'type': 'reject' })}
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


			<div className="form-group">
				<div className="margin-top-10 container now-grid">
					<h3 className="separate-line">Change Property Information</h3>
					<div className="sn-main-content">
						<div>
							<label htmlFor="short_description"
								dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span mandatory="true" oclass="" className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >Change Id</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input
								id="short_description" name="incident.short_description" autoComplete="off"
								value={state.data.changeId} aria-required="true" className="form-control max-width-50" disabled
								aria-label="Short description" />
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="short_description"
								dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span mandatory="true" oclass="" className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >Status</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input
								id="short_description" name="incident.short_description" autoComplete="off"
								value={state.data.status} aria-required="true" className="form-control max-width-50" disabled
								aria-label="Short description" />
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="short_description"
								dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span mandatory="true" oclass="" className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >Reference ID</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input
								id="short_description" name="incident.short_description" autoComplete="off"
								value={state.data.referenceId} aria-required="true" className="form-control" disabled
								aria-label="Short description" />
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="incident.short_description" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >Reference Category</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input
								id="short_description" name="incident.short_description" autoComplete="off"
								value={state.data.referenceCategory} aria-required="true" className="form-control" disabled
							/>
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="incident.short_description" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >Summary</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<textarea rows="2" id="summary" name="summary" autoComplete="off" aria-required="true"
								className="form-control" required value={state.data.summary} disabled
							/>
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="contents" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >Contents</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<textarea rows="2" id="contents" name="contents" autoComplete="off"
								aria-required="true" className="form-control" required="true"
								aria-label="Short description" value={state.data.contents} disabled
							/>
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="url" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >Submitter</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">

							<input
								className="form-control max-width-50"
								name="submitter" autoComplete="off"
								value={state.data.submitter} aria-required="true" disabled
							/>
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="incident.short_description" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >Assignee</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input
								className="form-control max-width-50"
								name="submitter" autoComplete="off"
								value={state.data.assignee} aria-required="true" disabled
							/>
						</div>
					</div>

					<div className="sn-main-content">
						<div>
							<label htmlFor="incident.short_description" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >Created Time</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input
								className="form-control max-width-50"
								name="submitter" autoComplete="off"
								value={state.data.createdTime} aria-required="true" disabled
							/>
						</div>
					</div>

					<div className="sn-main-content">
						<div>
							<label htmlFor="incident.short_description" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >Updated Time</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input
								className="form-control max-width-50"
								name="submitter" autoComplete="off"
								value={state.data.updatedTime} aria-required="true" disabled
							/>
						</div>
					</div>
				</div>

				<div className="container now-grid">
					<h3 className="separate-line">	Pending Approval Selection</h3>
					<div className="child-table">
						<table className="auto content-table" role="grid">
							<thead>
								<tr>
									<th className="-checkbox">
										<input
										    disabled
											type="checkbox"
											checked={true} />
									</th>
									<th>Request ID</th>
									<th>Subject</th>
									<th>Request Time</th>
									<th>Submitter</th>
									<th>Group</th>
									<th>Status</th>
								</tr>

							</thead>
							<tbody className="table-body">
								{state.pendingRequests.map(item => (
									<tr>
										<td>
										<input
										    disabled
											type="checkbox"
											checked={true} />
										</td>
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


				<div className="container now-grid">
					<h3 className="separate-line">	 Approved Selection</h3>
					<div className="child-table">
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
								{state.approvedRequests.map(item => (
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

				<div className="bottom-menu">

					<now-button onclick={() => dispatch("BUTTON_MENU#ACTION_CLICKED", { 'type': 'approve' })}
						className="" label="Approve" variant="primary" size="md"  ></now-button>

					<now-button onclick={() => dispatch("BUTTON_MENU#ACTION_CLICKED", { 'type': 'reject' })}
						className="margin-x2" label="Reject" variant="secondary" size="md"  ></now-button>
				</div>

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
		pjtId: { default: "PJT-2205120003" }

	},
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: getDetail,

		"NOW_MODAL#FOOTER_ACTION_CLICKED": ({ action, state, updateState, dispatch }) => {
			console.log(action);
			const payload = action.payload;
			let url = "";
			let method = "get";
			let requestIds = state.pendingRequests.map(item => item.requestId);
			const body = {
				requestIds: requestIds,
				comment: state.comment
			}
			// apporve change property
			if (payload.action.type === "approve") {
				url = state.properties.apiUrl + api.approve.path + "/" + state.data.lotId;
				method = api.approve.method;
			} else
				if (payload.action.type === "reject") {
					url = state.properties.apiUrl + api.return_to_submitter.path + "/" + state.data.lotId;
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
					dispatch("SHOW_NOW_ALERT", { status: "info" });
					dispatch("EVENT_QUADY_BACK_TO_LIST", {})


				})
				.catch(function (error) {
					console.log('Request failed', error);
					dispatch("SHOW_NOW_ALERT", { status: "warning", errorMessage: "Oop!! " });
				});





		},
		"NOW_MODAL#OPENED_SET": ({ action, state, updateState }) => {
			updateState({ openModal: action.payload.value, openModalReject: action.payload.value, comment: "" });
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


	}
});
