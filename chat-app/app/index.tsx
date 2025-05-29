import React, { useState } from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AvatarSelector from '../components/AvatarSelector';
import ChatScreen from '../components/ChatScreen';

// Tipado de navegación
export type RootStackParamList = {
  SelectAvatar: undefined;
  Chat: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(): JSX.Element {
  const [selectedAvatar, setSelectedAvatar] = useState<any>(null); // puedes tipar mejor si sabes el tipo de animación

  return (
  
      <Stack.Navigator initialRouteName="SelectAvatar" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SelectAvatar">
          {props => <AvatarSelector {...props} setAvatar={setSelectedAvatar} />}
        </Stack.Screen>
        <Stack.Screen name="Chat">
          {props => <ChatScreen {...props} avatar={selectedAvatar} />}
        </Stack.Screen>
      </Stack.Navigator>

  );
}
