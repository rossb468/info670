import React, {useState, useEffect} from 'react';
import { Alert, Button, TextInput, TouchableOpacity, View, Text, Image, StyleSheet, SafeAreaView, Dimensions, useWindowDimensions, ScrollView} from 'react-native';
import { imageMap, profile } from './Data';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ route }) {

  const { width: screenWidth } = useWindowDimensions();
  const [imageDimensions, setImageDimensions] = useState(50,50);

  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(profile['bio']);
  const [storedBio, setStoredBio] = useState("");

  const [selectedOption, setSelectedOption] = useState('option1');

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
  const loadOption = async () => {
      const stored = await AsyncStorage.getItem('radioOption');
      if (stored) setSelectedOption(stored);
    };
    loadOption();
  }, []);

  const handleRadioChange = async (value) => {
    setSelectedOption(value);
    await AsyncStorage.setItem('radioOption', value);
  };

  useEffect(() => {
    const loadBio = async () => {
      const loadedBio = await AsyncStorage.getItem('bio');
      if (loadedBio !== null) {
        setBio(loadedBio);
        setStoredBio(loadedBio);
      }
    };
    loadBio();

    calculateImageSize();

    // This is supposed to resize the image when the device orientation changes, but
    // it's not working on the iPhone Simulator for some reason.
    const subscription = Dimensions.addEventListener('change', calculateImageSize);

    return () => subscription?.remove();
  }, [screenWidth, 'profile']);

  const handleDone = async () => {
    if (bio !== storedBio) {
      await AsyncStorage.setItem('bio', bio);
      setStoredBio(bio);
    }
    setIsEditing(false);
  };

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
          {isEditing ? (
            <TextInput
              style={[styles.text, { borderWidth: 1, borderColor: '#ccc', padding: 6, borderRadius: 4, minWidth: 200 }]}
              value={bio}
              onChangeText={setBio}
              multiline
              autoFocus
              onBlur={handleDone}
            />
          ) : (
            <Text style={styles.text}>{bio}</Text>
          )}

        <TouchableOpacity style={{ width: '100%', alignSelf: 'flex-start' }}>
          <Text
            style={{ color: '#007AFF', fontSize: 16, marginTop: 2 }}
            onPress={isEditing ? handleDone : () => setIsEditing(true)}
          >
            {isEditing ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
            
        <Text style={[styles.title, {marginTop: 16}]}>Photography Equipment</Text>
        <Text style={styles.text}>Nikon D300</Text>
        <Text style={styles.text}>Sigma 105mm 2.8 DGMacro lens</Text>
        <Text style={styles.text}>Nikon f1.8 50mm</Text>
        <Text style={styles.text}>Feisol CT3342 Tripod with Acratech Ballhead</Text>
        <Text style={styles.text}>Elements 10</Text>
        <Text style={styles.text}>Topaz Adjust, Topaz DeNoise, Topaz Simplify, Topaz Details</Text>
        <Text style={styles.text}>Color Effex Pro 2; Viveza 2</Text>

        <Text style={[styles.title, {marginTop: 16}]}>App Settings</Text>
        <Text style={styles.text}>These don't really do anything, but their state is saved to local storage!</Text>
        <View style={styles.radioRow}>
          <TouchableOpacity style={styles.radioOption} onPress={() => handleRadioChange('option1')}>
            <View style={styles.radioCircleOuter}>
              {selectedOption === 'option1' && (
                <View style={styles.radioCircleInner} />
              )}
            </View>
            <Text>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.radioOption} onPress={() => handleRadioChange('option2')}>
            <View style={styles.radioCircleOuter}>
              {selectedOption === 'option2' && (
                <View style={styles.radioCircleInner} />
              )}
            </View>
            <Text>Option 2</Text>
          </TouchableOpacity>
        </View>
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

  radioRow: {
    flexDirection: 'row',
    marginVertical: 16,
  },

  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },

  radioCircleOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  
  radioCircleInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
});