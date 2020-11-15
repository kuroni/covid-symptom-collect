import { createStore } from 'redux';

export const types = {
    EDIT: 'EDIT',
    INIT: 'INIT',
    CLEAR: 'CLEAR',
}

export const actionCreators = {
    edit: item => {
        return { type: types.EDIT, payload: item };
    },
    init: item => {
        return { type: types.INIT, payload: item };
    },
    clear: () => {
        return { type: types.CLEAR };
    },
}

export const reducer = (state = {}, action) => {
    const { type } = action;

    switch (type) {
        case types.EDIT: {
            const { payload } = action;
            return {
                ...state,
                ...payload
            };
        }
        case types.INIT: {
            const { payload } = action;
            return {
                ...payload,
                ...state
            };
        }
        case types.CLEAR: {
            return {};
        }
    }

    return state;
}

const store = createStore(reducer);
export default store;
