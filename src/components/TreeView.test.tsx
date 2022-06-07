import { render, screen, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { AppState, initialState, LOGIN_MODES, PAGE_TYPE } from '../redux/AppReducer';
import { AUTH_TYPE } from '../actions/Type';
import { rootReducer } from '../redux/store';
import TreeView from './TreeView';



const initialState_treeViewData: AppState = {
    currentPage: PAGE_TYPE.LOGIN,
    loginMode: LOGIN_MODES.Guest,
    device: '',
    isConnected: false,
    dbParams: { type: AUTH_TYPE.WINDOW_AUTH, userName: "test_user", password: "password", dbUrl: "test_dbUrl", database: "test_database" },
    partSelected: '1',
    showPrRaisedDialog: true,
    hidePrRaisedDialog: false,
    isloading: false,
    isTreeviewLoading: false,
    isTableViewLoading: false,
    isPartListLoading: true,
    isloging: false,
    login: {
        isSucessfull: true,
        token: "adc"
    },
    treeViewData: [
        {
            "key": "1",
            "label": "Part Description",
            "data": {
                "data": {
                    "tableName": "part_partdescriptionfile",
                    "where": "WHERE part_partdescriptionfileID=1"
                }
            },
            "children": [
                {
                    "key": "1-0",
                    "label": "Boundary scan",
                    "data": {
                        "data": {
                            "tableName": "part_boundary_scan",
                            "where": "WHERE part_partdescriptionfileID=1"
                        }
                    },
                    "children": []
                },
                {
                    "key": "1-1",
                    "label": "Pin Configs",
                    "data": {
                        "data": {
                            "tableName": "part_pin_config",
                            "where": "WHERE part_partdescriptionfileID=1"
                        }
                    },
                    "children": [
                        {
                            "key": "QFN32",
                            "label": "QFN32",
                            "data": {
                                "data": {
                                    "tableName": "part_pad_bonding",
                                    "where": "WHERE part_pin_configID=1"
                                }
                            },
                            "children": []
                        },
                        {
                            "key": "QFN48",
                            "label": "QFN48",
                            "data": {
                                "data": {
                                    "tableName": "part_pad_bonding",
                                    "where": "WHERE part_pin_configID=2"
                                }
                            },
                            "children": []
                        },
                        {
                            "key": "QFN64",
                            "label": "QFN64",
                            "data": {
                                "data": {
                                    "tableName": "part_pad_bonding",
                                    "where": "WHERE part_pin_configID=3"
                                }
                            },
                            "children": []
                        },
                        {
                            "key": "SOIC28",
                            "label": "SOIC28",
                            "data": {
                                "data": {
                                    "tableName": "part_pad_bonding",
                                    "where": "WHERE part_pin_configID=4"
                                }
                            },
                            "children": []
                        }
                    ]
                },
                {
                    "key": "1-2",
                    "label": "file",
                    "data": {
                        "data": {
                            "tableName": "part_file",
                            "where": "WHERE part_partdescriptionfileID=1"
                        }
                    },
                    "children": []
                },
                {
                    "key": "1-3",
                    "label": "Part",
                    "data": {
                        "data": {
                            "tableName": "part_part",
                            "where": "WHERE part_partdescriptionfileID=1"
                        }
                    },
                    "children": [
                        {
                            "key": "undefined",
                            "label": "Variants",
                            "data": {
                                "data": {
                                    "tableName": "part_variant",
                                    "where": "WHERE part_partID =1"
                                }
                            },
                            "children": []
                        },
                        {
                            "key": "undefined",
                            "label": "Functions",
                            "data": {
                                "data": {
                                    "tableName": "part_function",
                                    "where": "WHERE part_partID =1"
                                }
                            },
                            "children": []
                        }
                    ]
                },
                {
                    "key": "1-4",
                    "label": "core",
                    "data": {
                        "data": {
                            "tableName": "part_core",
                            "where": "WHERE part_partdescriptionfileID=1"
                        }
                    },
                    "children": []
                },
                {
                    "key": "1-5",
                    "label": "Memory",
                    "data": {
                        "data": {
                            "tableName": "part_memory",
                            "where": "WHERE part_partdescriptionfileID=1"
                        }
                    },
                    "children": [
                        {
                            "key": "1-5-0",
                            "label": "Block",
                            "data": {
                                "data": {
                                    "tableName": "part_block",
                                    "where": "WHERE part_memoryID =1"
                                }
                            },
                            "children": [
                                {
                                    "key": "EEPROM",
                                    "label": "EEPROM",
                                    "data": {
                                        "data": {
                                            "tableName": "part_parameter",
                                            "where": "WHERE part_blockID = 1"
                                        }
                                    },
                                    "children": []
                                },
                                {
                                    "key": "FUSES",
                                    "label": "FUSES",
                                    "data": {
                                        "data": {
                                            "tableName": "part_parameter",
                                            "where": "WHERE part_blockID = 2"
                                        }
                                    },
                                    "children": []
                                },
                                {
                                    "key": "INTERNAL_SRAM",
                                    "label": "INTERNAL_SRAM",
                                    "data": {
                                        "data": {
                                            "tableName": "part_parameter",
                                            "where": "WHERE part_blockID = 3"
                                        }
                                    },
                                    "children": []
                                },
                                {
                                    "key": "IO",
                                    "label": "IO",
                                    "data": {
                                        "data": {
                                            "tableName": "part_parameter",
                                            "where": "WHERE part_blockID = 4"
                                        }
                                    },
                                    "children": []
                                },
                                {
                                    "key": "LOCKBITS",
                                    "label": "LOCKBITS",
                                    "data": {
                                        "data": {
                                            "tableName": "part_parameter",
                                            "where": "WHERE part_blockID = 5"
                                        }
                                    },
                                    "children": []
                                },
                                {
                                    "key": "MAPPED_PROGMEM",
                                    "label": "MAPPED_PROGMEM",
                                    "data": {
                                        "data": {
                                            "tableName": "part_parameter",
                                            "where": "WHERE part_blockID = 6"
                                        }
                                    },
                                    "children": []
                                },
                                {
                                    "key": "PROD_SIGNATURES",
                                    "label": "PROD_SIGNATURES",
                                    "data": {
                                        "data": {
                                            "tableName": "part_parameter",
                                            "where": "WHERE part_blockID = 7"
                                        }
                                    },
                                    "children": []
                                },
                                {
                                    "key": "PROGMEM",
                                    "label": "PROGMEM",
                                    "data": {
                                        "data": {
                                            "tableName": "part_parameter",
                                            "where": "WHERE part_blockID = 8"
                                        }
                                    },
                                    "children": []
                                },
                                {
                                    "key": "SIGNATURES",
                                    "label": "SIGNATURES",
                                    "data": {
                                        "data": {
                                            "tableName": "part_parameter",
                                            "where": "WHERE part_blockID = 9"
                                        }
                                    },
                                    "children": []
                                },
                                {
                                    "key": "USER_SIGNATURES",
                                    "label": "USER_SIGNATURES",
                                    "data": {
                                        "data": {
                                            "tableName": "part_parameter",
                                            "where": "WHERE part_blockID = 10"
                                        }
                                    },
                                    "children": []
                                }
                            ]
                        }
                    ]
                },
                {
                    "key": "1-6",
                    "label": "packages",
                    "data": {
                        "data": {
                            "tableName": "part_package",
                            "where": "WHERE part_partdescriptionfileID=1"
                        }
                    },
                    "children": []
                },
                {
                    "key": "1-7",
                    "label": "pads",
                    "data": {
                        "data": {
                            "tableName": "part_pad",
                            "where": "WHERE part_partdescriptionfileID=1"
                        }
                    },
                    "children": []
                },
                {
                    "key": "1-8",
                    "label": "interfaces",
                    "data": {
                        "data": {
                            "tableName": "part_interface",
                            "where": "WHERE part_partdescriptionfileID=1"
                        }
                    },
                    "children": []
                },
                {
                    "key": "1-9",
                    "label": "propery_groups",
                    "data": {
                        "data": {
                            "tableName": "part_property_group",
                            "where": "WHERE part_partdescriptionfileID=1"
                        }
                    },
                    "children": []
                },
                {
                    "key": "1-10",
                    "label": "power_domains",
                    "data": {
                        "data": {
                            "tableName": "part_power_domain",
                            "where": "WHERE part_partdescriptionfileID=1"
                        }
                    },
                    "children": []
                },
                {
                    "key": "1-11",
                    "label": "io_modules",
                    "data": {
                        "data": {
                            "tableName": "part_io_module",
                            "where": "WHERE part_partdescriptionfileID=1"
                        }
                    },
                    "children": []
                }
            ]
        }
    ]

};

export const initialState_noData: AppState = {
    currentPage: PAGE_TYPE.LOGIN,
    loginMode: LOGIN_MODES.Guest,
    device: '',
    isConnected: false,
    dbParams: { type: AUTH_TYPE.WINDOW_AUTH, userName: "test_user", password: "password", dbUrl: "test_dbUrl", database: "test_database" },
    partSelected: '1',
   
    
  };
let store = createStore(rootReducer);
const createCustomStore = (initialState:AppState) => {
    store = {
        ...store, ...store.getState().app = initialState
    }
    return store
}

beforeEach(() => {
    store = createStore(rootReducer);
    cleanup
});

const renderApp = (): RenderResult =>
    render(
        <Provider store={store}>
            <TreeView />
        </Provider>
    );

afterEach(cleanup);

describe('TreeView Controls Event Testing', () => {
    it("TreeView  Treeview Control", () => {
        createCustomStore(initialState_treeViewData);
        renderApp();
        let treeView = screen.getByText(/Part Description/i);
        fireEvent.click(treeView)
        expect(store.getState().app.treeViewData?.[0].label).toBe("Part Description")
    });
})

describe('TreeView Controls Event Testing', () => {
    it("TreeView Main Div Control", () => {
        createCustomStore(initialState_noData);
        renderApp();
        let treeView = screen.getByTestId(/treeview/i);
        fireEvent.click(treeView)
        expect(store.getState().app.treeViewData?.[0].label).toBeUndefined();
    });
})