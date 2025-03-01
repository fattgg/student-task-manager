import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ArrowLeft, CircleHelp as HelpCircle, MessageCircle, Mail, Book, ExternalLink } from 'lucide-react-native';
import { router } from 'expo-router';

export default function HelpSupportScreen() {
  const { colors } = useTheme();
  
  const faqItems = [
    {
      question: 'How do I create a new task?',
      answer: 'To create a new task, tap the "+" button in the top right corner of the home screen or tasks screen. Fill in the task details and tap "Create Task".'
    },
    {
      question: 'How do I share a task with collaborators?',
      answer: 'When creating or editing a task, scroll down to the "Collaborators" section and select the people you want to share the task with.'
    },
    {
      question: 'Can I set recurring tasks?',
      answer: 'Yes, when creating a task, you can set it to repeat daily, weekly, monthly, or custom intervals by selecting the "Repeat" option.'
    },
    {
      question: 'How do I change the app theme?',
      answer: 'Go to Settings > Theme Settings to switch between light and dark mode or select a different color scheme.'
    },
  ];
  
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
      paddingTop: 35,
      color: colors.text,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    section: {
      backgroundColor: colors.card,
      borderRadius: 12,
      marginBottom: 24,
      overflow: 'hidden',
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 16,
      marginTop: 24,
      paddingHorizontal: 4,
    },
    linkButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    lastRow: {
      borderBottomWidth: 0,
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconContainer: {
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    linkText: {
      fontSize: 16,
      color: colors.text,
    },
    faqItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    faqQuestion: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    faqAnswer: {
      fontSize: 14,
      color: colors.gray,
      lineHeight: 20,
    },
    infoText: {
      fontSize: 14,
      color: colors.gray,
      marginTop: 8,
      marginBottom: 24,
      lineHeight: 20,
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
        <Text style={styles.headerTitle}>Help & Support</Text>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Contact Support</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.linkButton}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
                <MessageCircle size={20} color={colors.primary} />
              </View>
              <Text style={styles.linkText}>Chat with Support</Text>
            </View>
            <ExternalLink size={20} color={colors.gray} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.linkButton, styles.lastRow]}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.secondary + '20' }]}>
                <Mail size={20} color={colors.secondary} />
              </View>
              <Text style={styles.linkText}>Email Support</Text>
            </View>
            <ExternalLink size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Resources</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.linkButton}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.warning + '20' }]}>
                <Book size={20} color={colors.warning} />
              </View>
              <Text style={styles.linkText}>User Guide</Text>
            </View>
            <ExternalLink size={20} color={colors.gray} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.linkButton, styles.lastRow]}>
            <View style={styles.rowLeft}>
              <View style={[styles.iconContainer, { backgroundColor: colors.success + '20' }]}>
                <HelpCircle size={20} color={colors.success} />
              </View>
              <Text style={styles.linkText}>Video Tutorials</Text>
            </View>
            <ExternalLink size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        <View style={styles.section}>
          {faqItems.map((item, index) => (
            <View 
              key={index} 
              style={[
                styles.faqItem, 
                index === faqItems.length - 1 && styles.lastRow
              ]}
            >
              <Text style={styles.faqQuestion}>{item.question}</Text>
              <Text style={styles.faqAnswer}>{item.answer}</Text>
            </View>
          ))}
        </View>
        
        <Text style={styles.infoText}>
          If you can't find the answer to your question, please contact our support team. We're here to help!
        </Text>
      </ScrollView>
    </View>
  );
}