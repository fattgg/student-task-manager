import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { useTaskContext } from '@/context/TaskContext';
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import { Task } from '@/types/task';
import { router } from 'expo-router';
import CalendarStrip from 'react-native-calendar-strip';
import { Calendar as CalendarIcon } from 'lucide-react-native';

export default function CalendarScreen() {
  const { colors } = useTheme();
  const { getTasksByDate } = useTaskContext();
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const tasksForSelectedDate = getTasksByDate(selectedDate);
  
  const handleTaskPress = (task: Task) => {
    router.push({
      pathname: '/task/[id]',
      params: { id: task.id }
    });
  };
  
  const handleAddPress = () => {
    router.push({
      pathname: '/task/new',
      params: { date: selectedDate.toISOString() }
    });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    calendarContainer: {
      paddingTop: 10,
      backgroundColor: colors.card,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    dateHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    dateIcon: {
      marginRight: 8,
      backgroundColor: colors.primary + '20',
      padding: 8,
      borderRadius: 8,
    },
    dateText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    emptyText: {
      fontSize: 16,
      color: colors.gray,
      textAlign: 'center',
      marginTop: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Header 
        title="Calendar" 
        showAdd={true}
        onAddPress={handleAddPress}
      />
      
      <View style={styles.calendarContainer}>
        <CalendarStrip
          scrollable
          style={{ height: 100, paddingBottom: 10 }}
          calendarColor={colors.card}
          calendarHeaderStyle={{ color: colors.text }}
          dateNumberStyle={{ color: colors.text }}
          dateNameStyle={{ color: colors.gray }}
          highlightDateNumberStyle={{ color: colors.primary }}
          highlightDateNameStyle={{ color: colors.primary }}
          disabledDateNameStyle={{ color: colors.gray }}
          disabledDateNumberStyle={{ color: colors.gray }}
          iconContainer={{ flex: 0.1 }}
          selectedDate={selectedDate}
          onDateSelected={(date) => setSelectedDate(date.toDate())}
          highlightDateContainerStyle={{
            backgroundColor: colors.primary + '20',
            borderRadius: 8,
          }}
        />
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.dateHeader}>
          <View style={styles.dateIcon}>
            <CalendarIcon size={20} color={colors.primary} />
          </View>
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        </View>
        
        {tasksForSelectedDate.length > 0 ? (
          tasksForSelectedDate.map((task) => (
            <TaskCard key={task.id} task={task} onPress={handleTaskPress} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks for this date</Text>
            <TouchableOpacity onPress={handleAddPress}>
              <Text style={{ color: colors.primary, marginTop: 8 }}>
                Add a task
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}