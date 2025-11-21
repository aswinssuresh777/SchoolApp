import React from 'react';
import { View, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { QuestionComponent } from './QuestionComponent';

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  question: string;
  options: Option[];
  correctAnswer: string;
}

const QUESTIONS_DATA: Question[] = [
  {
    id: '1',
    question: 'What is the capital of France?',
    options: [
      { id: 'a', text: 'A) London' },
      { id: 'b', text: 'B) Paris' },
      { id: 'c', text: 'C) Berlin' },
      { id: 'd', text: 'D) Madrid' },
    ],
    correctAnswer: 'B) Paris',
  },
  {
    id: '2',
    question: 'Which planet is known as the Red Planet?',
    options: [
      { id: 'a', text: 'A) Venus' },
      { id: 'b', text: 'B) Jupiter' },
      { id: 'c', text: 'C) Mars' },
      { id: 'd', text: 'D) Saturn' },
    ],
    correctAnswer: 'C) Mars',
  },
  // Add more questions as needed
];

export const QuestionsList = () => {
  const renderQuestion = ({ item, index }: { item: Question; index: number }) => (
    <QuestionComponent
      question={item.question}
      options={item.options}
      correctAnswer={item.correctAnswer}
      questionNumber={index + 1}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={QUESTIONS_DATA}
        renderItem={renderQuestion}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  listContent: {
    padding: 16,
  },
});
