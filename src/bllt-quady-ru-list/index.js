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
import { LIST_COMLUMN, LIST_ALL_COMLUMN, api, headers, statusRu , DEFAULT_BASE_URL } from './constants'

const requestSearchResults = ({ state, dispatch }) => {
	dispatch("SEARCH_RESULTS_REQUESTED", {
		linesPerPage: state.linesPerPage,
		selectedPage: 1,
	});
	dispatch("GET_LIST_INIT_REQUEST", {});
};

const clickNext = (state, dispatch) => {
	if (state.currentPage < state.pages)
		dispatch("SEARCH_RESULTS_REQUESTED", {
			linesPerPage: state.linesPerPage,
			selectedPage: state.currentPage + 1,
		})
}

const clickBack = (state, dispatch) => {
	if (state.currentPage > 1)
		dispatch("SEARCH_RESULTS_REQUESTED", {
			linesPerPage: state.linesPerPage,
			selectedPage: state.currentPage - 1,
		})
}
const clickLatest = (state, dispatch) => {
	dispatch("SEARCH_RESULTS_REQUESTED", {
		linesPerPage: state.linesPerPage,
		selectedPage: state.pages,
	})
	console.log(state.selectedColumns);
}



const onChangeLinePerPage = (linesPerPage, dispatch, updateState) => {
	updateState({ linesPerPage: linesPerPage })
	dispatch("SEARCH_RESULTS_REQUESTED", {
		linesPerPage: linesPerPage,
		selectedPage: 1,
	});
}

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

const onEnterLot = (lotRef, e, dispatch, state, updateState) => {
	if (e.which == 13) {
		const value = lotRef.current.value;
		updateState({ selectedLotId: value });
		dispatch("SEARCH_RESULTS_REQUESTED", {
			linesPerPage: state.linesPerPage,
			selectedPage: 1,
			selectedLotId: value
		});

		dispatch("GET_LIST_INIT_REQUEST", {});


	}

}


const onComment = (comment, updateState) => {
	updateState({ comment: comment });

}

const onCheckChangeAll = (ref, state, updateState) => {
	if (ref.current.checked) {
		let seletedIds = state.data.map(item => item.changeId);
		updateState({ selectIds: seletedIds });
	} else updateState({ selectIds: [] });

}



