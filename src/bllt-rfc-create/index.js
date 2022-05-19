import {createCustomElement} from '@servicenow/ui-core';
import {snabbdom, createRef} from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import '@servicenow/now-icon';
import '@servicenow/now-button';
import '@servicenow/now-popover';
import '@servicenow/now-modal';
import '@servicenow/now-card';
import '@servicenow/now-input';


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

const openPopup = (updateState) => {
	updateState({openModal: true});
};

const view = (state, {updateState}) => {
	const subjectRef = createRef();
	const summaryRef = createRef();
	const contentsRef = createRef();
	const urlRef = createRef();
	return (
		<div>
			<now-modal
				opened={state.openModal}
				size='sm'
				header-label='Create New RFC'
				footer-actions='[
             {
              "variant": "primary",
              "label": "Save"
              }
             ]'
			>
				Do you want to save new RFC?
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
					<h4 className="now-heading -header -secondary"> RFC Create</h4>
				</div>
				<div className="sn-list-header-title-container">
					<now-button disabled={!state.subject || !state.summary || !state.contents} className="margin-x2" label="Submit" variant="primary" size="md" onclick={() => openPopup(updateState)}/>
				</div>
			</div>
			<div className="form-group">
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
						value="" aria-required="true" className="form-control" required="true"
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
							value="" aria-required="false" className="form-control" required="false"
							aria-label="Short description"/>
					</div>
				</div>
			</div>
			<div>
				<now-button disabled={!state.subject || !state.summary || !state.contents} className="margin-x2" label="Submit" variant="primary" size="md"/>
			</div>
		</div>
	);
};

createCustomElement('bllt-rfc-create', {
	renderer: {type: snabbdom},
	view,
	styles,
	initialState: {
		showLoading: true,
		openModal: false,
		subject: "",
		summary: "",
		contents: "",
		url: ""

	},
	actionHandlers: {
		"NOW_MODAL#FOOTER_ACTION_CLICKED" : ({ action, state, updateState, dispatch }) => {
			const API = "https://jenkins.quady-cloud.com/trinity/api/sn/rfc/create";
			let data = {
				subject: state.subject,
				summary: state.summary,
				contents: state.contents,
				url: state.url
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


		SUBMIT_RFC_REQUESTED: ({ action, state, updateState }) => {

		}
	}
});
