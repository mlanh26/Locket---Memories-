import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, FlatList, TextInput, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import { Button } from '@components/Button';
import { Message } from '@components/Message'; // sửa lại import
import { api } from '@services/api';
import { COLORS, SPACING } from '@constants/index';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App'; // thêm import

type ChatScreenProps = NativeStackScreenProps<RootStackParamList, 'Chat'>;

interface MessageType {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
  user?: {
    id: string;
    username: string;
    avatar?: string;
  };
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ route, navigation }) => {
  const { userId, username } = route.params;
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef<FlatList | null>(null);

  const fetchMessages = useCallback(async () => {
    try {
      const response = await api.get<{ data: MessageType[] }>(`/chats/${userId}/messages`);
      setMessages(response.data.data);
    } catch (error) {
      console.error('Lỗi khi tải tin nhắn:', error);
    }
  }, [userId]);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) {
      return;
    }
    try {
      const response = await api.post<{ data: MessageType }>(`/chats/${userId}/messages`, {
        content: newMessage,
      });
      setMessages(prev => [...prev, response.data.data]);
      setNewMessage('');
      flatListRef.current?.scrollToEnd();
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
    }
  };

  // Cập nhật title của screen
  useEffect(() => {
    navigation.setOptions({
      title: username,
    });
  }, [navigation, username]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => <Message message={item} />}
        keyExtractor={item => item.id}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        style={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Nhập tin nhắn..."
          multiline
        />
        <Button
          title="Gửi"
          onPress={sendMessage}
          style={styles.sendButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  messageList: {
    flex: 1,
    padding: SPACING.md,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SPACING.xs,
    padding: SPACING.sm,
    marginRight: SPACING.sm,
    maxHeight: 100,
  },
  sendButton: {
    width: 80,
  },
});

export default ChatScreen;
