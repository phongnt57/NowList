import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import {snabbdom, createRef} from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import '@servicenow/now-icon';
import '@servicenow/now-button';
import '@servicenow/now-popover';
import '@servicenow/now-modal';
import '@servicenow/now-card';
import '@servicenow/now-input';
import { LIST_RFC_COLUMN, api, headers } from './constants'

const initChangeProperty = ({ state, dispatch }) => {
	dispatch("INIT_CHANGE_PROPERTY", {});
};

const onReferenceID = (referIDRef, e, updateState) => {
	const referenceId = referIDRef.current.value;
	 updateState({referenceId: referenceId});
};

const onReferenceCategory = (referCatRef, e, updateState) => {
	const refCat = referCatRef.current.value;
	console.log(refCat);
	updateState({referenceCategory: refCat});
};

const onStatusChange = (statusRef, e, updateState) => {
	const stsRef = statusRef.current.value;
	console.log(stsRef);
	updateState({statusId: stsRef});
};

const onAssignee = (assigneeRef, e, updateState) => {
	const assignee = assigneeRef.current.value;
	console.log(assignee);
	updateState({assigneeId: assignee});
};

const onContents = (contentsRef, e, updateState) => {
	const contents = contentsRef.current.value;
	console.log(contents);
	updateState({contents: contents});

};

const onSummary = (summaryRef, e, updateState) => {
	const summary = summaryRef.current.value;
	console.log(summary);
	updateState({summary: summary});

};

const openPopup = (state, updateState) => {
	if (state.statusId === '3600') {
		updateState({openClosedModal: true});
	} else {

		updateState({openModal: true, openDeleteModal: false, openClosedModal: false});
	}
};

const openDeletePopup = (updateState) => {
	updateState({openDeleteModal: true});
};

const onCheckChangeAll = (ref, state, updateState) => {
	if (ref.current.checked) {
		let seletedIds = state.rfcs.map(item => item.rfcId);
		updateState({ selectIds: seletedIds });
	} else updateState({ selectIds: [] });

};

const onCheckChange = (id, state, updateState) => {
	let selectIds = [...state.selectIds];
	let index = selectIds.indexOf(id);
	if (index > -1) {
		selectIds.splice(index, 1);
	} else {
		selectIds.push(id);
	}
	updateState({ selectIds: selectIds });

}

const onComment = (comment, updateState) => {
	updateState({ dialogComment: comment });
};

