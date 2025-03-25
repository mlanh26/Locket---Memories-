import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONTS } from '@constants/index';

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

interface MessageProps {
  message: MessageType;
  isOwnMessage?: boolean; // Để kiểm tra tin nhắn có phải của user hiện tại
}

export const Message: React.FC<MessageProps> = ({ message, isOwnMessage = false }) => {
  return (
    <View style={[styles.container, isOwnMessage ? styles.ownMessage : styles.otherMessage]}>
      <View
        style={[
          styles.bubble,
          isOwnMessage ? styles.ownBubble : styles.otherBubble,
        ]}
      >
        {!isOwnMessage && message.user && (
          <Text style={styles.username}>
            {message.user.username}
          </Text>
        )}
        <Text style={[
          styles.content,
          isOwnMessage ? styles.ownContent : styles.otherContent,
        ]}>
          {message.content}
        </Text>
        <Text style={[
          styles.timestamp,
          isOwnMessage ? styles.ownTimestamp : styles.otherTimestamp,
        ]}>
          {new Date(message.createdAt).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.xs,
    flexDirection: 'row',
  },
  ownMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: SPACING.sm,
    borderRadius: SPACING.sm,
  },
  ownBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: SPACING.xs,
  },
  otherBubble: {
    backgroundColor: COLORS.border,
    borderBottomLeftRadius: SPACING.xs,
  },
  username: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  content: {
    fontSize: FONTS.sizes.md,
    marginBottom: SPACING.xs,
  },
  ownContent: {
    color: COLORS.background,
  },
  otherContent: {
    color: COLORS.text,
  },
  timestamp: {
    fontSize: FONTS.sizes.xs,
    alignSelf: 'flex-end',
  },
  ownTimestamp: {
    color: COLORS.background,
    opacity: 0.8,
  },
  otherTimestamp: {
    color: COLORS.textLight,
  },
});

export default Message;
