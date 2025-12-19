import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnalyzeMistakesScreen = () => {
  const mistakes = 0; // You can get this from context or props

  const mockMistakes = [
    {
      id: 1,
      question: 'What is the capital of France?',
      userAnswer: 'London',
      correctAnswer: 'Paris',
      subject: 'Geography',
      date: '2024-01-15',
    },
    {
      id: 2,
      question: 'Solve: 2x + 5 = 13',
      userAnswer: 'x = 3',
      correctAnswer: 'x = 4',
      subject: 'Mathematics',
      date: '2024-01-14',
    },
    {
      id: 3,
      question: 'What is the chemical symbol for Gold?',
      userAnswer: 'Go',
      correctAnswer: 'Au',
      subject: 'Chemistry',
      date: '2024-01-13',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.replace('/(home)')}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analyze Mistakes</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{mistakes}</Text>
          <Text style={styles.summaryLabel}>Total Mistakes</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>3</Text>
          <Text style={styles.summaryLabel}>Subjects</Text>
        </View>
      </View>

      {/* Mistakes List */}
      <ScrollView style={styles.mistakesList} showsVerticalScrollIndicator={false}>
        {mockMistakes.map((mistake) => (
          <View key={mistake.id} style={styles.mistakeCard}>
            <View style={styles.mistakeHeader}>
              <Text style={styles.subjectTag}>{mistake.subject}</Text>
              <Text style={styles.dateText}>{mistake.date}</Text>
            </View>
            
            <Text style={styles.questionText}>{mistake.question}</Text>
            
            <View style={styles.answerContainer}>
              <View style={styles.answerRow}>
                <Text style={styles.answerLabel}>Your Answer:</Text>
                <Text style={styles.wrongAnswer}>{mistake.userAnswer}</Text>
              {/* </View>
              <View style={styles.answerRow}> */}
                <Text style={styles.answerLabel}>Correct Answer:</Text>
                <Text style={styles.correctAnswer}>{mistake.correctAnswer}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
  placeholder: { width: 40 },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryNumber: { fontSize: 28, fontWeight: '700', color: '#1A1A1A' },
  summaryLabel: { fontSize: 14, color: '#666', marginTop: 4 },
  summaryDivider: { width: 1, backgroundColor: '#E6E6E6', marginHorizontal: 20 },
  mistakesList: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },
  mistakeCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  mistakeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectTag: {
    backgroundColor: '#E3F2FD',
    color: '#1976D2',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
  },
  dateText: { fontSize: 12, color: '#888' },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
    lineHeight: 22,
  },
  answerContainer: { gap: 8 },
  answerRow: { flexDirection: 'column', justifyContent: 'space-between', },
  answerLabel: { fontSize: 14, color: '#666', fontWeight: '500' },
  wrongAnswer: { fontSize: 14, color: '#EF4444', fontWeight: '600' },
  correctAnswer: { fontSize: 14, color: '#10B981', fontWeight: '600' },
});

export default AnalyzeMistakesScreen;
