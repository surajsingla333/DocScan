import * as FileSystem from 'expo-file-system';
export const ADD_IMAGE = "ADD_IMAGE";

export const addImage = (image) => {

  return async dispatch => {
    const fileName = image.split('/').pop();

    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath
      })
    }
    catch (err) {
      console.log(err);
      throw err;
    }
    dispatch({ type: ADD_IMAGE, imageData: { uri: newPath } });
  }
}