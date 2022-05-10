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
import styles from '../styles.scss';
import { LIST_COMLUMN, api, headers, statusChg, DEFAULT_BASE_URL } from './constants'

const requestSearchResults = ({ state, dispatch }) => {
	dispatch("SEARCH_RESULTS_REQUESTED", {
		linesPerPage: state.linesPerPage,
		selectedPage: 1,
	});
	dispatch("GET_LIST_INIT_REQUEST",{});
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

const onComment = (comment, updateState) => {
	updateState({ comment: comment });

}



const view = (state, { updateState, dispatch }) => {
	const searchRef = createRef();

	return (
		<div>
			<now-modal
				opened={state.openModal}
				size='sm'
				header-label='Delete RFC'
				footer-actions='[
					{
					"variant": "primary",
					"label": "Submit",
					"action": "delete" 
					}
					]'
			>
				<div>Delete {state.selectIds.toString()}</div>

				<textarea
					className="border-input"
					style={{ width: "100%" }} rows={5}
					onblur={(e) => onComment(e.target.value, updateState)}></textarea>

			</now-modal>


			<div className="sn-list-header">
				<div className="sn-list-header-title-container">
					<now-popover interaction-type="dialog" positions={[{ "target": "bottom-center", "content": "top-center" }]}
					>
						<now-icon className="cursor-pointer margin-x2" slot="trigger" icon="menu-fill" size="lg" />
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

					<h2 className="now-heading -header -secondary"> Change Property List</h2>
					<div className="margin-x2">Search</div>
					<input className="header-input" type="text"
						ref={searchRef}
						on-keyup={e => onSearchKeyword(searchRef, e, dispatch, state, updateState)}
						placeholder="Search" />
				</div>
				<div></div>
				<div className="sn-list-header-title-container">
					<choose-column
						selectedColumns={state.selectedColumns}
						submitColumn={updateState}>
					</choose-column>

					<now-split-button
						className="margin-x2"
						label={`Action on select row(${state.selectIds.length})`}
						items={[{ "id": "delete", "label": "Delete" }]}
						variant="tertiary"
						size="md" icon=""
					></now-split-button>


					<now-button onclick={() => dispatch("EVENT_QUADY_CREATE_RFC", { 'eventpayload': 'createnew' })}
						className="margin-x2" label="New" variant="primary" size="md"  ></now-button>


				</div>
			</div>
			<div className="sn-last-refreshed">
				{state.searchKeyword ? `All> Keyword=${state.searchKeyword}` : null}
			</div>

			<div>
				<table className="filter-table">
					<tr>
						<td>Lot Id</td>
						<td>
							<div className="d-flex">
								<input type="text"
								 value={state.selectedLotId}
								 className="input-search"/>
								<lot-search-modal
								apiUrl ={DEFAULT_BASE_URL}
								updateParentState={updateState}
								></lot-search-modal>
								{/* <button className="input-group-button">
								     <now-icon icon="magnifying-glass-fill" size="md"></now-icon>
								</button> */}

							</div>
						</td>
			
					</tr>
					<tr>
						<td>Status</td>
						<td>
						<now-tabs 
						fixed-width={true}
						 items={statusChg}
						 selected-item={null} 
						 size="md"></now-tabs>
						</td>
					</tr>

					<tr>
						<td>Group</td>
						<td>
						<now-tabs 
						 items={state.groups}
						 selected-item={null} 
						 size="md"></now-tabs>
						</td>
						
						
					</tr>
				</table>
			</div>

			<div className="container now-grid">
				<table className="auto" role="grid">
					<thead>
						<tr>
							<th className="-checkbox"></th>
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
												checked={state.selectIds.indexOf(item.rfcId) > -1}
												type="checkbox"
												onchange={() => onCheckChange(item.rfcId, state, updateState)} />
										</div>

									</td>
									{state.selectedColumns.map(column => {
										if (column.key == "rfcId") {
											return (
												<td>
													<div className="sn-text-link cursor-pointer">
														<a className="text-link"
															on-click={() => dispatch("EVENT_QUADY_DETAIL_RFC", { 'event-payload': item.rfcId })}
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

createCustomElement('bllt-quady-chg-property-list', {
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
		searchKeyword: '',
		seletedGroup:'',
		selectedStatusId: '',
		selectedLotId: '',
		selectIds: [],
		selectedColumns: LIST_COMLUMN,
		comment: "",
		groups: [{id: null, label: "All"}]
	},
	properties: {
		apiUrl: { default: DEFAULT_BASE_URL }
	},
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: requestSearchResults,

		"NOW_MODAL#FOOTER_ACTION_CLICKED": ({ action, state, updateState }) => {
			console.log(action);
			const payload = action.payload;
			// delete RFC
			if (payload.action.type === "delete") {
				const url = state.properties.apiUrl + api.delete_all.path;
				const body = {
					rfcIds: selectIds,
					comment: state.comment
				}

				fetch(url, {
					method: api.delete_all.method,
					headers: headers,
					body: JSON.stringify(body)
				})
					.then(function (response) {
						return response.json();
					})
					.then(function (result) {
						updateState({ rfcIds: [], comment: "" });
						// update list 
						dispatch("SEARCH_RESULTS_REQUESTED", {
							linesPerPage: state.linesPerPage,
							selectedPage: 1,
						});

					})
					.catch(function (error) {
						console.log('Request failed', error);
					});


			}


		},
		"NOW_MODAL#OPENED_SET": ({ action, state, updateState }) => {
			updateState({ openModal: action.payload.value });

		},

		"NOW_SPLIT_BUTTON#ITEM_CLICKED": ({ action, state, updateState }) => {
			const payload = action.payload;
			if (payload.item.id == "delete" && state.selectIds.length > 0) updateState({ openModal: true });

		},

		"NOW_TABS#SELECTED_ITEM_SET" : ({action, state, updateState}) =>{
			console.log(action);

		},

		SEARCH_RESULTS_REQUESTED: ({ action, state, updateState }) => {
			const payload = action.payload;
			let body = {
				"pagination": {
					"linesPerPage": payload.linesPerPage,
					"selectedPage": payload.selectedPage
				}
			};
			if (payload.searchKeyword) body.searchKeyword = payload.searchKeyword;
			else if (state.searchKeyword) body.searchKeyword = state.searchKeyword;
			// const url = "https://api.jsonbin.io/b/626e53e6019db46796940c1a";
			const url = state.properties.apiUrl + api.rfc_list.path;
			fetch(url, {
				method: api.rfc_list.method,
				headers: headers,
				body: JSON.stringify(body)
			})
				.then(function (response) {
					return response.json();
				})
				.then(function (result) {
					updateState({
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

		GET_LIST_INIT_REQUEST: ({action, state, updateState}) => {
			const url = state.properties.apiUrl + api.init_list.path + "/" + state.selectedLotId;
			fetch(url, {
				method: api.init_list.method,
				headers: headers,
			})
				.then(function (response) {
					return response.json();
				})
				.then(function (result) {
					let groups = [...state.groups];
					groups = groups.concat(result.groups);
					updateState({
						groups: groups ,
					});

				})
				.catch(function (error) {
					console.log('Request failed', error);
				});


		}

	}
});
