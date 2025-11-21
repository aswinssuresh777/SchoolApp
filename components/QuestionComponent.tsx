import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Option {
  id: string;
  text: string;
}

interface QuestionProps {
  question: string;
  options: Option[];
  correctAnswer: string;
  questionNumber: number;
}

export const QuestionComponent: React.FC<QuestionProps> = ({
  question,
  options,
  correctAnswer,
  questionNumber,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const renderOptions = () => {
    const rows = [];
    for (let i = 0; i < options.length; i += 2) {
      rows.push(
        <View key={i} style={styles.optionRow}>
          <TouchableOpacity 
            style={styles.optionContainer}
            activeOpacity={0.7}
          >
            <View style={styles.optionBadge}>
              <Text style={styles.optionBadgeText}>{String.fromCharCode(65 + i)}</Text>
            </View>
            <Text style={styles.optionText}>{options[i].text}</Text>
          </TouchableOpacity>
          {options[i + 1] && (
            <TouchableOpacity 
              style={styles.optionContainer}
              activeOpacity={0.7}
            >
              <View style={styles.optionBadge}>
                <Text style={styles.optionBadgeText}>{String.fromCharCode(65 + i + 1)}</Text>
              </View>
              <Text style={styles.optionText}>{options[i + 1].text}</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.questionCard}>
      {/* Professional Header */}
      <View style={styles.headerContainer}>
        <View style={styles.questionNumberBadge}>
          <Text style={styles.questionNumberText}>{questionNumber}</Text>
        </View>
      </View>

      {/* Question Text */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question}</Text>
      </View>
      
      {/* Options */}
      <View style={styles.optionsWrapper}>
        {renderOptions()}
      </View>

      {/* Show Answer Button */}
      <TouchableOpacity
        style={[styles.answerButton, showAnswer && styles.answerButtonActive]}
        onPress={() => setShowAnswer(!showAnswer)}
        activeOpacity={0.8}
      >
        <Text style={styles.answerButtonText}>
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </Text>
      </TouchableOpacity>

      {/* Answer Display */}
      {showAnswer && (
        <View style={styles.answerContainer}>
          <View style={styles.answerHeader}>
            <View style={styles.answerIconContainer}>
              <Text style={styles.answerIcon}>✓</Text>
            </View>
            <Text style={styles.answerLabel}>Correct Answer</Text>
          </View>
          <Text style={styles.answerText}>{correctAnswer}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  questionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  headerContainer: {
    backgroundColor: '#4f46e5',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionNumberBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  questionNumberText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  questionContainer: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 24,
  },
  optionsWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 12,
  },
  optionContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
    minHeight: 65,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  optionBadge: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#4f46e5',
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  optionBadgeText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  optionText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  answerButton: {
    backgroundColor: '#4f46e5',
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 8,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  answerButtonActive: {
    backgroundColor: '#059669',
    shadowColor: '#059669',
  },
  answerButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  answerContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },
  answerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  answerIconContainer: {
    backgroundColor: '#059669',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  answerIcon: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  answerLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#065f46',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  answerText: {
    fontSize: 15,
    color: '#047857',
    fontWeight: '600',
    lineHeight: 22,
  },
});
