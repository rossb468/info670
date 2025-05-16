import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, Dimensions, useWindowDimensions} from 'react-native';
import { imageMap } from './Data';

export default function DetailScreen({ route }) {
  const {
    title,
    id,
    imageKey,
    description,
    author,
    authorLocation,
    date,
    category,
    speed,
    fStop,
    filmSpeed,
    apature,
    tags
  } = route.params;

  const { width: screenWidth } = useWindowDimensions();
  const [imageDimensions, setImageDimensions] = useState({width: 50, height: 50});

  const calculateImageSize = () => {
    const imageSource = imageMap[imageKey];
    const source = Image.resolveAssetSource(imageSource);

    if(source?.width && source?.height) {
      const aspectRatio = source.width / source.height;
      const imageWidth = screenWidth
      const imageHeight = screenWidth / aspectRatio;

      setImageDimensions({width: imageWidth, height: imageHeight});
    }
  }

  useEffect(() => {
    calculateImageSize();

    // This is supposed to resize the image when the device orientation changes, but
    // it's not working on the iPhone Simulator for some reason.
    const subscription = Dimensions.addEventListener('change', calculateImageSize);

    return () => subscription?.remove();
  }, [screenWidth, imageKey]);

  return (
    <SafeAreaView style={styles.container}>
    <Image
      source={imageMap[imageKey]}
      style={{
        width: imageDimensions.width,
        height: imageDimensions.height,
      }}
      resizeMode='contain'
    />
  <View>
    <Text style={styles.title}>{title}</Text>
    <Text>Posted by {author} ({authorLocation}) on {date}</Text>
    <Text>{description}</Text>
      <Text>{category}</Text>
      <View>
        <Text>{speed}</Text>
        <Text>{fStop}</Text>
        <Text>{filmSpeed}</Text>
        <Text>{apature}</Text>
    </View>
  </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'flex-start'
  },

  title: {
    fontSize: 32,
    fontFamily: "System",
    fontWeight: 'light',
    marginBottom: 8,
    marginLeft: 8
  },
});