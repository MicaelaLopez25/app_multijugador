import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'SelectAvatar'> & {
  setAvatar: (avatar: any) => void; // ajusta tipo si sabes qué devuelve require()
};

const AvatarSelector: React.FC<Props> = ({ navigation, setAvatar }) => {
  const avatars = [
    { name: 'Avatar 1', file: require('../assets/animations/NormalAni.json') },
    // Agrega más avatares aquí si es necesario
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige tu Avatar</Text>
      <View style={styles.avatarContainer}>
        {avatars.map((avatar, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setAvatar(avatar.file);
              navigation.navigate('Chat');
            }}
          >
            <LottieView source={avatar.file} autoPlay loop style={{ width: 120, height: 120 }} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' },
  title: { color: '#000', fontSize: 24, marginBottom: 20 },
  avatarContainer: { flexDirection: 'row', gap: 20 },
});

export default AvatarSelector;
