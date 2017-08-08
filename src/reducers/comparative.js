import { fromJS } from 'immutable';

import constant from '../constants/comparative';

const initialState = fromJS({
    file1: '',
    file2: '',
    error: '',
});

export default (state = initialState, action) => {
    switch (action.type) {
        case constant.UPLOAD_FILE_SUCCESS:
            return state
                .set(action.data.params, action.data.text);

        case constant.UPLOAD_FILE_FAIL:
            return state
                .set('error', action.data.message);

        case constant.ON_CHANGE_TEXTAREA:
            return state
                .set(action.data.name, action.data.text)

        default:
            return state;
    }
};