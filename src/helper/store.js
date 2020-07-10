import { createStore } from 'redux';

export const types = {
    EDIT: 'EDIT',
    CLEAR: 'CLEAR',
}

export const actionCreators = {
    edit: item => {
        return { type: types.EDIT, payload: item};
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
                ...payload,
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
