import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import {snabbdom, createRef} from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import '@servicenow/now-icon';
import '@servicenow/now-button';
import '@servicenow/now-popover';
import '@servicenow/now-modal';
import '@servicenow/now-card';
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

const openPopup = (updateState) => {
	updateState({openModal: true});
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

const view = (state, {updateState ,dispatch}) => {
	const referIDRef = createRef();
	const referCatRef = createRef();
	const assigneeRef = createRef();
	const summaryRef = createRef();
	const contentsRef = createRef();
	const checkBoxRef = createRef();
	return (
		<div>
			<now-modal
				opened={state.openModal}
				size='sm'
				header-label='Create New Change Property'
				footer-actions='[
             {
              "variant": "primary",
              "label": "Save"
              }
             ]'
			>
				Do you want to save new Change Property?
			</now-modal>
			<div className="sn-list-header">
				<div className="sn-list-header-title-container">
					{/*<now-icon icon="chevron-left-fill" size="md"></now-icon>*/}
					{/*<now-button title="" aria-label="Back" className="btn btn-default icon-chevron-left navbar-btn"*/}
							{/*role="link"><now-icon icon="chevron-left-fill" size="md"></now-icon></now-button>*/}
				
						<now-button
						     on-click={() => dispatch("EVENT_QUADY_BACK_TO_LIST", { })}  
							  icon="chevron-left-fill" size="md"/>
					<now-popover interaction-type="dialog" className="popover-left"
								 positions={[{"target": "bottom-center", "content": "top-center"}]}>
						<now-button slot="trigger" icon="menu-fill" size="md"/>
					</now-popover>
					<h4 className="now-heading -header -secondary">
						<div>Create Change Property</div>
						<div>{state.properties.lotId}</div>
					</h4>
				</div>
				<div className="sn-list-header-title-container">
					<now-button disabled={!state.referenceId || !state.referenceCategory || !state.contents || !state.summary} className="margin-x2" label="Submit" variant="primary" size="md" onclick={() => openPopup(updateState)}/>
				</div>
			</div>
			<div className="form-group">
				<div className="change-property-info container now-grid">
					<h3 className="separate-line">Change Property Information</h3>
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
								value="" aria-required="true" className="form-control" required
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
									<option value={item} role="option">{item}</option>
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
							<textarea rows="2" id="summary" name="summary" autoComplete="off" value="" aria-required="true"
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
							value="" aria-required="true" className="form-control" required="true"
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
								value="" aria-required="false" className="form-control select-type" required="false"
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
								<option value=""/>
								{state.assignees.map(item => (
									<option value={item.id} role="option">{item.name}</option>
								))}
							</select>
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
					{/*<table className="auto rfc-table" role="grid">*/}
						{/*<thead>*/}
						{/*<tr>*/}
							{/*<th className="-checkbox">*/}
								{/*<input*/}
									{/*ref={checkBoxRef}*/}
									{/*type="checkbox"*/}
									{/*onChange={(e) => onCheckChangeAll(checkBoxRef, state, updateState)}/>*/}
							{/*</th>*/}
							{/*<th className="list-column-header" dir="ltr" id="id_0" role="columnheader">*/}
								{/*<div className="sn-text-link hide-columnreorder-off">*/}
									{/*<a type="button">*/}
										{/*<span className="column-resizing-enabled">ID</span>*/}
									{/*</a>*/}

								{/*</div>*/}
							{/*</th>*/}
							{/*<th className="list-column-header" dir="ltr" id="subject-1" scope="col" title="Subject"*/}
								{/*role="columnheader">*/}
								{/*<div className="sn-text-link hide-columnreorder-off">*/}
									{/*<a type="button">*/}
										{/*<span className="column-resizing-enabled">Subject</span>*/}
									{/*</a>*/}

								{/*</div>*/}
							{/*</th>*/}
							{/*<th className="list-column-header" dir="ltr" id="url-2" scope="col" title="URL"*/}
								{/*role="columnheader">*/}
								{/*<div className="sn-text-link hide-columnreorder-off">*/}
									{/*<a type="button">*/}
										{/*<span className="column-resizing-enabled">Summary</span>*/}
									{/*</a>*/}

								{/*</div>*/}
							{/*</th>*/}
							{/*<th className="list-column-header" dir="ltr" id="create-time-3" scope="col"*/}
								{/*title="Create time" role="columnheader">*/}
								{/*<div className="sn-text-link hide-columnreorder-off">*/}
									{/*<a type="button">*/}
										{/*<span className="column-resizing-enabled">Created By</span>*/}
									{/*</a>*/}
								{/*</div>*/}
							{/*</th>*/}
							{/*<th className="list-column-header" dir="ltr" id="update-time-4" scope="col"*/}
								{/*title="Updated time" role="columnheader">*/}
								{/*<div className="sn-text-link hide-columnreorder-off">*/}
									{/*<a type="button">*/}
										{/*<span className="column-resizing-enabled">Status</span>*/}
									{/*</a>*/}
								{/*</div>*/}
							{/*</th>*/}
							{/*<th className="list-column-header" dir="ltr" id="update-time-4" scope="col"*/}
								{/*title="Updated time" role="columnheader">*/}
								{/*<div className="sn-text-link hide-columnreorder-off">*/}
									{/*<a type="button">*/}
										{/*<span className="column-resizing-enabled">URL</span>*/}
									{/*</a>*/}
								{/*</div>*/}
							{/*</th>*/}
						{/*</tr>*/}

						{/*</thead>*/}
						{/*<tbody className="table-body">*/}
						{/*{state.rfcs.length ? (*/}
								{/*state.rfcs.map(item => (*/}
									{/*<tr className="row">*/}
										{/*<td>*/}
											{/*<div className="sn-grid-checkbox">*/}
												{/*<input*/}
													{/*checked={state.selectIds.indexOf(item.rfcId) > -1}*/}
													{/*type="checkbox"*/}
													{/*onChange={() => onCheckChange(item.rfcId, state, updateState)}/>*/}
											{/*</div>*/}

										{/*</td>*/}

										{/*<td>*/}
											{/*<div className="sn-text-link cursor-pointer">*/}
												{/*<a className="text-link"*/}
												   {/*on-click={() => dispatch("EVENT_DETAIL", {'event-payload': item.rfcId})}*/}
												{/*>{item.rfcId}</a>*/}
											{/*</div>*/}
										{/*</td>*/}
										{/*<td>*/}
											{/*<div className="sn-text-link">*/}
												{/*{item.subject}*/}
											{/*</div>*/}
										{/*</td>*/}

										{/*<td>*/}
											{/*<div className="sn-text-link">*/}
												{/*{item.summary}*/}
											{/*</div>*/}
										{/*</td>*/}
										{/*<td>*/}
											{/*<div className="sn-text-link">*/}
												{/*{item.createdBy}*/}
											{/*</div>*/}
										{/*</td>*/}
										{/*<td>*/}
											{/*<div className="sn-text-link">*/}
												{/*{item.status}*/}
											{/*</div>*/}
										{/*</td>*/}
										{/*<td>*/}
											{/*<div className="sn-text-link">*/}
												{/*{item.URL}*/}
											{/*</div>*/}
										{/*</td>*/}
									{/*</tr>*/}
								{/*))*/}
							{/*) :*/}
							{/*(*/}
								{/*<div className="bottom-paging">Data is empty</div>*/}
							{/*)*/}
						{/*}*/}

						{/*</tbody>*/}

					{/*</table>*/}

				</div>
			</div>
			<div>
				<now-button disabled={!state.referenceId || !state.referenceCategory || !state.contents || !state.summary} className="margin-x2 submit-button" label="Submit" variant="primary" size="md"/>
			</div>
		</div>
	);
};

