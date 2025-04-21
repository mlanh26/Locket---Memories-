import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ChatOptionsModal from './ChatOptionsModal';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

const ChatScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  const messages: Message[] = [
    {
      id: '1',
      text: 'Hết tếttết',
      timestamp: '5 thg 2 11:01 CH',
      isMe: false
    },
    {
      id: '2',
      text: 'nào lên hanoi ní ơiơi',
      timestamp: '5 thg 2 11:01 CH',
      isMe: false
    },
    {
      id: '3',
      text: 'Cuối tuần lên á',
      timestamp: '8 thg 2 8:53 CH',
      isMe: true
    },
    {
      id: '4',
      text: 'Cơm hnhn',
      timestamp: '8 thg 2 8:53 CH',
      isMe: false
    },
    {
      id: '5',
      text: 'eeee',
      timestamp: '8 thg 2 8:54 CH',
      isMe: false
    }
  ];

  const handleBack = () => {
    router.push('/messages');
  };

  const handleBlock = () => {
    // Xử lý logic chặn người dùng ở đây
    setModalVisible(false);
    // Có thể thêm thông báo hoặc chuyển hướng sau khi chặn
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Image 
            source={require('../../assets/images/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <View style={styles.avatar}>
            <View style={styles.defaultAvatar} />
          </View>
          <Text style={styles.userName}>Văn Đức Anh</Text>
          <TouchableOpacity 
            style={styles.moreButton}
            onPress={() => setModalVisible(true)}
          >
            <Image 
              source={require('../../assets/images/more.png')}
              style={styles.moreIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messageList}>
        {messages.map((message) => (
          <View 
            key={message.id} 
            style={[
              styles.messageContainer,
              message.isMe ? styles.myMessage : styles.theirMessage
            ]}
          >
            <Text style={styles.messageText}>{message.text}</Text>
            <Text style={styles.timestamp}>{message.timestamp}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Gửi tin nhắn..."
          placeholderTextColor="#666666"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Image 
            source={require('../../assets/images/send.png')}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
      {/* Chat Options Modal */}
      <ChatOptionsModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onBlock={handleBlock}
        userName="Đức Anh"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  backButton: {
    padding: 8,
    marginLeft: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    overflow: 'hidden',
  },
  defaultAvatar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#666666',
    borderRadius: 20,
  },
  userName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  moreButton: {
    padding: 8,
  },
  moreIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  messageList: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 16,
    padding: 12,
    borderRadius: 16,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFB800',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#333333',
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginRight: 12,
    color: '#FFFFFF',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFB800',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: '#000000',
  },
});

export default ChatScreen;