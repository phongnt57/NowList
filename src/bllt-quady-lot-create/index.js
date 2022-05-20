import { createCustomElement, actionTypes } from '@servicenow/ui-core';
import { snabbdom, createRef } from '@servicenow/ui-renderer-snabbdom';
import styles from '../styles.scss';
import '@servicenow/now-icon';
import '@servicenow/now-button';
import '@servicenow/now-popover';
import '@servicenow/now-modal';
import '@servicenow/now-card';
import { DEFAULT_BASE_URL, api, headers } from './constants'

const initLotInfo = ({ state, dispatch }) => {
	dispatch("INIT_LOT", {});
};




const onDetailChange = (key, e, updateState, state) => {
	const value = e.target.value;
	console.log(value);
	let detail = { ...state.detail };
	detail[key] = value;

	updateState({ detail: detail });

};

const onCheckBoxOption = (key, e, state, updateState) => {
	const check = e.target.checked;
	const detail = { ...state.detail };
	let options = detail.options;
	options[key] = check;
	updateState({ detail: detail });

};

const onChangeOptionMerge = (e, state, updateState) => {
	const check = e.target.value;
	const detail = { ...state.detail };
	detail.resourceAddRequestOption = check;
	updateState({ detail: detail });

}

const onReleaseBaseLineChange = (e, updateState, state) => {
	const value = e.target.value;
	const detail = { ...state.detail };
	detail.releaseBaselineEnvId = value;
	updateState({ detail: detail });

}

const onReleaseUnitChange = (e, updateState, state) => {
	console.log(e);
	const value = e.target.value;
	const detail = { ...state.detail };
	detail.releaseUnitEnvId = value;
	updateState({ detail: detail });

}

const onCheckBoxPublicPath = (e, state, updateState) => {
	const isDefault = e.target.checked;
	const detail = { ...state.detail };
	if (isDefault) {
		detail.useDefaultPublicPath = true;
		detail.publicPath = "C:/user";
	} else detail.useDefaultPublicPath = false;
	updateState({ detail: detail });
}

const onCheckBoxPrivatePath = (e, state, updateState) => {
	const detail = { ...state.detail };
	const isDefault = e.target.checked;
	if (isDefault) {
		detail.useDefaultPrivatePath = true;
		detail.privatePath = "C:/sys";
	} else detail.useDefaultPrivatePath = false;
	console.log(detail)
	updateState({ detail: detail });
}

const openPopup = (state, updateState) => {
	if (isDisable(state)) return;
	updateState({ openModal: true });
};



const onCheckBoxAuthorizedGroup = (id, state, updateState) => {
	let authorizedGroups = [...state.detail.authorizedGroups];
	let index = authorizedGroups.indexOf(id);
	if (index > -1) {
		authorizedGroups.splice(index, 1);
	} else {
		authorizedGroups.push(id);
	}
	const detail = { ...state.detail };
	detail.authorizedGroups = authorizedGroups;
	updateState({ detail: detail });

}

const onCheckBoxModule = (id, state, updateState) => {
	let modules = [...state.detail.modules];
	let index = modules.indexOf(id);
	if (index > -1) {
		modules.splice(index, 1);
	} else {
		modules.push(id);
	}
	const detail = { ...state.detail };
	detail.modules = modules;
	updateState({ detail: detail });
}

const onCheckBoxReleasePackage = (id, state, updateState) => {
	let releasePackageEnvIds = [...state.detail.releasePackageEnvIds];
	let index = releasePackageEnvIds.indexOf(id);
	if (index > -1) {
		releasePackageEnvIds.splice(index, 1);
	} else {
		releasePackageEnvIds.push(id);
	}
	const detail = { ...state.detail };
	detail.releasePackageEnvIds = releasePackageEnvIds;
	updateState({ detail: detail });
}

const isDisable = (state) => {
	const detail = state.detail;
	return !detail.lotName || !detail.summary || !detail.summary || !detail.baselineTag || !detail.publicPath || !detail.privatePath
		|| detail.modules.length == 0 || !detail.releaseBaselineEnvId || !detail.releaseUnitEnvId;

}

