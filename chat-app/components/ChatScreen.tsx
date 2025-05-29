import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native';
import ChatBubble from './ChatBubble';
import { io, Socket } from 'socket.io-client';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';

const currentUserId = 'me';
const socketServerUrl = 'http://TU_SERVER:PORT';

type Message = {
  id: string;
  text: string;
  userId: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const flatListRef = useRef<FlatList>(null);

  // Conexión WebSocket
  useEffect(() => {
    const socket = io(socketServerUrl);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('message', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const msg: Message = {
      id: String(Date.now()),
      text: inputText,
      userId: currentUserId,
    };

    socketRef.current?.emit('message', msg);
    setMessages(prev => [...prev, msg]);
    setInputText('');
  };

  const addEmoji = (emojiObj: any) => {
    setInputText(prev => prev + emojiObj.emoji);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ChatBubble
            message={item.text}
            isOwn={item.userId === currentUserId}
          />
        )}
        contentContainerStyle={styles.chatList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

    {showEmojiPicker && (
  <View style={styles.emojiPickerContainer}>
    <EmojiSelector
      category={Categories.SMILEYS}
      onEmojiSelected={addEmoji}
      showSearchBar={false}
      showTabs={true}
      showHistory={true}
      theme="dark"
    />
  </View>
)}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setShowEmojiPicker(prev => !prev);
          }}
        >
          <Text style={styles.emojiButton}>😊</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Escribe un mensaje"
          placeholderTextColor="#aaa"
          onFocus={() => setShowEmojiPicker(false)}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
          blurOnSubmit={false}
        />

        <TouchableOpacity onPress={sendMessage}>
          <Text style={styles.sendButton}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  chatList: { paddingVertical: 10 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#1e1e1e',
  },
  input: {
    flex: 1,
    backgroundColor: '#2a2a2a',
    borderRadius: 20,
    paddingHorizontal: 15,
    color: '#fff',
    height: 40,
    fontSize: 16,
    marginHorizontal: 10,
  },
  sendButton: {
    color: '#00a884',
    fontWeight: 'bold',
  },
  emojiButton: {
    fontSize: 24,
    marginRight: 5,
  },
  emojiPickerContainer: {
    position: 'absolute',
    bottom: 60, // ajusta según la altura de tu barra de entrada
    left: 0,
    right: 0,
    backgroundColor: '#1e1e1e',
    zIndex: 10,
  },
});
