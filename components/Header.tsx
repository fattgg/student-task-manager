import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Plus, Bell, Search } from 'lucide-react-native';

type HeaderProps = {
  title: string;
  showAdd?: boolean;
  showNotification?: boolean;
  showSearch?: boolean;
  onAddPress?: () => void;
  onNotificationPress?: () => void;
  onSearchPress?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  title,
  showAdd = false,
  showNotification = false,
  showSearch = false,
  onAddPress,
  onNotificationPress,
  onSearchPress,
}) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.background,
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.text,
    },
    actionsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 12,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.actionsContainer}>
        {showSearch && (
          <TouchableOpacity style={styles.iconButton} onPress={onSearchPress}>
            <Search size={20} color={colors.text} />
          </TouchableOpacity>
        )}
        {showNotification && (
          <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
            <Bell size={20} color={colors.text} />
          </TouchableOpacity>
        )}
        {showAdd && (
          <TouchableOpacity style={styles.iconButton} onPress={onAddPress}>
            <Plus size={20} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;