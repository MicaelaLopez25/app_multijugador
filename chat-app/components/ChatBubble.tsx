import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { getAnimationFromMessage } from '../utils/avatarAnimations';

type Props = {
  message?: string;  // Opcional, para que TS permita undefined
  isOwn: boolean;
  avatar?: any;
};

const ChatBubble: React.FC<Props> = ({ message, isOwn, avatar }) => {
  if (!message) {
    // Si message es undefined o vacío, no renderizamos nada o un fallback
    return null;
  }

  const emotionAnim = getAnimationFromMessage(message);

  return (
    <View style={[styles.messageRow, isOwn ? styles.ownRow : styles.otherRow]}>
      {!isOwn && (
        <LottieView source={emotionAnim} autoPlay loop style={styles.avatarAnim} />
      )}
      <View style={[styles.bubble, isOwn ? styles.ownBubble : styles.otherBubble]}>
        <Text style={[styles.messageText, isOwn ? styles.ownText : styles.otherText]}>
          {message}
        </Text>
      </View>
      {isOwn && (
        <LottieView source={emotionAnim} autoPlay loop style={styles.avatarAnim} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  ownRow: {
    justifyContent: 'flex-end',
  },
  otherRow: {
    justifyContent: 'flex-start',
  },
  avatarAnim: {
    width: 40,
    height: 40,
  },
  bubble: {
    maxWidth: '75%',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginHorizontal: 6,
  },
  ownBubble: {
    backgroundColor: '#dcf8c6',
    borderTopRightRadius: 0,
  },
  otherBubble: {
    backgroundColor: '#2a2a2a',
    borderTopLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
  },
  ownText: {
    color: '#000',
  },
  otherText: {
    color: '#fff',
  },
});

export default ChatBubble;