createCustomElement('bllt-quady-chgpr-create', {
	renderer: {type: snabbdom},
	view,
	styles,
	initialState: {
		showLoading: true,
		openModal: false,
		lotId: "LOT-2203250001",
		referenceId: "",
		referenceCategory: "",
		summary: "",
		contents: "",
		assigneeId: "",
		selectIds: [],
		rfcs: [],
		assignees: [],
		referenceCategories: [],
		selectedColumns: LIST_RFC_COLUMN

	},
	properties: {
		lotId: {default: ""},
	},
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: initChangeProperty,
		"NOW_MODAL#FOOTER_ACTION_CLICKED" : ({ action, state, updateState, dispatch }) => {
			const url = "https://jenkins.quady-cloud.com/trinity/api/sn/chgproperty/create/" + state.properties.lotId;
			let data = {
				referenceId: state.referenceId,
				referenceCategory: state.referenceCategory,
				summary: state.summary,
				contents: state.contents,
				assigneeId: state.assigneeId,
				rfcIds: state.selectIds,
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
					return response.json();
				})
				.then(function (result) {
					dispatch("EVENT_QUADY_BACK_TO_LIST", { })

				})
				.catch(function (error) {
					updateState({openModal: false});
					console.log('Request failed', error);
				});

		},
		"NOW_MODAL#OPENED_SET": ({ action, state, updateState }) =>{
			updateState({openModal: action.payload.value});
		},


		SUBMIT_RFC_REQUESTED: ({ action, state, updateState }) => {
			updateState({openModal: action.payload.value});
		},

		INIT_CHANGE_PROPERTY: ({action, state, updateState}) => {
			const url = "https://jenkins.quady-cloud.com/trinity/api/sn/chgproperty/init/" + state.properties.lotId;
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
						referenceCategories: result.referenceCategories
					});
				})
				.catch(function (error) {
					updateState({openModal: false});
					console.log('Request failed', error);
				});
		}
	}
});
