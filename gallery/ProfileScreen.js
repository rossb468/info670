import React, {useState, useEffect} from 'react';
import { Alert, View, Text, Image, StyleSheet, SafeAreaView, Dimensions, useWindowDimensions, ScrollView} from 'react-native';
import { imageMap } from './Data';

export default function ProfileScreen({ route }) {

  const { width: screenWidth } = useWindowDimensions();
  const [imageDimensions, setImageDimensions] = useState(50,50);

  const calculateImageSize = () => {
    const imageSource = imageMap['profile'];
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
  }, [screenWidth, 'profile']);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView shouldRasterizeIOS={false} contentContainerStyle={{ alignItems: 'flex-start', paddingBottom: 20}}>
        <View>
          <Image
            source={imageMap['profile']}
            style={{
              width: imageDimensions.width,
              height: imageDimensions.height,
            }}
            resizeMode='contain'
          />
        </View>
      <View style={styles.details}>
        <Text style={styles.title}>Anita Bower</Text>
        <Text style={styles.text}>I began this photoblog in November 2007 to encourage myself to take photos on a regular basis. It has worked better than I hoped.</Text>
        <Text style={[styles.text, {marginTop: 8}]}>Taking photos opens up the world to me, allowing me to see what's around me in new ways. Sometimes the new discovery is made as I take the photo, and sometimes when I see the photo on my monitor. This photoblog allows me to share these discoveries with you.</Text>
        <Text style={[styles.text, {marginTop: 8}]}>My goals are to continue to see the world better, become a more proficient photographer, share my photos with others, and enjoy the whole process. :-)</Text>
      
        <Text style={styles.title}>Photography Equipment</Text>
        <Text style={styles.text}>Nikon D300</Text>
        <Text style={styles.text}>Sigma 105mm 2.8 DGMacro lens</Text>
        <Text style={styles.text}>Nikon f1.8 50mm</Text>
        <Text style={styles.text}>Feisol CT3342 Tripod with Acratech Ballhead</Text>
        <Text style={styles.text}>Elements 10</Text>
        <Text style={styles.text}>Topaz Adjust, Topaz DeNoise, Topaz Simplify, Topaz Details</Text>
        <Text style={styles.text}>Color Effex Pro 2; Viveza 2</Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    color: '#888886',
  },

  metadata: {
    marginTop: 8
  },
});