const view = (state, { updateState, dispatch }) => {
	const searchRef = createRef();
	const lotRef = createRef();
	const checkBoxRef = createRef();

	return (
		<div>
			<now-modal
				opened={state.openModal}
				size='sm'
				header-label='Delete Units'
				footer-actions='[
					{
					"variant": "primary-negative",
					"label": "Submit",
					"type": "delete" 
					}
					]'
			>
				<div style={{ marginBottom: "10px" }}>Delete {state.selectIds.toString()}</div>

				<textarea
					className="border-input"
					style={{ width: "100%" }} rows={5}
					onblur={(e) => onComment(e.target.value, updateState)}></textarea>

			</now-modal>

			<div className="sn-list-header">
				<div className="sn-list-header-title-container">
					<now-popover interaction-type="dialog" positions={[{ "target": "bottom-center", "content": "top-center" }]}
					>
						<now-button style={{ marginLeft: "10px" }}
							className="cursor-pointer margin-x2" slot="trigger"
							icon="menu-fill" size="md" />
						<now-card slot="content">
							<div>
								{[5, 10, 15, 20, 50, 100].map(item => (
									<div
										on-click={() => onChangeLinePerPage(item, dispatch, updateState)}
										style={{ display: 'flex', padding: '5px', cursor: 'pointer' }} >
										{state.linesPerPage === item ?
											<now-icon icon="check-fill" size="md" />
											: <div style={{ width: '16px', height: '16px' }}></div>
										}
										<div>{item} rows per page</div>
									</div>
								))}
							</div>
						</now-card>

					</now-popover>

					<h4 className="now-heading -header -secondary"> Release Unit List</h4>
					<div className="margin-x2">Search</div>
					<input className="header-input" type="text"
						ref={searchRef}
						on-keyup={e => onSearchKeyword(searchRef, e, dispatch, state, updateState)}
						placeholder="Search" />
				</div>
				<div></div>
				<div className="sn-list-header-title-container">
					<choose-column
						allColumns={LIST_ALL_COMLUMN}
						selectedColumns={state.selectedColumns}
						submitColumn={updateState}>
					</choose-column>

					<now-split-button
						className="margin-x2"
						label={`Action on select row(${state.selectIds.length})`}
						items={[{ "id": "delete", "label": "Delete" }, { "id": "close", "label": "Close" }]}

						variant="tertiary"
						size="md" icon=""
					></now-split-button>


					<now-button onclick={() => dispatch("EVENT_QUADY_CREATE", { 'create': state.selectedLotId })}
						className="margin-x2" label="New" variant="primary" size="md"  ></now-button>


				</div>
			</div>
			<div className="sn-last-refreshed">
				{state.searchKeyword ? `All> Keyword=${state.searchKeyword}` : null}
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

			<div>
				<table className="filter-table">
					<tr>
						<td>Lot Id</td>
						<td>
							<div className="d-flex">
								<input type="text"
									ref={lotRef}
									on-keyup={e => onEnterLot(lotRef, e, dispatch, state, updateState)}
									value={state.selectedLotId}
									className="input-search" />
								<lot-search-modal
									apiUrl={DEFAULT_BASE_URL}
									dispatch={dispatch}
								></lot-search-modal>


							</div>
						</td>

					</tr>
					<tr>
						<td>Status</td>
						<td>
							<now-tabs
								fixed-width={true}
								items={statusRu}
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
							<th className="-checkbox">
								<input
									ref={checkBoxRef}
									type="checkbox"
									onchange={(e) => onCheckChangeAll(checkBoxRef, state, updateState)} />
							</th>
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
							state.data.map(item => (
								<tr className="row">
									<td>
										<div className="sn-grid-checkbox">
											<input
												checked={state.selectIds.indexOf(item.changeId) > -1}
												type="checkbox"
												onchange={() => onCheckChange(item.changeId, state, updateState)} />
										</div>

									</td>
									{state.selectedColumns.map(column => {
										if (column.key == "ruId") {
											return (
												<td>
													<div className="sn-text-link cursor-pointer">
														<a className="text-link"
															on-click={() => dispatch("EVENT_QUADY_DETAIL", { 'detail': item.changeId })}
														>{item.ruId}</a>
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
						) : null

						}

					</tbody>

				</table>

			</div>
			<div className="bottom-paging">
				<div
					className="margin-x2 cursor-pointer"
					onclick={() => requestSearchResults({ state, dispatch })}>
					<now-icon
						style={state.currentPage == 1 && { color: "#161B1C40" }}
						icon="caret-left-fill" size="lg"
						className="margin-right--15" >
					</now-icon>
					<now-icon
						style={state.currentPage == 1 && { color: "#161B1C40" }}

						icon="caret-left-fill" size="lg">
					</now-icon>

				</div>

				<now-icon className="margin-x2 cursor-pointer"
					variant="tertiary"
					style={state.currentPage == 1 && { color: "#161B1C40" }}
					onclick={() => clickBack(state, dispatch)}
					icon="caret-left-fill" size="lg">
				</now-icon>
				<div className="flex">
					<input type="text" style={{ maxWidth: "80px" }} disabled value={state.linesPerPage * (state.currentPage - 1) + 1} />
					&nbsp; to &nbsp;
					{state.linesPerPage * state.currentPage < state.total ? state.linesPerPage * state.currentPage : state.total}
					&nbsp;of &nbsp;
					{state.total}
				</div>

				<now-icon className="margin-x2 cursor-pointer"
					onclick={() => clickNext(state, dispatch)}
					style={state.currentPage == state.pages && { color: "#161B1C40" }}
					icon="caret-right-fill" size="lg">
				</now-icon>

				<div
					onclick={() => clickLatest(state, dispatch)}
					className="margin-x2 cursor-pointer">
					<now-icon
						style={state.currentPage == state.pages && { color: "#161B1C40" }}
						className="margin-right--15"
						icon="caret-right-fill" size="lg">
					</now-icon>
					<now-icon
						style={state.currentPage == state.pages && { color: "#161B1C40" }}
						icon="caret-right-fill" size="lg">
					</now-icon>

				</div>


			</div>
		</div>
	);
};

const onCheckChange = (id, state, updateState) => {
	let selectIds = [...state.selectIds];
	let index = selectIds.indexOf(id);
	if (index > -1) {
		selectIds.splice(index, 1);
	} else {
		selectIds.push(id);
	}
	updateState({ selectIds });

}

createCustomElement('bllt-quady-ru-list', {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: {
		showLoading: true,
		data: [],
		pages: 0,
		total: 0,
		currentPage: 1,
		linesPerPage: 5,
		openModal: false,
		openModalCloseChgProperty: false,
		searchKeyword: '',
		seletedGroup: '',
		selectedStatusId: '',
		selectedLotId: '',
		selectIds: [],
		selectedColumns: LIST_COMLUMN,
		comment: "",
		alert: null,
		errorMessage: ''
	},
	properties: {
		apiUrl: { default: DEFAULT_BASE_URL }
	},
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: requestSearchResults,

		"NOW_MODAL#FOOTER_ACTION_CLICKED": ({ action, state, updateState, dispatch }) => {
			console.log(action);
			const payload = action.payload;
			let url = "";
			let method = "get";
			const body = {
				ruIds: state.selectIds,
				comment: state.comment
			}
			// delete change property
			if (payload.action.type === "delete") {
				url = state.properties.apiUrl + api.delete_all.path + "/" + state.selectedLotId;
				method = api.delete_all.method;
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
					dispatch("SEARCH_RESULTS_REQUESTED", {
						linesPerPage: state.linesPerPage,
						selectedPage: 1,
					});
					dispatch("SHOW_NOW_ALERT", { status: "info" });


				})
				.catch(function (error) {
					console.log('Request failed', error);
					dispatch("SHOW_NOW_ALERT", { status: "warning", errorMessage: "Oop!! " });
				});





		},
		"NOW_MODAL#OPENED_SET": ({ action, state, updateState }) => {
			updateState({ openModal: action.payload.value, comment: "" });
		},

		"NOW_SPLIT_BUTTON#ITEM_CLICKED": ({ action, state, updateState }) => {
			const payload = action.payload;
			if (payload.item.id == "delete" && state.selectIds.length >= 0) updateState({ openModal: true });
			if (payload.item.id == "close" && state.selectIds.length >= 0) {

			}


		},

		"NOW_TABS#SELECTED_ITEM_SET": ({ action, state, updateState, dispatch }) => {
			const item = action.payload.item;
			const value = action.payload.value;
			if (item.type == "status") updateState({ selectedStatusId: value });
			dispatch("SEARCH_RESULTS_REQUESTED", {
				linesPerPage: state.linesPerPage,
				selectedPage: 1,
			});

		},

		SEARCH_RESULTS_REQUESTED: ({ action, state, updateState }) => {
			console.log("SEARCH_RESULTS_REQUESTED");
			const payload = action.payload;
			let body = {
				"pagination": {
					"linesPerPage": payload.linesPerPage,
					"selectedPage": payload.selectedPage
				},
				"selectedStatusId": state.selectedStatusId,
				"searchKeyword": state.searchKeyword
			};

			const url = state.properties.apiUrl + api.ru_list.path + "/" + state.selectedLotId;
			fetch(url, {
				method: api.ru_list.method,
				headers: headers,
				body: JSON.stringify(body)
			})
				.then(function (response) {
					return response.json();
				})
				.then(function (result) {
					updateState({
						selectIds: [],
						data: result.results,
						total: result.pagination.total,
						pages: result.pagination.pages,
						currentPage: result.pagination.currentPage
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
		LOT_MODAL_SELECT_ITEM: ({ action, state, updateState, dispatch }) => {
			updateState({ selectedLotId: action.payload.selectedLotId });
			dispatch("SEARCH_RESULTS_REQUESTED", {
				linesPerPage: state.linesPerPage,
				selectedPage: 1,
			});
			dispatch("GET_LIST_INIT_REQUEST", {});

		}

	}
});
