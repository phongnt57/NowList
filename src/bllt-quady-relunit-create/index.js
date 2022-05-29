import {actionTypes, createCustomElement} from '@servicenow/ui-core';
import {snabbdom, createRef} from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import '@servicenow/now-icon';
import '@servicenow/now-button';
import '@servicenow/now-popover';
import '@servicenow/now-modal';
import '@servicenow/now-card';
import '@servicenow/now-input';


const initReleaseUnit = ({ state, dispatch }) => {
	dispatch("INIT_RELEASE_UNIT", {});
};

const onSubject = (subjectRef, e, updateState) => {
	const subject = subjectRef.current.value;
	console.log(subject);
	 updateState({subject: subject});


};

const onSummary = (summaryRef, e, updateState) => {
	const summary = summaryRef.current.value;
	console.log(summary);
	updateState({summary: summary});

};

const openPopup = (updateState) => {
	updateState({openModal: true});
};

const onCheckChangeAll = (ref, state, updateState) => {
	if (ref.current.checked) {
		let seletedIds = state.changeProperties.map(item => item.changeId);
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

const onAgreementCheck =  (ref, state, updateState) => {
	if (ref.current.checked) {
		updateState({ submitAgreement: true });
	} else {
		updateState({ submitAgreement: false });
	}
}

const view = (state, {updateState}) => {
	const subjectRef = createRef();
	const summaryRef = createRef();
	const checkBoxRef = createRef();
	const agreementRef = createRef();
	return (
		<div>
			<now-modal
				opened={state.openModal}
				size='sm'
				header-label='Create New Release Unit'
				footer-actions='[
             {
              "variant": "primary",
              "label": "Save"
              }
             ]'
			>
				Do you want to save Release Unit?
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
						<div>Create Release Unit</div>
						<div>{state.lotName}</div>
					</h4>
				</div>
				<div className="sn-list-header-title-container">
					<now-button disabled={!state.subject || !state.summary || (state.errorMessages && state.errorMessages.length > 0 && !state.submitAgreement)} className="margin-x2" label="Submit" variant="primary" size="md" onclick={() => openPopup(updateState)}/>
				</div>
			</div>
			{
				state.errorMessages && state.errorMessages.length > 0 ?
					(<div className="error-section">
						<div>
							<input
								ref={agreementRef}
								type="checkbox"
								on-change={(e) => onAgreementCheck(agreementRef, state, updateState)}/>
							<span>[BM001008E] : There are some restrictions to create Release Unit as in the followings. Are you sure you want to create Release Unit?</span>
						</div>
						{state.errorMessages.map(item => (
						<div className="text-danger now-grid"><now-icon icon="triangle-exclamation-fill" size="md"></now-icon>{item}</div>))}
					</div>): ''
			}
			<div className="form-group">
				<div className="change-property-info container now-grid">
					<h3 className="separate-line">Unit Information</h3>
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
								value="" aria-required="true" className="form-control" required
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
							<textarea rows="4" id="summary" name="summary" autoComplete="off" value="" aria-required="true"
									  ref={summaryRef}
									  className="form-control" required
									  on-change={e => onSummary(summaryRef,e, updateState)} />
						</div>
					</div>
				</div>
				<div className="container now-grid">
					<h3 className="separate-line">Change Property Selection</h3>
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
							{state.changeProperties.length ? (
									state.changeProperties.map(item => (
										<tr className="row">
											<td>
												<div className="sn-grid-checkbox">
													<input
														checked={state.selectIds.indexOf(item.changeId) > -1}
														type="checkbox"
														on-change={() => onCheckChange(item.changeId, state, updateState)}/>
												</div>

											</td>
											{state.selectedColumns.map(column => {
												if (column.key == "rfc") {
													return (
														<td>
															{item[column.key] && item[column.key].length > 0?
																item[column.key].map(rfc => (<div className="sn-text-link cursor-pointer">
																		<a>{rfc["rfcId"]}</a>
																	</div>)) : ''
															}
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
				<now-button disabled={!state.subject || !state.summary || (state.errorMessages && state.errorMessages.length > 0 && !state.submitAgreement)} className="margin-x2 submit-button" label="Submit" variant="primary" size="md"/>
			</div>
		</div>
	);
};

createCustomElement('bllt-quady-relunit-create', {
	renderer: {type: snabbdom},
	view,
	styles,
	initialState: {
		errorMessages: [],
		lotName: "",
		showLoading: true,
		openModal: false,
		subject: "",
		summary: "",
		contents: "",
		submitAgreement: false,
		changeProperties: [],
		selectedColumns: [
			{
				"key": "changeId","label": "Change ID"
			},

			{
				"key": "referenceId","label": "Reference ID"
			},
			{
				"key": "subject","label": "Subject"
			},
			{
				"key": "submitter","label": "Submitter"
			},
			{
				"key": "approvedTime","label": "Approved Time"
			},
			{
				"key": "rfc","label": "RFC Items"
			},

		],
		selectIds: []
	},
	properties: {
		lotId: {default: "LOT-2205120002"}
	},
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: initReleaseUnit,
		"NOW_MODAL#FOOTER_ACTION_CLICKED" : ({ action, state, updateState, dispatch }) => {
			const API = "https://jenkins.quady-cloud.com/trinity/api/sn/ru/create/" + state.properties.lotId;
			let data = {
				subject: state.subject,
				summary: state.summary,
				submitAgreement: state.submitAgreement,
				changePropertyIds: state.selectIds
			};
			fetch(API, {
				method: 'post',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
					'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA'
				},
				body: JSON.stringify(data)
			})
				.then(function (response) {
					updateState({openModal: false});
					return response.json();
				})
				.then(function (result) {
					dispatch("EVENT_QUADY_BACK_TO_LIST", { });
				})
				.catch(function (error) {
					updateState({openModal: false});
					console.log('Request failed', error);
				});

		},
		"NOW_MODAL#OPENED_SET": ({ action, state, updateState }) =>{
			//updateState({openModal: action.payload.value});
		},


		SUBMIT_RELEASE_UNIT_REQUESTED: ({ action, state, updateState }) => {

		},

		INIT_RELEASE_UNIT: ({action, state, updateState}) => {
			const url = "https://jenkins.quady-cloud.com/trinity/api/sn/ru/init/" + state.properties.lotId;
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
					updateState({openModal: false});
					return response.json();
				})
				.then(function (result) {
					updateState({
						//errorMessages: result.messages,
						lotName: result.lotName,
						changeProperties: result.changeProperties
					});
				})
				.catch(function (error) {
					updateState({openModal: false});
					console.log('Request failed', error);
				});
		}
	}
});