const view = (state, { updateState }) => {
	const disableSave = isDisable(state);
	return (
		<div>
			<now-modal
				opened={state.openModal}
				size='sm'
				header-label='Create Lot'
				footer-actions='[
             {
              "variant": "primary",
              "label": "Save"
              }
             ]'
			>
				Do you want to save new Lot?
			</now-modal>
			<div className="sn-list-header">
				<div className="sn-list-header-title-container">
					<now-button slot="trigger" icon="chevron-left-fill" size="md" />
					<now-popover interaction-type="dialog" className="popover-left"
						positions={[{ "target": "bottom-center", "content": "top-center" }]}>
						<now-button slot="trigger" icon="menu-fill" size="md" className="margin-x2" />
					</now-popover>
					<h4 className="now-heading -header -secondary">
						<div>Create Lot</div>
					</h4>
				</div>
				<div className="sn-list-header-title-container">
					<now-button disabled={disableSave}
						className="margin-x2" label="Submit" variant="primary" size="md" onclick={() => openPopup(state, updateState)} />
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
				<div className="change-property-info container now-grid">
					<h3 className="separate-line">Lot Information</h3>
					<div className="sn-main-content">
						<div>
							<label htmlFor="short_description"
								dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span mandatory="true" oclass="" className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >*Lot Name</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input
								name="lotname"
								onchange={e => onDetailChange("lotName", e, updateState, state)}
								aria-required="true" className="form-control" required
							/>
						</div>
					</div>

					<div className="sn-main-content">
						<div>
							<label htmlFor="incident.short_description" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >*Summary</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<textarea rows="2" id="summary" name="summary" autoComplete="off" value="" aria-required="true"
								className="form-control" required
								on-change={e => onDetailChange("summary", e, updateState, state)} />
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="contents" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >*Contents</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<textarea rows="2" id="contents" name="contents" autoComplete="off"
								on-change={e => onDetailChange("contents", e, updateState, state)}
								value="" aria-required="true" className="form-control" required="true"
								aria-label="Short description" />
						</div>
					</div>
					<div className="sn-main-content">
						<div>
							<label htmlFor="url" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >*Baseline Tag</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input
								on-change={e => onDetailChange("baselineTag", e, updateState, state)}
								name="baseline" autoComplete="off"
								value="" aria-required="false" className="form-control select-type" required="false"
								aria-label="Short description" />
						</div>
					</div>

					<div className="sn-main-content">
						<div>
							<label htmlFor="url" dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >*Option</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">

							<input
								type="checkbox"
								onchange={(e) => onCheckBoxOption("useResourceAddRequest", e, state, updateState)} />
							<label > Use Resource Add Request</label>
							<br />
							{state.detail.options.useResourceAddRequest ?
								<div className="input_controls">
									<div className="input_controls">If there is added file without add request</div>
									<div className="input_controls">
										<input id="merge_0" on-change={(e) => onChangeOptionMerge(e, state, updateState)} type="radio" name="output" value="0" />
										<label for="merge_0">Don't output Error and Warning</label><br />
										<input id="merge_1" on-change={(e) => onChangeOptionMerge(e, state, updateState)} type="radio" name="output" value="1" />
										<label for="merge_1">Output Warning</label><br />
										<input id="merge_2" on-change={(e) => onChangeOptionMerge(e, state, updateState)} type="radio" name="output" value="2" />
										<label for="merge_2">Output Error</label>
									</div>
									<br />
								</div>
								: null
							}


							<input
								type="checkbox"
								onchange={(e) => onCheckBoxOption("useMerge", e, state, updateState)} />
							<label > Mergeable Lot</label>
							<br />
							<input
								type="checkbox"
								onchange={(e) => onCheckBoxOption("useStrictApproval", e, state, updateState)} />
							<label >Strict Approval Process</label><br />
							<div className="input_controls">Make it impossible to approve without pressing "View difference"</div>
						</div>
					</div>

				</div>

				<div className="container now-grid">
					<h3 className="separate-line">Folder Information</h3>
					<div className="sn-main-content">
						<div>
							<label htmlFor="short_description"
								dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span mandatory="true" oclass="" className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >*Public Path</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input
								name="publicpath"
								disabled={state.detail.useDefaultPublicPath}
								value={state.detail.publicPath}
								on-change={e => onDetailChange("publicPath", e, updateState, state)}
								className="form-control" required
							/>
							<input
								type="checkbox"
								onchange={(e) => onCheckBoxPublicPath(e, state, updateState)} />
							<label>Use default setting C:/user/</label>
						</div>
					</div>

					<div className="sn-main-content">
						<div>
							<label htmlFor="short_description"
								dir="ltr" className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span mandatory="true" oclass="" className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >*Private Path</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<input
								name="privatepath"
								disabled={state.detail.useDefaultPrivatePath}
								value={state.detail.privatePath}
								on-change={e => onDetailChange("privatePath", e, updateState, state)}
								className="form-control" required
							/>

							<input
								type="checkbox"
								onchange={(e) => onCheckBoxPrivatePath(e, state, updateState)} />
							<label>Use default setting C:/sys/</label>
						</div>
					</div>



				</div>

				<div className="container now-grid">
					<h3 className="separate-line">Authorized Group Setting</h3>
					<div className="child-table">

						{state.authorizedGroups.map(item => (<div className="input_controls">

							<input
								type="checkbox"
								onchange={(e) => onCheckBoxAuthorizedGroup(item, state, updateState)} />
							<label for="">{item}</label>

						</div>))}
						<div className="explain-text">If none specified, by default all groups will be selected.</div>

					</div>




				</div>

				<div className="container now-grid">
					<h3 className="separate-line">Module Selection</h3>
					<div className="child-table">
						<table className="auto content-table" role="grid">
							<thead>
								<tr>
									<th></th>
									<th>Module name</th>
									<th>Repository</th>
								</tr>
							</thead>

							<tbody className="table-body">
								{state.modules.map(item => (
									<tr>
										<td>
											<input
												onchange={(e) => onCheckBoxModule(item.module, state, updateState)}
												type="checkbox"
											/>
										</td>
										<td>
											{item.module}
										</td>
										<td>
											{item.repository}
										</td>
									</tr>))}
							</tbody>

						</table>
					</div>


				</div>

				<div className="container now-grid">
					<h3 className="separate-line">Build Enviroment Selection</h3>
					<div className="sn-main-content">
						<div>
							<label className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >*Release Baseline</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<select role="listbox"
								on-change={e => onReleaseBaseLineChange(e, updateState, state)}
								className="form-control select-type" choice="3">
								<option value="" role="option"
								>------</option>

								<option value={state.releaseBaselineEnv.envId} role="option"
								>{`${state.releaseBaselineEnv.envId}${state.releaseBaselineEnv.envName}`}</option>

								<option value={state.releaseUnitEnv.envId} role="option"
								>{`${state.releaseUnitEnv.envId}-${state.releaseUnitEnv.envName}`}</option>

							</select>
						</div>
					</div>
				</div>

				<div className="container now-grid">
				
					<div className="sn-main-content">
						<div>
							<label className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >* Release Unit
								</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<select role="listbox"
								on-change={e => onReleaseUnitChange(e, updateState, state)}
								className="form-control select-type" choice="3">
								<option value="" role="option"
								>------</option>

								<option value={state.releaseBaselineEnv.envId} role="option"
								>{`${state.releaseBaselineEnv.envId}-${state.releaseBaselineEnv.envName}`}</option>

								<option value={state.releaseUnitEnv.envId} role="option"
								>{`${state.releaseUnitEnv.envId}-${state.releaseUnitEnv.envName}`}</option>

							</select>
						</div>
					</div>
				</div>

				<div className="container now-grid">
					<div className="sn-main-content">
						<div>
							<label className="col-xs-12 col-md-1_5 col-lg-2 control-label">
								<span className="required-marker label_description" />
								<span title="" className="label-text" data-html="false" >Release Package
								</span>
							</label>
						</div>
						<div className="col-xs-10 col-md-9 col-lg-8 form-field input_controls">
							<div className="margin-top-10">

								{state.releasePackageEnvs.map(item => (<div>

									<input
										type="checkbox"
										onchange={(e) => onCheckBoxReleasePackage(otem.envId, state, updateState)} />
									<label >{item.envId} - {item.envName}</label>


								</div>))}

								<div className="explain-text">If none specified, it will grant permission to all environments</div>

							</div>

						</div>
					</div>
				</div>



			</div>
			<div>
				<now-button
					disabled={isDisable(state)}
					on-click={() => openPopup(state, updateState)}
					className="margin-x2 submit-button" label="Submit" variant="primary" size="md" />
			</div>
		</div>
	);
};

