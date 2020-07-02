import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import Colors from '../constants/Colors';

const ImageSelector = props => {

  const [pickedImage, setPickedImage] = useState();

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5
    });

    setPickedImage(image);
    props.onImageTaken(image.uri);

  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (<Text>No image picked yet.</Text>) :
          (<Image style={{width: (pickedImage.width)/10, height: (pickedImage.height)/10}} source={{uri: pickedImage.uri, width: (pickedImage.width)/10, height: (pickedImage.height)/10}} />)}
      </View>
      <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: "center",
    borderColor: '#ccc',
    borderWidth: 1
  },
  // image: {
  //   width: '100%',
  //   height: '100%'
  // }

})

export default ImageSelector;