import React, { useEffect, useState } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, Text } from 'react-native';
import { ImagePost } from '@components/ImagePost';
import { api } from '@services/api';
import { COLORS, SPACING } from '@constants/index';

interface Post {
  id: string;
  imageUrl: string;
  caption?: string;
  userId: string;
  createdAt: string;
}

export const FeedScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Đổi tên biến error thành errorMessage

  const fetchPosts = async () => {
    try {
      setErrorMessage(null); // Sử dụng tên mới
      const response = await api.get<{ data: Post[] }>('/posts');
      setPosts(response.data.data);
    } catch (err) { // Đổi tên biến error trong catch
      console.error('Lỗi khi tải bài viết:', err);
      setErrorMessage('Không thể tải bài viết. Vui lòng thử lại.'); // Sử dụng tên mới
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (errorMessage) { // Sử dụng tên mới
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <ImagePost
            uri={item.imageUrl}
            caption={item.caption || ''}
          />
        )}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[COLORS.primary]}
          />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text>Chưa có bài viết nào</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: SPACING.md,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default FeedScreen;
