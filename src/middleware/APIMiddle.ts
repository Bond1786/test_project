
import { LoginResponse, LogoutResponse } from "../actions/AuthTypes";
import { JiraDataResponse } from "../actions/JiraTypes";
import { PartDataRequest, PartDataResponse, PartListResponse } from "../actions/PartTypes";
import { PRResponse } from "../actions/PRTypes";
import { StatusMessageEnum } from "../actions/StatusMessageEnum";
import axios from "axios";
import { Dispatch, Middleware, MiddlewareAPI } from "redux";
import { AppAction, APP_ACTION_TYPE } from "../actions/AppAction";
import { CONFIG } from "../config";
import { AppState } from "../redux/AppReducer";

const REMOTE_SERVER_URL: string = `http://${CONFIG.ipaddress}:${CONFIG.port}`;
export const ApiMiddleWare: Middleware = (store: MiddlewareAPI) => (next: Dispatch) => (action: AppAction) => {
    let result: AppAction = next(action)
    switch (action.type) {
        case APP_ACTION_TYPE.LOGIN:
            axios.post(REMOTE_SERVER_URL.concat("/api/login"), action.payload)
                .then((response) => {
                    let resData: LoginResponse = response.data;
                    if (resData.message == StatusMessageEnum.SUCCESS) {
                        let nextPayload: Pick<AppState, "login"> = {
                            login: {
                                isSucessfull: true,
                                message: resData.message ?? "success",
                                token: resData.token ?? "adc"
                            }
                        };
                        let nextAction_login_suc = { type: APP_ACTION_TYPE.LOGIN_SUCCESS, payload: nextPayload }
                        result = next(nextAction_login_suc)
                    } else {
                        let nextPayload_Fail: Pick<AppState, "login"> = {
                            login: {
                                isSucessfull: false,
                                message: resData.message,
                                token: resData.token
                            }
                        };
                        let nextAction_login_fail = { type: APP_ACTION_TYPE.LOGIN_FAIL, payload: nextPayload_Fail }
                        result = next(nextAction_login_fail)
                    }

                }).catch((error) => {
                    let nextPayload_Fail: Pick<AppState, "login"> = {
                        login: {
                            isSucessfull: false,
                            message: "Login fail",
                            token: "Not valid"
                        }
                    };
                    let nextAction_login_fail = { type: APP_ACTION_TYPE.LOGIN_FAIL, payload: nextPayload_Fail }
                    result = next(nextAction_login_fail)
                });
            break;

        case APP_ACTION_TYPE.LOGOUT:
            axios.post(REMOTE_SERVER_URL.concat("/api/logout"), action.payload)
                .then((response) => {
                    let resData: LogoutResponse = response.data;
                    let nextPayload: Pick<AppState, "login"> = {
                        login: {
                            isSucessfull: true,
                            message: resData.message ?? "success",
                            token: ""
                        }
                    };
                    let nextAction_login_suc = { type: APP_ACTION_TYPE.LOGOUT_SUCCESS, payload: nextPayload }
                    result = next(nextAction_login_suc)
                }).catch((error) => {
                    let nextPayload_Fail: Pick<AppState, "login"> = {
                        login: {
                            isSucessfull: false,
                            message: "Logout fail",
                            token: ""
                        }
                    };
                    let nextAction_login_fail = { type: APP_ACTION_TYPE.LOGOUT_FAIL, payload: nextPayload_Fail }
                    result = next(nextAction_login_fail)
                });
            break;

        case APP_ACTION_TYPE.INITIAL_DATA:
            let usrToken: string = action.payload.token
            let partId: string = action.payload.partId
            axios.get(REMOTE_SERVER_URL.concat(action.payload.api[0]), { params: { token: usrToken } })
                .then((partListResponse) => {                  
                    axios.get(REMOTE_SERVER_URL.concat(action.payload.api[1]), { params: { token: usrToken, partId: partId } })
                        .then((partDataResponse) => {
                            let initial_data_success = { type: APP_ACTION_TYPE.INITIAL_DATA_SUCCESS, payload: { list: partListResponse.data, data: partDataResponse.data } }
                            result = next(initial_data_success)
                        }).catch((error) => {
                            let initial_data_fail = { type: APP_ACTION_TYPE.INITIAL_DATA_FAIL, payload: error }
                            result = next(initial_data_fail)
                        });
                }).catch((error) => {
                    let nextAction_partlist_fail = { type: APP_ACTION_TYPE.QUERY_PART_LIST_FAIL, payload: error }
                    result = next(nextAction_partlist_fail)
                });
            break;

        case APP_ACTION_TYPE.QUERY_JIRA:
            axios.get(REMOTE_SERVER_URL.concat(action.payload.api),
                { params: action.payload.jiraReq })
                .then((response) => {
                    let resData: JiraDataResponse = response.data;
                    if (resData.message === StatusMessageEnum.SUCCESS) {
                        let nextAction_JiraData_success = { type: APP_ACTION_TYPE.QUERY_JIRA_SUCCESS, payload: resData }
                        result = next(nextAction_JiraData_success)
                    } else {
                        let nextAction_JiraData_fail = { type: APP_ACTION_TYPE.QUERY_JIRA_FAIL, payload: resData }
                        result = next(nextAction_JiraData_fail)
                    }
                }).catch((error) => {
                    let nextAction_JiraData_fail = { type: APP_ACTION_TYPE.QUERY_JIRA_FAIL, payload: error }
                    result = next(nextAction_JiraData_fail)
                });
            break;
        case APP_ACTION_TYPE.CREATE_PR:
            axios.get(REMOTE_SERVER_URL.concat(action.payload.api),
                { params: action.payload.prReq })
                .then((response) => {
                    let resData: PRResponse = response.data;
                    if (resData.message === StatusMessageEnum.SUCCESS) {
                        let nextAction_createPr_success = { type: APP_ACTION_TYPE.CREATE_PR_SUCCESS, payload: resData }
                        result = next(nextAction_createPr_success)
                    } else {
                        let nextAction_createPr_fail = { type: APP_ACTION_TYPE.CREATE_PR_FAIL, payload: resData }
                        result = next(nextAction_createPr_fail)
                    } 
                }).catch((error) => {
                    let nextAction_createPr_fail = { type: APP_ACTION_TYPE.CREATE_PR_FAIL, payload: error }
                    result = next(nextAction_createPr_fail)
                });
            break;
        case APP_ACTION_TYPE.FETCH_PART_VALUE_DATA:
            let partDataReq: PartDataRequest = action.payload?.partDataReq
            axios.get(REMOTE_SERVER_URL.concat(action.payload.api),
                { params: partDataReq })
                .then((response) => {
                    let resData: PartDataResponse = response.data;
                    let nextAction_partData_success = { type: APP_ACTION_TYPE.FETCH_PART_VALUE_DATA_SUCCESS, payload: resData.data }
                    result = next(nextAction_partData_success)
                }).catch((error) => {
                    let nextAction_partData_fail = { type: APP_ACTION_TYPE.FETCH_PART_VALUE_DATA_FAIL, payload: error }
                    result = next(nextAction_partData_fail)
                });
            break;
        case APP_ACTION_TYPE.QUERY_TABLE:
            axios.get(REMOTE_SERVER_URL.concat(action.payload.api),
                { params: { token: action.payload.token, query: action.payload.query } })
                .then((response) => {
                    let resData = response.data;
                    let nextAction_parttableData_success = { type: APP_ACTION_TYPE.QUERY_TABLE_SUCCESS, payload: resData }
                    result = next(nextAction_parttableData_success)
                }).catch((error) => {
                    let nextAction_parttableData_fail = { type: APP_ACTION_TYPE.QUERY_TABLE_FAIL, payload: error }
                    result = next(nextAction_parttableData_fail)
                });
            break;
        case APP_ACTION_TYPE.FETCH_VERSION:
            axios.get(REMOTE_SERVER_URL.concat(action.payload.api))
                .then((response) => {
                    let resData = response.data;
                    let nextAction_version_success = { type: APP_ACTION_TYPE.FETCH_VERSION_SUCCESS, payload: resData }
                    result = next(nextAction_version_success)
                }).catch((error) => {
                    let nextAction_version_fail = { type: APP_ACTION_TYPE.FETCH_VERSION_FAIL, payload: error }
                    result = next(nextAction_version_fail)
                });
            break;
        default:
            break;
    }
    return result
}



