import constants from '../constants/comparative';

const uploadFile = data => ({
    type: constants.UPLOAD_FILE,
    data
});

const onChangeTextArea = (data) => ({
    type: constants.ON_CHANGE_TEXTAREA,
    data
})

export default {
    onChangeTextArea,
    uploadFile,
}