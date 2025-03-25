import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { api } from '@services/api';
import { COLORS, SPACING, FONTS } from 'src/constants/index.ts';

// Định nghĩa kiểu dữ liệu cho item
interface User {
  id: string;
  username: string;
  avatar: string;
}

interface ChatItem {
  id: string;
  user: User;
  lastMessage: string;
  unreadCount: number;
}

export const ChatListScreen = ({ navigation }: any) => {
  const [chats, setChats] = useState<ChatItem[]>([]); // Xác định kiểu dữ liệu

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await api.get('/chats');
      setChats(response.data); // Đảm bảo API trả về đúng định dạng
    } catch (error) {
      console.error('Lỗi khi tải danh sách chat:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('Chat', { chatId: item.id, user: item.user })}
    >
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.username}>{item.user.username}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      {item.unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id.toString()} // Đã sửa lỗi id
        refreshing={loading}
        onRefresh={fetchChats}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  chatItem: {
    flexDirection: 'row',
    padding: SPACING.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  username: {
    fontSize: FONTS.sizes.md,
    fontFamily: FONTS.medium,
    marginBottom: SPACING.xs,
  },
  lastMessage: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textLight,
  },
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: COLORS.background,
    fontSize: FONTS.sizes.xs,
    fontFamily: FONTS.families.primary.bold, // Sửa lại theo cấu trúc FONTS mới
    paddingHorizontal: SPACING.xs,
  },
});

