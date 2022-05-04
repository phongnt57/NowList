import { createCustomElement, actionTypes } from '@servicenow/ui-core';
import { snabbdom } from '@servicenow/ui-renderer-snabbdom';
import '@servicenow/now-icon';
import '@servicenow/now-button';
import '@servicenow/now-popover'
import '@servicenow/now-modal'
import '@servicenow/now-card'

import styles from './styles.scss';
import { LIST_ALL_COMLUMN } from './constants'


const initData = ({ state, dispatch, updateState }) => {
	updateState({ tempColumns: state.properties.selectedColumns })

};
const onComment = (e) => {
	console.log(e.target.value);

}
const openDialog = (updateState) => {
	updateState({ open: true });

}

const onSelect = (selected, updateState, state) => {
	const tempColumns = [...state.tempColumns];
	const index = tempColumns.find(item => item.key == selected.key);
	if (!index) {
		updateState({ currentSelect: selected.key });
	}
}

const onAddItem = (state, updateState) => {
	const tempColumns = [...state.tempColumns];
	const currentSelect = state.currentSelect;
	if (!currentSelect) return;
	const index = tempColumns.find(item => item.key === currentSelect);
	if (!index) {
		const item = LIST_ALL_COMLUMN.find(item => item.key == currentSelect);
		tempColumns.push(item);
		console.log(tempColumns);
		updateState({ tempColumns: tempColumns });
	}

}
const onRemove = (removeItem, state, updateState) =>{
	const tempColumns = [...state.tempColumns];
	const index = tempColumns.findIndex(item => item.key == removeItem.key );
	if(index > -1){
		tempColumns.splice(index, 1);
		updateState({tempColumns: tempColumns});
	}

}



const view = (state, { updateState, dispatch }) => {
	const properties = state.properties;
	console.log(properties.selectedColumns.length);
	return (
		<div>
			<now-icon
				on-click={() => openDialog(updateState)}
				className="margin-x2" icon="gear-outline" size="lg"></now-icon>

			<now-modal
				opened={state.open}
				size='lg'
				header-label='Select Column'
				footer-actions='[
             {
              "variant": "primary",
              "label": "Save",
			  "type":"submit-column"
              },
			  {
				"variant": "secondary",
				"label": "Cancel",
				"type": "cancel-column"
				}
             ]'
			>
				<div className="dialog-content">
					<now-card>
						<div className="scroll">
							{LIST_ALL_COMLUMN.map(item => (
								<div
									on-click={() => onSelect(item, updateState, state)}
									className={`item-content cusor-pointer ${state.currentSelect == item.key ? ' select-background' : null}`}>
									{item.label}

								</div>
							))}
						</div>
					</now-card>

					<now-button
						on-click={() => onAddItem(state, updateState)}
						icon="caret-right-fill" className="margin-x" size="lg"></now-button>
					<div>
						<now-card>
							<div className="scroll">
								{state.tempColumns.length > 0 ? state.tempColumns.map((item) => (
									<div className="right-content-item">
										<div>{item.label}</div>
										<div></div>
										<now-icon
										    on-click={()=>onRemove(item,state, updateState)}                     
											icon="close-fill" size="md" className="cusor-pointer" />
									</div>

								)) : null}
							</div>
						</now-card>


					</div>

				</div>

			</now-modal>

		</div>
	);
};


createCustomElement('choose-column', {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: {
		open: false,
		currentSelect: null,
		tempColumns: []

	},
	properties: {
		selectedColumns: { default: [] },
		submitColumn: { default: null }
	},
	actionHandlers: {

		[actionTypes.COMPONENT_CONNECTED]: initData,

		"NOW_MODAL#FOOTER_ACTION_CLICKED": ({ action, state, updateState, dispatch }) => {
			const payload = action.payload;
			if (payload.action.type === "submit-column") {
				const properties = { ...state.properties };
				properties.selectedColumns = state.tempColumns;
				state.properties.submitColumn({ selectedColumns: state.tempColumns });
				updateState({ open: false });

			}
			if (payload.action.type === "cancel-column") {
				updateState({ open: action.payload.value });

			}



		},
		"NOW_MODAL#OPENED_SET": ({ action, state, updateState }) => {
			console.log("OPENED_SET sma")
			updateState({ open: action.payload.value });
		},


	},
});
