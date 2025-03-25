import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Button } from '@components/Button';
import { ImageGrid } from 'src/components/ImageGrid.tsx';
import { useAuth } from 'src/hooks/useAuth.tsx';
import { api } from '@services/api';
import { COLORS, SPACING } from '@constants/index';
import { NavigationProp } from '@react-navigation/native';

interface Stats {
  posts: number;
  followers: number;
  following: number;
}

// interface User {
//   id: string;
//   username: string;
//   avatar?: string;
//   bio?: string;
// }

interface Post {
  id: string;
  imageUrl: string;
  caption?: string;
  userId: string;
  createdAt: string;
}



interface ProfileScreenProps {
  navigation: NavigationProp<{
    EditProfile: undefined;
    PostDetail: { post: Post };
  }>;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState<Stats>({
    posts: 0,
    followers: 0,
    following: 0,
  });

  const fetchUserData = useCallback(async () => {
    try {
      const [postsRes, statsRes] = await Promise.all([
        api.get<{ data: Post[] }>(`/users/${user.id}/posts`),
        api.get<{ data: Stats }>(`/users/${user.id}/stats`),
      ]);
      setPosts(postsRes.data.data);
      setStats(statsRes.data.data);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu người dùng:', error);
    }
  }, [user.id]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: user.avatar || 'default_avatar_url' }}
          style={styles.avatar}
        />

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.posts}</Text>
            <Text style={styles.statLabel}>Bài viết</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.followers}</Text>
            <Text style={styles.statLabel}>Người theo dõi</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.following}</Text>
            <Text style={styles.statLabel}>Đang theo dõi</Text>
          </View>
        </View>
      </View>

      <View style={styles.bioSection}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
      </View>

      <View style={styles.actionButtons}>
        <Button
          title="Chỉnh sửa trang cá nhân"
          onPress={handleEditProfile}
          style={styles.editButton}
        />
        <Button
          title="Đăng xuất"
          onPress={handleLogout}
          variant="secondary"
          style={styles.logoutButton}
        />
      </View>

      <ImageGrid
        images={posts}
        onPressImage={(post) => navigation.navigate('PostDetail', { post })}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    padding: SPACING.lg,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: SPACING.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  bioSection: {
    padding: SPACING.lg,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: SPACING.xs,
  },
  bio: {
    fontSize: 16,
    color: COLORS.text,
  },
  actionButtons: {
    padding: SPACING.lg,
  },
  editButton: {
    marginBottom: SPACING.md,
  },
  logoutButton: {
    marginTop: SPACING.md,
  },
});

export default ProfileScreen;