createCustomElement('bllt-quady-lot-create', {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: {
		showLoading: true,
		openModal: false,
		modules: [],
		authorizedGroups: [],
		releaseBaselineEnv: {},
		releaseUnitEnv: {},
		releasePackageEnvs: [],
		alert: null,
		errorMessage: '',
		detail: {
			lotName: "",
			summary: "",
			contents: "",
			baselineTag: "",
			options: {
				useMerge: false,
				useResourceAddRequest: false,
				useStrictApproval: false
			},
			publicPath: "C:/user",
			privatePath: "C:/sys",
			useDefaultPublicPath: false,
			useDefaultPrivatePath: false,
			authorizedGroups: [],
			enableUnauthorizedGroup: true,
			modules: [],
			releaseBaselineEnvId: "",
			releaseUnitEnvId: "",
			releasePackageEnvIds: []
		}


	},
	properties: {
		apiUrl: { default: DEFAULT_BASE_URL },
	},
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: initLotInfo,
		"NOW_MODAL#FOOTER_ACTION_CLICKED": ({ action, state, updateState, dispatch }) => {
			const url = state.properties.apiUrl + api.create_lot.path;
			let data = state.detail;
			fetch(url, {
				method: api.create_lot.method,
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
					'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA'
				},
				body: JSON.stringify(data)
			})
				.then(function (response) {
					updateState({ openModal: false });
					return response.json();
				})
				.then(function (result) {
					if (result.messages) {
						dispatch("SHOW_NOW_ALERT", { status: "warning", errorMessage: result.messages.toString() });
						return;
					}
					dispatch("EVENT_QUADY_BACK_TO_LIST", {})

				})
				.catch(function (error) {
					updateState({ openModal: false });
					console.log('Request failed', error);
				});

		},
		"NOW_MODAL#OPENED_SET": ({ action, state, updateState }) => {
			updateState({ openModal: action.payload.value });
		},




		INIT_LOT: ({ action, state, updateState }) => {
			const url = state.properties.apiUrl + api.lot_init.path;
			fetch(url, {
				method: api.lot_init.method,
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
					'Authorization': 'RyEuBNoMKNpvZozFQcRhsic6Sbb760yVliYqixM5VhFPd3uDKA'
				},
			})
				.then(function (response) {
					//updateState({openModal: false});
					return response.json();
				})
				.then(function (result) {
					updateState({
						authorizedGroups: result.authorizedGroups,
						modules: result.modules,
						releaseBaselineEnv: result.releaseBaselineEnv,
						releaseUnitEnv: result.releaseUnitEnv,
						releasePackageEnvs: result.releasePackageEnvs

					});
				})
				.catch(function (error) {
					updateState({ openModal: false });
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
			updateState({ alert: action.payload.status, openModal: false, errorMessage: errorMessage });
			setTimeout(() => {
				updateState({ alert: null });
			}, 10000);
		},
	}
});
