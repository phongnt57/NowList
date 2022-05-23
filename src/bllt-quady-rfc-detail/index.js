import {actionTypes, createCustomElement} from '@servicenow/ui-core';
import {snabbdom, createRef} from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import '@servicenow/now-icon';
import '@servicenow/now-button';
import '@servicenow/now-popover';
import '@servicenow/now-modal';
import '@servicenow/now-card';


const initRfc = ({ state, dispatch }) => {
	dispatch("INIT_RFC", {});
};


const onSubject = (subjectRef, e, updateState) => {
	const subject = subjectRef.current.value;
	console.log(subject);
	 updateState({subject: subject});


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

const onUrl = (urlRef, e, updateState) => {
	const url = urlRef.current.value;
	console.log(url);
	updateState({url: url});

};

const onStatusChange = (statusRef, e, updateState) => {
	const stsRef = statusRef.current.value;
	console.log(stsRef);
	updateState({statusId: stsRef});
};

const openPopup = (state, updateState) => {
	if (state.statusId === '6200') {
		updateState({openClosedModal: true});
	} else {

		updateState({openModal: true, openDeleteModal: false, openClosedModal: false});
	}
};

const openDeletePopup = (updateState) => {
	updateState({openDeleteModal: true});
};

const onComment = (comment, updateState) => {
	updateState({ dialogComment: comment });
};


const view = (state, {updateState, dispatch}) => {
	const subjectRef = createRef();
	const summaryRef = createRef();
	const contentsRef = createRef();
	const urlRef = createRef();
	const statusRef = createRef();
	return (
		<div>
			<now-modal
				opened={state.openModal}
				size='sm'
				header-label='Update RFC'
				footer-actions='[
             {
              "variant": "primary",
              "label": "Save"
              }
             ]'
			>
				Do you want to update this RFC?
			</now-modal>
			<now-modal
				opened={state.openDeleteModal}
				size='sm'
				header-label='Delete RFC'
				footer-actions='[
					{
					"variant": "primary",
					"label": "Delete",
					"action": "delete"
					}
					]'
			>
				<div>Do you want to delete this RFC?</div>

				<textarea
					className="border-input"
					style={{width: "100%"}} rows={5}
					on-change={(e) => onComment(e.target.value, updateState)}></textarea>

			</now-modal>
			<now-modal
				opened={state.openClosedModal}
				size='sm'
				header-label='Close RFC'
				footer-actions='[
					{
					"variant": "primary",
					"label": "Close",
					"action": "close"
					}
					]'
			>
				<div>Do you want to close this RFC?</div>

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
						<now-button slot="trigger" icon="chevron-left-fill" size="md"  on-click={() => dispatch("EVENT_QUADY_BACK_TO_LIST", { })}/>
					</now-popover>
					<now-popover interaction-type="dialog" className="popover-left"
								 positions={[{"target": "bottom-center", "content": "top-center"}]}>
						<now-button slot="trigger" icon="menu-fill" size="md"/>
					</now-popover>
					<h4 className="now-heading -header -secondary">
						<div>RFC Details</div>
					</h4>
				</div>
				<div className="sn-list-header-title-container">
					{state.currentStatusId !== '3600' &&
					<div>
						<now-button disabled={!state.subject || !state.contents || !state.summary || state.currentStatusId == '6200'} className="margin-x2" label="Update" variant="primary" size="md" onclick={() => openPopup(state, updateState)}/>
						<now-button disabled={state.currentStatusId == '6200' || state.currentStatusId == '6300'} className="margin-x2" label="Delete" size="md" onclick={() => openDeletePopup(updateState)}/>
					</div>
					}

				</div>
			</div>
			{state.errorMessage && <div className="text-danger container now-grid">{state.errorMessage}</div>
			}
			<div className="form-group">
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
							disabled
							value={state.properties.rfcId} aria-required="true" className="form-control select-type" required
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
								disabled={state.currentStatusId == '6200'}
								ref={statusRef}
								on-change={e => onStatusChange(statusRef, e, updateState)}
								className="form-control select-type" choice="3">
							{state.statusMap.map(item => (
								<option value={item.statusId} role="option" selected={item.statusId == state.currentStatusId}>{item.statusName}</option>
							))}
						</select>
					</div>
				</div>
				<div className="sn-main-content">
					<div>
						<label htmlFor="short_description"
											  dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
							<span mandatory="true" oclass="" className="required-marker label_description"/>
							<span title="" className="label-text" data-html="false" >*Subject</span>
						</label>
					</div>
					<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
						<input
							id="short_description" name="incident.short_description" autoComplete="off"
							ref={subjectRef}
							on-change={e => onSubject(subjectRef, e, updateState)}
							value={state.subject} aria-required="true" className="form-control" required
							aria-label="Short description"/>
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
						<textarea rows="4" id="summary" name="summary" autoComplete="off" value={state.summary} aria-required="true"
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
						<textarea rows="4" id="contents" name="contents" autoComplete="off"
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
							<span title="" className="label-text" data-html="false" >Url</span>
						</label>
					</div>
					<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
						<input id="url" name="url" autoComplete="off"
							ref={urlRef}
						    on-change={e => onUrl(urlRef, e, updateState)}
							value={state.url} aria-required="false" className="form-control" required="false"
							aria-label="Short description"/>
					</div>
				</div>
			</div>
			<div>
				<now-button disabled={!state.subject || !state.summary || !state.contents || state.currentStatusId === '6200'} className="margin-x2" label="Update" variant="primary" size="md" onclick={() => openPopup(state, updateState)}/>
			</div>
		</div>
	);
};

createCustomElement('bllt-quady-rfc-detail', {
	renderer: {type: snabbdom},
	view,
	styles,
	initialState: {
		showLoading: true,
		openModal: false,
		subject: "",
		summary: "",
		contents: "",
		url: "",
		status:"",
		errorMessage: "",
		openClosedModal: false,
		openDeleteModal: false,
		currentStatusId: "",
		statusId: "",
		statusMap : [
			{
				statusId: 6100,
				statusName: "In Progress",
			},
			{
				statusId: 6200,
				statusName: "Closed",
			},
			{
				statusId: 6300,
				statusName: "Deleted",
			}
		],
		dialogComment: ""

	},
	properties: {
		rfcId: {default: "RFC-2204220001"}
	},
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: initRfc,
		"NOW_MODAL#FOOTER_ACTION_CLICKED" : ({ action, state, updateState, dispatch }) => {
			if (state.openDeleteModal) {
				const url = "https://jenkins.quady-cloud.com/trinity/api/sn/rfc/remove/" + state.properties.rfcId;
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
				const url = "https://jenkins.quady-cloud.com/trinity/api/sn/rfc/close/" + state.properties.rfcId;
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
							return;
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
				const url = "https://jenkins.quady-cloud.com/trinity/api/sn/rfc/edit/" + state.properties.rfcId;
				let data = {
					subject: state.subject,
					summary: state.summary,
					contents: state.contents,
					url: state.url
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

		INIT_RFC: ({action, state, updateState}) => {
			const urlDetail = "https://jenkins.quady-cloud.com/trinity/api/sn/rfc/details/" + state.properties.rfcId;
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
						summary: result.summary,
						contents: result.contents,
						subject: result.subject,
						currentStatusId: result.statusId,
						url: result.url
					});
				})
				.catch(function (error) {
					console.log('Request failed', error);
				});

		}
	}
});
