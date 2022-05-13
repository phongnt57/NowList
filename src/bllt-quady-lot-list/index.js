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
import { LIST_COMLUMN, statusLot, api, headers, DEFAULT_BASE_URL } from './constants'

const requestSearchResults = ({ state, dispatch }) => {
	dispatch("SEARCH_RESULTS_REQUESTED", {
		linesPerPage: state.linesPerPage,
	});
};







const view = (state, { updateState, dispatch }) => {
	

	return (

		<div>
			<div className="sn-list-header">
				<div className="sn-list-header-title-container">
					<now-popover interaction-type="dialog" positions={[{ "target": "bottom-center", "content": "top-center" }]}
					>
						<now-button style={{ marginLeft: "10px" }}
							className="cursor-pointer margin-x2" slot="trigger"
							icon="menu-fill" size="md" />
						<now-card slot="content">
							<div>
							</div>
						</now-card>

					</now-popover>

					<div className="now-heading -header -secondary"> Lot List</div>
				</div>
				<div></div>
				<div className="sn-list-header-title-container">
					<now-button onclick={() => dispatch("EVENT_QUADY_CREATE", { 'create': '' })}
						className="margin-x2" label="New" variant="primary" size="md"  ></now-button>

				</div>
			</div>
			

			<div>
				<table className="filter-table">
					<tr>
						<td></td>
						<td>
							<now-tabs
								items={statusLot}
								selected-item={''}
								size="md"></now-tabs>
						</td>


					</tr>
				</table>
			</div>

			<div className="container now-grid">
				<table className="auto content-table" role="grid">
					<thead>
						<tr>
						
							{state.selectedColumns.map(item => (
								<th className="list-column-header" dir="ltr" id="id_0" role="columnheader">
									<div className="sn-text-link hide-columnreorder-off">
										<a type="button" >
											<span className="column-resizing-enabled">{item.label}</span>
										</a>

									</div>
								</th>

							))}


						</tr>

					</thead>
					<tbody className="table-body">
						{state.data.length ? (
							state.data.map((item) => {
								return (
									<tr id ={`${item.lotId}`}>
										{state.selectedColumns.map(column => {
											if (column.key == "lotId") {
												return (
													<td>
														<div className="sn-text-link cursor-pointer">
															<a className="text-link"
																on-click={() => dispatch("EVENT_QUADY_DETAIL", { 'detail': item.lotId })}
															>{item.lotId}</a>
														</div>
													</td>


												)
											} else if (column.key == "status") {
												return (
													<td>
														<div className="sn-text-link">
															<div className={`status-label amStatus${item.statusId}`}>
																{item.status}
															</div>
														</div>
													</td>
												);
											}
											else
												return (
													<td>
														<div className="sn-text-link">
															{item[column.key]}
														</div>
													</td>

												);
										})}

									</tr>
								)
							})) : null

						}

					</tbody>

				</table>

			</div>
			<div className="view-all">
				{state.linesPerPage > 0 ?
				<a className="text-link cursor-pointer"
					on-click={() => 	dispatch("SEARCH_RESULTS_REQUESTED", {
						linesPerPage: 0,
					}
					)}
				>View All</a>
				: null 
				}



			</div>
		</div>
	);
};


createCustomElement('bllt-quady-lot-list', {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: {
		showLoading: true,
		data: [],
		pages: 0,
		total: 0,
		linesPerPage: 5,
		selectedColumns: LIST_COMLUMN,
		selectedClosed: false,
		selectedInProgress: true

	},
	properties: {
		apiUrl: { default: DEFAULT_BASE_URL }
	},
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: requestSearchResults,

		"NOW_TABS#SELECTED_ITEM_SET": ({ action, state, updateState, dispatch }) => {
			const item = action.payload.item;
			if (item.id == "selectedInProgress") updateState({ selectedInProgress: true, selectedClosed: false });
			else updateState({ selectedInProgress: false, selectedClosed: true });
			dispatch("SEARCH_RESULTS_REQUESTED", {
				linesPerPage: state.linesPerPage,
			});

		},

		SEARCH_RESULTS_REQUESTED: ({ action, state, updateState }) => {
			console.log("SEARCH_RESULTS_REQUESTED");
			const payload = action.payload;
			let body = {
				"linesPerPage": payload.linesPerPage,
				"selectedInProgress": state.selectedInProgress,
				"selectedClosed": state.selectedClosed
			};

			const url = state.properties.apiUrl + api.lot_list.path;
			fetch(url, {
				method: api.lot_list.method,
				headers: headers,
				body: JSON.stringify(body)
			})
				.then(function (response) {
					return response.json();
				})
				.then(function (result) {
					updateState({
						data: result,
						linesPerPage: payload.linesPerPage
					});

				})
				.catch(function (error) {
					console.log('Request failed', error);
				});

		},




	}
});
