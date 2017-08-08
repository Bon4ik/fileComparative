import { fromPromise } from 'rxjs/observable/fromPromise';
import { combineEpics } from 'redux-observable';
import axios from 'axios';
import constants from '../constants/comparative';

async function uploadDocumentRequest ({file, name, id}) {
    const data = new FormData();
    data.append('file', file);
    data.append('name', name);
    return await axios.post(`/api/file/${id}`, data)
};

const registerEpic = (action$, { getState, dispatch }) =>
  action$.ofType(constants.UPLOAD_FILE)
    .mergeMap(action => 
      fromPromise(uploadDocumentRequest(action.data))  
      .map(response => {
        if (response.data.status === 'error') {
          return {
            type: constants.UPLOAD_FILE_FAIL,
            error: response.data.message,
          }
        } else {
          return {
            type: constants.UPLOAD_FILE_SUCCESS,
            data: response.data,
          }
        }
      })
    );

export default combineEpics(
  registerEpic,
);