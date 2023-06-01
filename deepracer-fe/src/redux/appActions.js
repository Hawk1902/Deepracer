const SET_SCORES = "app/setScores"

function setScores(scores) {
    return {
        type: SET_SCORES,
        payload: scores
    }
}

const UPDATE_MODEL_NAME = "app/updateModelName"

function updateModelName(modelName) {
    return {
        type: UPDATE_MODEL_NAME,
        payload: modelName
    }
}

export { setScores, updateModelName };