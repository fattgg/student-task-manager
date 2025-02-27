import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

type ProgressBarProps = {
  progress: number;
  height?: number;
  showPercentage?: boolean;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 6,
  showPercentage = false,
}) => {
  const { colors } = useTheme();
  
  const getProgressColor = (value: number) => {
    if (value < 30) return colors.error;
    if (value < 70) return colors.warning;
    return colors.success;
  };

  const styles = StyleSheet.create({
    container: {
      height,
      backgroundColor: colors.border,
      borderRadius: height / 2,
      overflow: 'hidden',
    },
    progress: {
      height: '100%',
      width: `${progress}%`,
      backgroundColor: getProgressColor(progress),
      borderRadius: height / 2,
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 4,
    },
    text: {
      fontSize: 12,
      color: colors.gray,
    },
  });

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.progress} />
      </View>
      {showPercentage && (
        <View style={styles.textContainer}>
          <Text style={styles.text}>{progress}%</Text>
        </View>
      )}
    </View>
  );
};

export default ProgressBar;