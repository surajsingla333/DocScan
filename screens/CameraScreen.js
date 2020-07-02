import React, { useState } from 'react';
import { View, Text, ScrollView, Button, StyleSheet } from 'react-native';

import { useDispatch } from 'react-redux';

import ImageSelector from '../components/ImageSelector';

import * as imagesActions from '../store/image/action';

const CameraScreen = props => {

  const [selectedImage, setSelectedImage] = useState();

  const dispatch = useDispatch();

  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  }

  const saveImage = () => {
    // console.log("Save Image", selectedImage);
    dispatch(imagesActions.addImage(selectedImage));
    props.navigation.navigate("Pages")
  }

  return (

    <ScrollView>
      <View style={styles.screen}>
        <ImageSelector onImageTaken={imageTakenHandler} />
      </View>
      <Button title="Save Image" onPress={saveImage} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  }
})

export default CameraScreen;