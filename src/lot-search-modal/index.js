import { createCustomElement, actionTypes } from '@servicenow/ui-core';
import { snabbdom } from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-icon';
import '@servicenow/now-button';
import '@servicenow/now-popover';
import '@servicenow/now-modal';
import '@servicenow/now-card';

import styles from '../styles.scss';
import {  api, DEFAULT_BASE_URL, headers } from '../bllt-quady-chg-property-list/constants'


const initData = ({ state, dispatch }) => {
	
	dispatch("LOT_LIST_REQUESTED", {

	});
};

const openDialog = (updateState) => {
	updateState({ open: true });

}


const onSelectLot = (item, state, updateState) => {
	updateState({open: false});
	state.properties.dispatch("LOT_MODAL_SELECT_ITEM", { selectedLotId: item.lotId });
}



const view = (state, { updateState, dispatch }) => {
	return (
		<div>
			<button
				on-click={() => openDialog(updateState)}
				className="input-group-button cursor-pointer">
				<now-icon icon="magnifying-glass-fill" size="md"></now-icon>
			</button>

			<now-modal
				opened={state.open}
				size='lg'
				header-label='Select Lot'
				footer-actions='[
           
			  {
				"variant": "secondary",
				"label": "Close",
				"type": "close"
				}
             ]'
			>
				<div className="dialog-content">
					<table className="w-100">
						{state.data.length > 0 ?
							state.data.map(item => (
								<tr className="cursor-pointer "
									onclick={() => onSelectLot(item, state, updateState)}>
									<td className="padding-10 text-link">
										{`${item.lotId}(${item.lotName})`}

									</td>

								</tr>
							))
							: null}
					</table>


				</div>


			</now-modal>

		</div>
	);
};


createCustomElement('lot-search-modal', {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: {
		open: false,
		data: []

	},
	properties: {
		dispatch: { default: null },
		apiUrl: { default: DEFAULT_BASE_URL }

	},
	actionHandlers: {

		[actionTypes.COMPONENT_CONNECTED]: initData,

		LOT_LIST_REQUESTED: ({ action, state, updateState }) => {

			const body = {
				selectedInProgress: true,
				selectedClosed: true
			}
			const url = state.properties.apiUrl + api.lot_list.path;
			console.log(url)
			fetch(url, {
				method: api.lot_list.method,
				headers: headers,
				body : JSON.stringify(body)
			})
				.then(function (response) {
					return response.json();
				})
				.then(function (result) {
					updateState({
						data: result,
					});

				})
				.catch(function (error) {
					console.log('Request failed', error);
				});

		},

		"NOW_MODAL#FOOTER_ACTION_CLICKED": ({ action, state, updateState, dispatch }) => {
			const payload = action.payload;
			if (payload.action.type === "close") {
				updateState({ open: false });

			}


		},
		"NOW_MODAL#OPENED_SET": ({ action, state, updateState }) => {
			updateState({ open: action.payload.value });
		},


	},
});
