import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput, 
  TouchableOpacity,
  Switch,
  Platform,
  Alert
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { useTaskContext } from '@/context/TaskContext';
import { ArrowLeft, Calendar, Clock, Tag as TagIcon, Users, ChevronDown, ChevronRight, User } from 'lucide-react-native';
import { Priority, TaskStatus } from '@/types/task';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NewTaskScreen() {
  const { colors } = useTheme();
  const { addTask, categories, tags, collaborators } = useTaskContext();
  const params = useLocalSearchParams<{ date?: string }>();
  
  const initialDate = params.date ? new Date(params.date) : new Date();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(initialDate);
  const [priority, setPriority] = useState<Priority>('medium');
  const [categoryId, setCategoryId] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCollaborators, setSelectedCollaborators] = useState<string[]>([]);
  const [withReminder, setWithReminder] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [showCollaboratorPicker, setShowCollaboratorPicker] = useState(false);
  
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  
  const handleSave = () => {
    const newErrors: {title?: string; description?: string} = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const reminderDate = new Date(dueDate);
    reminderDate.setDate(reminderDate.getDate() - 1);
    
    addTask({
      title,
      description,
      dueDate,
      priority,
      status: 'pending',
      progress,
      categoryId,
      tags: selectedTags,
      collaborators: selectedCollaborators,
      attachments: [],
      reminders: withReminder ? [reminderDate] : [],
    });
    
    Alert.alert('Success', 'Task created successfully!');
    router.back();
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDate = new Date(dueDate);
      newDate.setFullYear(selectedDate.getFullYear());
      newDate.setMonth(selectedDate.getMonth());
      newDate.setDate(selectedDate.getDate());
      setDueDate(newDate);
    }
  };
  
  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(dueDate);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setDueDate(newDate);
    }
  };
  
  const getPriorityColor = (p: Priority) => {
    switch (p) {
      case 'high':
        return colors.error;
      case 'medium':
        return colors.warning;
      case 'low':
        return colors.success;
      default:
        return colors.gray;
    }
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      backgroundColor: colors.card,
    },
    backButton: {
      marginRight: 16,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    input: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: colors.text,
      borderWidth: 1,
      borderColor: colors.border,
    },
    textArea: {
      height: 120,
      textAlignVertical: 'top',
    },
    errorText: {
      color: colors.error,
      fontSize: 14,
      marginTop: 4,
    },
    selectContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    selectText: {
      fontSize: 16,
      color: colors.text,
    },
    placeholderText: {
      color: colors.gray,
    },
    priorityContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    priorityOption: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 8,
      borderRadius: 8,
      alignItems: 'center',
      marginHorizontal: 4,
    },
    priorityText: {
      fontWeight: '600',
      fontSize: 14,
      color: '#fff',
    },
    reminderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 12,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    reminderText: {
      fontSize: 16,
      color: colors.text,
    },
    progressContainer: {
      marginBottom: 20,
    },
    progressLabel: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 8,
    },
    progressValue: {
      fontSize: 14,
      color: colors.gray,
    },
    progressSlider: {
      height: 20,
      backgroundColor: colors.border,
      borderRadius: 10,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 10,
    },
    saveButton: {
      backgroundColor: colors.primary,
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 20,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    pickerContainer: {
      backgroundColor: colors.card,
      borderRadius: 8,
      padding: 16,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    pickerTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 12,
    },
    pickerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    pickerItemText: {
      fontSize: 16,
      color: colors.text,
      marginLeft: 10,
    },
    pickerItemSelected: {
      backgroundColor: colors.primary + '20',
    },
    pickerItemColor: {
      width: 16,
      height: 16,
      borderRadius: 8,
      marginRight: 8,
    },
    collaboratorAvatar: {
      width: 30,
      height: 30,
      borderRadius: 15,
      marginRight: 8,
      backgroundColor: colors.primary + '30',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dateTimeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dateTimeButton: {
      flex: 1,
      marginHorizontal: 4,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Task</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={[
              styles.input,
              errors.title ? { borderColor: colors.error } : null,
            ]}
            placeholder="Enter task title"
            placeholderTextColor={colors.gray}
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errors.title) {
                setErrors({ ...errors, title: undefined });
              }
            }}
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              errors.description ? { borderColor: colors.error } : null,
            ]}
            placeholder="Enter task description"
            placeholderTextColor={colors.gray}
            value={description}
            onChangeText={(text) => {
              setDescription(text);
              if (errors.description) {
                setErrors({ ...errors, description: undefined });
              }
            }}
            multiline
            numberOfLines={5}
          />
          {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Due Date & Time</Text>
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity 
              style={[styles.selectContainer, styles.dateTimeButton]}
              onPress={() => setShowDatePicker(true)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Calendar size={20} color={colors.primary} style={{ marginRight: 8 }} />
                <Text style={styles.selectText}>{formatDate(dueDate)}</Text>
              </View>
              <ChevronRight size={20} color={colors.gray} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.selectContainer, styles.dateTimeButton]}
              onPress={() => setShowTimePicker(true)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Clock size={20} color={colors.warning} style={{ marginRight: 8 }} />
                <Text style={styles.selectText}>{formatTime(dueDate)}</Text>
              </View>
              <ChevronRight size={20} color={colors.gray} />
            </TouchableOpacity>
          </View>
          
          {showDatePicker && Platform.OS !== 'web' && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          
          {showTimePicker && Platform.OS !== 'web' && (
            <DateTimePicker
              value={dueDate}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.priorityContainer}>
            <TouchableOpacity
              style={[
                styles.priorityOption,
                { backgroundColor: getPriorityColor('low') + (priority === 'low' ? '' : '40') },
              ]}
              onPress={() => setPriority('low')}
            >
              <Text style={styles.priorityText}>Low</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.priorityOption,
                { backgroundColor: getPriorityColor('medium') + (priority === 'medium' ? '' : '40') },
              ]}
              onPress={() => setPriority('medium')}
            >
              <Text style={styles.priorityText}>Medium</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.priorityOption,
                { backgroundColor: getPriorityColor('high') + (priority === 'high' ? '' : '40') },
              ]}
              onPress={() => setPriority('high')}
            >
              <Text style={styles.priorityText}>High</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressLabel}>
            <Text style={styles.label}>Initial Progress</Text>
            <Text style={styles.progressValue}>{progress}%</Text>
          </View>
          <TouchableOpacity
            style={styles.progressSlider}
            onPress={(e) => {
              // Calculate progress based on touch position
              const { locationX, target } = e.nativeEvent;
              target.measure((x, y, width) => {
                const percentage = Math.round((locationX / width) * 100);
                setProgress(Math.min(100, Math.max(0, percentage)));
              });
            }}
          >
            <View
              style={[
                styles.progressFill,
                { 
                  width: `${progress}%`,
                  backgroundColor: progress < 30 
                    ? colors.error 
                    : progress < 70 
                      ? colors.warning 
                      : colors.success
                },
              ]}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category</Text>
          <TouchableOpacity 
            style={styles.selectContainer}
            onPress={() => setShowCategoryPicker(!showCategoryPicker)}
          >
            <Text 
              style={[
                styles.selectText,
                !categoryId ? styles.placeholderText : null,
              ]}
            >
              {categoryId 
                ? categories.find(c => c.id === categoryId)?.name 
                : 'Select a category'}
            </Text>
            <ChevronDown size={20} color={colors.gray} />
          </TouchableOpacity>
          
          {showCategoryPicker && (
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerTitle}>Select Category</Text>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.pickerItem,
                    categoryId === category.id ? styles.pickerItemSelected : null,
                  ]}
                  onPress={() => {
                    setCategoryId(category.id);
                    setShowCategoryPicker(false);
                  }}
                >
                  <View 
                    style={[
                      styles.pickerItemColor,
                      { backgroundColor: category.color },
                    ]} 
                  />
                  <Text style={styles.pickerItemText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tags</Text>
          <TouchableOpacity 
            style={styles.selectContainer}
            onPress={() => setShowTagPicker(!showTagPicker)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TagIcon size={20} color={colors.primary} style={{ marginRight: 8 }} />
              <Text 
                style={[
                  styles.selectText,
                  selectedTags.length === 0 ? styles.placeholderText : null,
                ]}
              >
                {selectedTags.length > 0 
                  ? `${selectedTags.length} tags selected` 
                  : 'Select tags'}
              </Text>
            </View>
            <ChevronRight size={20} color={colors.gray} />
          </TouchableOpacity>
          
          {showTagPicker && (
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerTitle}>Select Tags</Text>
              {tags.map((tag) => (
                <TouchableOpacity
                  key={tag.id}
                  style={[
                    styles.pickerItem,
                    selectedTags.includes(tag.id) ? styles.pickerItemSelected : null,
                  ]}
                  onPress={() => {
                    if (selectedTags.includes(tag.id)) {
                      setSelectedTags(selectedTags.filter(id => id !== tag.id));
                    } else {
                      setSelectedTags([...selectedTags, tag.id]);
                    }
                  }}
                >
                  <TagIcon 
                    size={16} 
                    color={selectedTags.includes(tag.id) ? colors.primary : colors.gray} 
                  />
                  <Text style={styles.pickerItemText}>{tag.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Collaborators</Text>
          <TouchableOpacity 
            style={styles.selectContainer}
            onPress={() => setShowCollaboratorPicker(!showCollaboratorPicker)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Users size={20} color={colors.primary} style={{ marginRight: 8 }} />
              <Text 
                style={[
                  styles.selectText,
                  selectedCollaborators.length === 0 ? styles.placeholderText : null,
                ]}
              >
                {selectedCollaborators.length > 0 
                  ? `${selectedCollaborators.length} collaborators` 
                  : 'Add collaborators'}
              </Text>
            </View>
            <ChevronRight size={20} color={colors.gray} />
          </TouchableOpacity>
          
          {showCollaboratorPicker && (
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerTitle}>Select Collaborators</Text>
              {collaborators.map((collaborator) => (
                <TouchableOpacity
                  key={collaborator.id}
                  style={[
                    styles.pickerItem,
                    selectedCollaborators.includes(collaborator.id) ? styles.pickerItemSelected : null,
                  ]}
                  onPress={() => {
                    if (selectedCollaborators.includes(collaborator.id)) {
                      setSelectedCollaborators(selectedCollaborators.filter(id => id !== collaborator.id));
                    } else {
                      setSelectedCollaborators([...selectedCollaborators, collaborator.id]);
                    }
                  }}
                >
                  <View style={styles.collaboratorAvatar}>
                    <User size={16} color={colors.primary} />
                  </View>
                  <Text style={styles.pickerItemText}>{collaborator.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        
        <View style={styles.reminderContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Clock size={20} color={colors.warning} style={{ marginRight: 8 }} />
            <Text style={styles.reminderText}>Set Reminder</Text>
          </View>
          <Switch
            value={withReminder}
            onValueChange={setWithReminder}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={'#fff'}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Create Task</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}