import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';

interface ChatItem {
  id: string;
  name: string;
  lastMessage?: string;
  time?: string;
  avatar?: string;
}

const MessagesScreen = () => {
  const router = useRouter();
  
  const chats: ChatItem[] = [
    {
      id: '1',
      name: 'Văn Đức Anh',
      lastMessage: 'Đã trả lời Locket của bạn!',
      time: '5 thg 2 11:01 CH'
    },
    {
      id: '2',
      name: 'Nguyễn Hoài Nam',
      lastMessage: 'kk',
      time: '5 thg 2 11:01 CH'
    },
    {
      id: '3',
      name: 'Lê Việt Hưng',
      lastMessage: '=))',
      time: '8 thg 2 8:13 CH'
    },
    {
      id: '4',
      name: 'Thu Hà',
      lastMessage: 'Ước nhớ',
      time: '8 thg 2 8:13 CH'
    },
    {
      id: '5',
      name: 'Diệu Anh',
      lastMessage: 'ô',
      time: '8 thg 2 8:13 CH'
    }
  ];

  const handleBack = () => {
    router.back();
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
        <Text style={styles.title}>Tin nhắn</Text>
      </View>

      {/* Chat List */}
      <ScrollView style={styles.chatList}>
        {chats.map((chat) => (
          <TouchableOpacity 
            key={chat.id}
            style={styles.chatItem}
            onPress={() => router.push(`/chat/${chat.id}` as any)}
          >
            <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <View style={styles.defaultAvatar} />
              </View>
            </View>
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>{chat.name}</Text>
              <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{chat.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333333',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333333',
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333333',
    overflow: 'hidden',
  },
  defaultAvatar: {
    width: '100%',
    height: '100%',
    backgroundColor: '#666666',
    borderRadius: 25,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 17,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 15,
    color: '#888888',
  },
  timeContainer: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  time: {
    fontSize: 12,
    color: '#666666',
  }
});

export default MessagesScreen; 