const view = (state, {updateState}) => {
	const changeIDRef = createRef();
	const referIDRef = createRef();
	const referCatRef = createRef();
	const assigneeRef = createRef();
	const summaryRef = createRef();
	const contentsRef = createRef();
	const checkBoxRef = createRef();
	const statusRef = createRef();
	return (
		<div>
			<now-modal
				opened={state.openModal}
				size='sm'
				header-label='Update Change Property'
				footer-actions='[
             {
              "variant": "primary",
              "label": "Save"
              }
             ]'
			>
				Do you want to update this Change Property?
			</now-modal>
			<now-modal
				opened={state.openDeleteModal}
				size='sm'
				header-label='Delete Change Property'
				footer-actions='[
					{
					"variant": "primary",
					"label": "Delete",
					"action": "delete"
					}
					]'
			>
				<div>Do you want to delete this change property?</div>

				<textarea
					className="border-input"
					style={{width: "100%"}} rows={5}
					on-change={(e) => onComment(e.target.value, updateState)}></textarea>

			</now-modal>
			<now-modal
				opened={state.openClosedModal}
				size='sm'
				header-label='Close Change Property'
				footer-actions='[
					{
					"variant": "primary",
					"label": "Close",
					"action": "close"
					}
					]'
			>
				<div>Do you want to close this change property?</div>

				<textarea
					className="border-input"
					style={{width: "100%"}} rows={5}
					on-change={(e) => onComment(e.target.value, updateState)}></textarea>
			</now-modal>

			<div className="sn-list-header">
				<div className="sn-list-header-title-container">
					{/*<now-icon icon="chevron-left-fill" size="md"></now-icon>*/}
					{/*<now-button title="" aria-label="Back" className="btn btn-default icon-chevron-left navbar-btn"*/}
							{/*role="link"><now-icon icon="chevron-left-fill" size="md"></now-icon></now-button>*/}
					<now-popover interaction-type="dialog"
								 positions={[{"target": "bottom-center", "content": "top-center"}]}>
						<now-button slot="trigger" icon="chevron-left-fill" size="md"/>
					</now-popover>
					<now-popover interaction-type="dialog" className="popover-left"
								 positions={[{"target": "bottom-center", "content": "top-center"}]}>
						<now-button slot="trigger" icon="menu-fill" size="md"/>
					</now-popover>
					<h4 className="now-heading -header -secondary">
						<div>Create Change Property</div>
						<div>{state.lotName}</div>
					</h4>
				</div>
				<div className="sn-list-header-title-container">
					{state.currentStatusId !== '3600' &&
						<div>
							<now-button disabled={!state.referenceId || !state.referenceCategory || !state.contents || !state.summary || state.currentStatusId === '3600'} className="margin-x2" label="Update" variant="primary" size="md" onclick={() => openPopup(state, updateState)}/>
							<now-button disabled={!state.referenceId || !state.referenceCategory || !state.contents || !state.summary || state.currentStatusId === '3600'} className="margin-x2" label="Delete" size="md" onclick={() => openDeletePopup(updateState)}/>
						</div>
					}

				</div>
			</div>
			{state.errorMessage && <div className="text-danger container now-grid">{state.errorMessage}</div>
			}
			<div className="form-group">
				<div className="change-property-info container now-grid">
					<h3 className="separate-line">Change Property Information</h3>
					<div className="sn-main-content">
						<div>
							<label htmlFor="short_description"
								   dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span mandatory="true" oclass="" className="required-marker label_description"/>
								<span title="" className="label-text" data-html="false" >Change ID</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input
								id="short_description" name="incident.short_description" autoComplete="off"
								ref={changeIDRef} disabled
								value={state.properties.changeId} aria-required="true" className="form-control select-type" required
								aria-label="Short description"/>
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="incident.short_description" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description"/>
								<span title="" className="label-text" data-html="false" >Status</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<select role="listbox" aria-required="false" aria-labelledby="label.incident.urgency"
									disabled={state.currentStatusId == '3600'}
									ref={statusRef}
									on-change={e => onStatusChange(statusRef, e, updateState)}
									className="form-control select-type" choice="3">
								{state.statusMap.map(item => (
									<option value={item.statusId} role="option" selected={item.statusId === state.currentStatusId}>{item.statusName}</option>
								))}
							</select>
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="short_description"
												  dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span mandatory="true" oclass="" className="required-marker label_description"/>
								<span title="" className="label-text" data-html="false" >*Reference ID</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input
								id="short_description" name="incident.short_description" autoComplete="off"
								ref={referIDRef}
								on-change={e => onReferenceID(referIDRef, e, updateState)}
								value={state.referenceId} aria-required="true" className="form-control" required
								aria-label="Short description"/>
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="incident.short_description" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description"/>
								<span title="" className="label-text" data-html="false" >*Reference Category</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<select role="listbox" aria-required="false" aria-labelledby="label.incident.urgency"
									ref={referCatRef}
									on-change={e => onReferenceCategory(referCatRef, e, updateState)}
									className="form-control select-type" choice="3">
								<option value=""/>
								{state.referenceCategories.map(item => (
									<option value={item} role="option" selected={item == state.referenceCategory}>{item}</option>
								))}
							</select>
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="incident.short_description" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description"/>
								<span title="" className="label-text" data-html="false" >*Summary</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<textarea rows="2" id="summary" name="summary" autoComplete="off" value={state.summary} aria-required="true"
									  ref={summaryRef}
									  className="form-control" required
									  on-change={e => onSummary(summaryRef,e, updateState)} />
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="contents" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description"/>
								<span title="" className="label-text" data-html="false" >*Contents</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<textarea rows="2" id="contents" name="contents" autoComplete="off"
							ref={contentsRef}
							on-change={e => onContents(contentsRef, e, updateState)}
						    value={state.contents} aria-required="true" className="form-control" required="true"
							aria-label="Short description"/>
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="url" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description"/>
								<span title="" className="label-text" data-html="false" >Submitter</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input id="submitter" name="url" autoComplete="off" disabled
							   value={state.submitter} aria-required="false" className="form-control select-type" required="false"
								aria-label="Short description"/>
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="incident.short_description" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description"/>
								<span title="" className="label-text" data-html="false" >Assignee</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<select role="listbox" aria-required="false" aria-labelledby="label.incident.urgency"
									ref={assigneeRef}
									on-change={e => onAssignee(assigneeRef, e, updateState)}
									className="form-control select-type" choice="3">
								<option value="" selected={!state.assigneeId}/>
								{state.assignees.map(item => (
									<option value={item.id} role="option" selected={item.name == state.assigneeName}>{item.name}</option>
								))}
							</select>
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="url" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description"/>
								<span title="" className="label-text" data-html="false" >Created Time</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input id="submitter" name="url" autoComplete="off" disabled
								   value={state.createdTime} aria-required="false" className="form-control select-type" required="false"
								   aria-label="Short description"/>
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="url" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description"/>
								<span title="" className="label-text" data-html="false" >Updated Time</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input id="submitter" name="url" autoComplete="off" disabled
								   value={state.updatedTime} aria-required="false" className="form-control select-type" required="false"
								   aria-label="Short description"/>
						</div>
					</div>
				</div>

				<div className="container now-grid">
					<h3 className="separate-line">RFC Selection</h3>
					<div className="rfc-table">
						<table className="auto" role="grid">
							<thead>
							<tr>
								<th className="-checkbox">
									<input
										ref={checkBoxRef}
										type="checkbox"
										on-change={(e) => onCheckChangeAll(checkBoxRef, state, updateState)}/>
								</th>
								{state.selectedColumns.map(item => (
									<th className="list-column-header" dir="ltr" id="id_0" role="columnheader">
										<div className="sn-text-link hide-columnreorder-off">
											<a type="button">
												<span className="column-resizing-enabled">{item.label}</span>
											</a>

										</div>
									</th>

								))}


							</tr>

							</thead>
							<tbody className="table-body">
							{state.rfcs.length ? (
									state.rfcs.map(item => (
										<tr className="row">
											<td>
												<div className="sn-grid-checkbox">
													<input
														checked={state.selectIds.indexOf(item.rfcId) > -1}
														type="checkbox"
														on-change={() => onCheckChange(item.rfcId, state, updateState)}/>
												</div>

											</td>
											{state.selectedColumns.map(column => {
												if (column.key == "rfcId") {
													return (
														<td>
															<div className="sn-text-link cursor-pointer">
																<a className="text-link"
																   on-click={() => dispatch("EVENT_QUADY_DETAIL_RFC", {'event-payload': item.rfcId})}
																>{item.rfcId}</a>
															</div>
														</td>


													);
												} else {
													return (
														<td>
															<div className="sn-text-link">
																{item[column.key]}
															</div>
														</td>

													);

												}
											})}


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

				</div>
			</div>
			<div>
				{state.currentStatusId !== '3600' && <now-button disabled={!state.referenceId || !state.referenceCategory || !state.contents || !state.summary || state.currentStatusId === '3600'} className="margin-x2 submit-button" label="Update" variant="primary" size="md"/> }
			</div>
		</div>
	);
};

createCustomElement('bllt-quady-chgpr-detail', {
	renderer: {type: snabbdom},
	view,
	styles,
	initialState: {
		showLoading: true,
		errorMessage: "",
		openClosedModal: false,
		openDeleteModal: false,
		openModal: false,
		lotId: "LOT-2205120002",
		lotName: "",
		referenceId: "",
		referenceCategory: "",
		summary: "",
		contents: "",
		assigneeId: "",
		assigneeName: "",
		createdTime: "",
		updatedTime: "",
		submitter: "",
		statusId: "",
		selectIds: [],
		rfcs: [],
		assignees: [],
		currentStatusId: "",
		referenceCategories: [],
		statusMap : [
			{
				statusId: 3100,
				statusName: "In Progress",
			},
			{
				statusId: 3200,
				statusName: "Approved",
			},
			{
				statusId: 3500,
				statusName: "Approval Cancelled",
			},
			{
				statusId: 3600,
				statusName: "Closed",
			},
			{
				statusId: 3700,
				statusName: "Test Completed",
			}
		],
		selectedColumns: LIST_RFC_COLUMN,
		dialogComment: ""

	},
	properties: {
		lotId: {default: "LOT-2205120002"},
		changeId: {default: "PJT-2205120002"}
	},
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: initChangeProperty,
		"NOW_MODAL#FOOTER_ACTION_CLICKED" : ({ action, state, updateState, dispatch }) => {
			if (state.openDeleteModal) {
				const url = "https://jenkins.quady-cloud.com/trinity/api/sn/chgproperty/remove/" + state.properties.changeId;
				let data = {
					comment: state.dialogComment
				};
				fetch(url, {
					method: 'put',
					headers: {
						'Accept': 'application/json, text/plain, */*',
						'Content-Type': 'application/json',
						'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA'
					},
					body: JSON.stringify(data)
				})
					.then(function (response) {
						updateState({openDeleteModal: false});
						return response.json();
					})
					.then(function (result) {
						dispatch("EVENT_QUADY_BACK_TO_LIST", { });
					})
					.catch(function (error) {
						updateState({openDeleteModal: false,
							errorMessage: error.error.message});
						console.log('Request failed', error);
					});
			} else if (state.openClosedModal) {
				const url = "https://jenkins.quady-cloud.com/trinity/api/sn/chgproperty/close/" + state.properties.changeId;
				let data = {
					comment: state.dialogComment
				};
				fetch(url, {
					method: 'put',
					headers: {
						'Accept': 'application/json, text/plain, */*',
						'Content-Type': 'application/json',
						'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA'
					},
					body: JSON.stringify(data)
				})
					.then(res => {
						updateState({openClosedModal: false});
						return res.json();
					})
					.then(function (result) {
						if (result.messages && result.messages.length > 0) {
							updateState({errorMessage:  result.messages[0]});
						}
						console.log(result);
						dispatch("EVENT_QUADY_BACK_TO_LIST", { });
					})
					.catch(function (error) {
						updateState({openClosedModal: false,
						errorMessage: error.error.message});
						console.log('Request failed', error);
					});
			} else {
				const url = "https://jenkins.quady-cloud.com/trinity/api/sn/chgproperty/edit/" + state.properties.changeId;
				let data = {
					referenceId: state.referenceId,
					referenceCategory: state.referenceCategory,
					summary: state.summary,
					contents: state.contents,
					assigneeId: state.assigneeId || (state.assignees.filter(item => item.assigneeName === state.assigneeName) || {}).id,
					rfcIds: state.selectIds,
				};
				fetch(url, {
					method: 'put',
					headers: {
						'Accept': 'application/json, text/plain, */*',
						'Content-Type': 'application/json',
						'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA'
					},
					body: JSON.stringify(data)
				})
					.then(function (response) {
						updateState({openModal: false});
						dispatch("INIT_CHANGE_PROPERTY", {});
						return response.json();
					})
					.then(function (result) {
						dispatch("EVENT_QUADY_BACK_TO_LIST", { });
					})
					.catch(function (error) {
						updateState({openModal: false});
						console.log('Request failed', error);
					});
			}
		},
		"NOW_MODAL#OPENED_SET": ({ action, state, updateState }) =>{
			updateState({openModal: action.payload.value});
		},


		SUBMIT_RFC_REQUESTED: ({ action, state, updateState }) => {
			updateState({openModal: action.payload.value});
		},

		INIT_CHANGE_PROPERTY: ({action, state, updateState}) => {
			const urlDetail = "https://jenkins.quady-cloud.com/trinity/api/sn/chgproperty/details/" + state.properties.changeId;
			fetch(urlDetail, {
				method: 'get',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
					'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA'
				}
			})
				.then(function (response) {
					return response.json();
				})
				.then(function (result) {
					updateState({
						selectIds: result.rfc.map(function(item) {
							return item['rfcId'];
						}),
						currentStatusId: result.statusId,
						referenceId: result.referenceId,
						referenceCategory: result.referenceCategory,
						summary: result.summary,
						contents: result.contents,
						assigneeName: result.assignee,
						createdTime: result.createdTime,
						updatedTime: result.updatedTime,
						submitter: result.submitter
					});
					if (result.lotId) {
						const url = "https://jenkins.quady-cloud.com/trinity/api/sn/chgproperty/init/" + state.lotId;
						fetch(url, {
							method: 'get',
							headers: {
								'Accept': 'application/json, text/plain, */*',
								'Content-Type': 'application/json',
								'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA'
							},
							//body: JSON.stringify(data)
						})
							.then(function (response) {
								//updateState({openModal: false});
								return response.json();
							})
							.then(function (result) {
								updateState({
									rfcs: result.rfc,
									assignees: result.assignees,
									referenceCategories: result.referenceCategories,
									lotName: result.lotName
								});
							})
							.catch(function (error) {
								updateState({openModal: false});
								console.log('Request failed', error);
							});
					}
				})
				.catch(function (error) {
					console.log('Request failed', error);
				});

		}
	}
});
