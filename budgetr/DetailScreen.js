import React, {useState, useEffect} from 'react';
import { Alert, View, Text, Image, StyleSheet, SafeAreaView, Dimensions, useWindowDimensions} from 'react-native';
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
      <View style={styles.details}>
        <Text style={[styles.title, styles.text]}>{title}</Text>
        <Text style={[styles.text, {fontStyle: 'italic'}]}>Posted by {author} ({authorLocation}) on {date}</Text>
        <Text style={[styles.text, {marginTop: 8}]}>{description}</Text>
        <Text style={[styles.text, {marginTop: 8}, {fontStyle: 'italic'}]}>{category}</Text>
        <View style={styles.metadata}>
          <Text style={styles.text}>{speed}</Text>
          <Text style={styles.text}>{fStop}</Text>
          <Text style={styles.text}>{filmSpeed}</Text>
          <Text style={styles.text}>{apature}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    alignItems: 'flex-start',
    backgroundColor: 'EAEAEA',
  },

  title: {
    fontSize: 32,
    fontFamily: "System",
    fontWeight: 'light',
    marginBottom: 8,
    color: '#5E5E5C'
  },

  details: {
    marginTop: 8,
    marginLeft: 8,
    marginRgith: 8,
    padding: 8,
    backgroundColor: '#F4F4F4',

    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,

    elevation: 5
  },

  text: {
    color: '#888886', // or any color you want
  },

  metadata: {
    marginTop: 8
  },
});