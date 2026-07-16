// StudyScreen.tsx
import { URLS } from '@/constants/urls';
import { apiClient } from '@/services/api';
import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Option {
  option_id: string;
  option_text: string;
  option_letter: string;
  is_correct: boolean;
}

interface Question {
  question_id: string;
  question_text: string;
  question_type: string;
  difficulty_level: string;
  marks: number;
  topic_name: string;
  subject_name: string;
  subject_code: string;
  options: Option[];
  correct_answer: {
    option_id: string;
    option_text: string;
    option_letter: string;
  };
}

interface ApiResponse {
  error: boolean;
  questions: Question[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

const COLORS = {
  primary: '#6366F1',
  secondary: '#EC4899',
  accent: '#F59E0B',
  success: '#10B981',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#1E293B',
  textLight: '#64748B',
  border: '#E2E8F0',
  correct: '#10B981',
  incorrect: '#EF4444',
};

const StudyScreen: React.FC = () => {
      const { subjectId,topicId } = useLocalSearchParams();
    // let subjectId = 'e8d91ef9-48f9-415d-a2d7-802fbe412a91';
    //   let topicId= '542eb24c-afa4-417d-afe3-d050e6b7001f';
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());


  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      // const response = await fetch('YOUR_API_ENDPOINT');
      // const data: ApiResponse = await response.json();
      
      // Using sample data for demonstration
    //   const sampleData: ApiResponse = {
    //     error: false,
    //     questions: [
    //       {
    //         question_id: "7dcb45f9-3481-4550-993f-e947a42e6c6e",
    //         question_text: " உரத்ததே பார்ப்பன் அடியரோடு – பாரதியார் கூற்று எது? ",
    //         question_type: "MCQ",
    //         difficulty_level: "Medium",
    //         marks: 1,
    //         topic_name: "அறிவியல், தொழில்நுட்பம்",
    //         subject_name: "Tamil",
    //         subject_code: "TAMIL",
    //         options: [
    //           { option_id: "e3a4ec86-8125-4ded-aa40-4bc468ead2b1", option_text: "குலசேகரன்", option_letter: "A", is_correct: false },
    //           { option_id: "899fdc27-8fba-4b4a-8fdb-d5e52a0d28e9", option_text: "இருமையின்மை குலசேகரன்", option_letter: "B", is_correct: true },
    //           { option_id: "24ab42d5-3112-469a-bc51-6669ca135f05", option_text: "சாதி வேறுபாடு", option_letter: "C", is_correct: false },
    //           { option_id: "82443d5d-88da-43bc-8686-80162cd13ce4", option_text: "ஆன்மீக உயர்வு", option_letter: "D", is_correct: false },
    //         ],
    //         correct_answer: { option_id: "899fdc27-8fba-4b4a-8fdb-d5e52a0d28e9", option_text: "இருமையின்மை குலசேகரன்", option_letter: "B" },
    //       },
    //       {
    //         question_id: "4bda4291-a2f7-4e1e-a807-b524c0a3d631",
    //         question_text: "தலைப்புக்கும் குறிப்புகளுக்கும் பொருத்தமான விடையைத் தேர்ந்தெடுக்க",
    //         question_type: "MCQ",
    //         difficulty_level: "Medium",
    //         marks: 1,
    //         topic_name: "அறிவியல், தொழில்நுட்பம்",
    //         subject_name: "Tamil",
    //         subject_code: "TAMIL",
    //         options: [
    //           { option_id: "60ff4b2f-1567-469b-bae1-2f4e443c23da", option_text: "தலைப்புக்கும் பொருத்தமான குறிப்புகள் இடம்பெற்றுள்ளன", option_letter: "A", is_correct: true },
    //           { option_id: "d09b4a76-fe40-4154-a599-dc6b8d07a26e", option_text: "குறிப்புகள் தொடர்பற்றவை", option_letter: "B", is_correct: false },
    //           { option_id: "d3870afa-3bb1-4762-aef4-29fd450a29ae", option_text: "தலைப்பு பொருந்தவில்லை", option_letter: "C", is_correct: false },
    //           { option_id: "a2c1b20d-f4ad-4f80-8969-990f7f9d93bb", option_text: "கருப்பொருள் இல்லை", option_letter: "D", is_correct: false },
    //         ],
    //         correct_answer: { option_id: "60ff4b2f-1567-469b-bae1-2f4e443c23da", option_text: "தலைப்புக்கும் பொருத்தமான குறிப்புகள் இடம்பெற்றுள்ளன", option_letter: "A" },
    //       },
    //       {
    //         question_id: "f87c8a79-d15f-4fec-84d4-a05c7bce8bb3",
    //         question_text: "பாடலில் அமையும் இசையும் ஓசையும் எவ்வகைத் தன்மை குறிக்கின்றது?",
    //         question_type: "MCQ",
    //         difficulty_level: "Medium",
    //         marks: 1,
    //         topic_name: "அறிவியல், தொழில்நுட்பம்",
    //         subject_name: "Tamil",
    //         subject_code: "TAMIL",
    //         options: [
    //           { option_id: "503dda8f-b782-4e7b-b6df-035973a1391f", option_text: "வானொலித்தன்மை பாடலயம்", option_letter: "A", is_correct: true },
    //           { option_id: "18f95a15-903b-4fb8-b321-6077649b6bc1", option_text: "இசைமயம்", option_letter: "B", is_correct: false },
    //           { option_id: "928f0f55-e2fb-4516-94d4-97be4e54aeba", option_text: "கவிதைமயம்", option_letter: "C", is_correct: false },
    //           { option_id: "8623a04e-23e6-4bf9-af09-5bfd2c000abb", option_text: "உரைநடை", option_letter: "D", is_correct: false },
    //         ],
    //         correct_answer: { option_id: "503dda8f-b782-4e7b-b6df-035973a1391f", option_text: "வானொலித்தன்மை பாடலயம்", option_letter: "A" },
    //       },
    //       {
    //         question_id: "fdd05e43-aca1-43af-a8c8-ee13c1e931ee",
    //         question_text: "குலசேகர ஆழ்வார் விஷயத்தோடு ''மாமா'' என்ற சொல்லின் பயன்பாட்டைக் குறிக்கும் சொல் எது?",
    //         question_type: "MCQ",
    //         difficulty_level: "Medium",
    //         marks: 1,
    //         topic_name: "அறிவியல், தொழில்நுட்பம்",
    //         subject_name: "Tamil",
    //         subject_code: "TAMIL",
    //         options: [
    //           { option_id: "4334eda9-2842-4010-b5f9-fabbce72d476", option_text: "உறவுச் சொல்", option_letter: "A", is_correct: false },
    //           { option_id: "9130be2e-26e5-4ff5-87cd-67132beed2e5", option_text: "வினைச்சொல்", option_letter: "B", is_correct: false },
    //           { option_id: "ec917e8b-dba8-4556-882b-b70a851c5910", option_text: "பால் வழிமொழி, வினை வழிமொழி", option_letter: "C", is_correct: true },
    //           { option_id: "5d7c673f-5323-4f87-b533-2dca9d823180", option_text: "பெயர்ச்சொல்", option_letter: "D", is_correct: false },
    //         ],
    //         correct_answer: { option_id: "ec917e8b-dba8-4556-882b-b70a851c5910", option_text: "பால் வழிமொழி, வினை வழிமொழி", option_letter: "C" },
    //       },
    //       {
    //         question_id: "204bc9ae-db85-4ea9-abd5-420a623dea0d",
    //         question_text: "பாரத ஸ்டேட் வங்கியின் உரியாத மென்சார்ந்த சொல் எது?",
    //         question_type: "MCQ",
    //         difficulty_level: "Medium",
    //         marks: 1,
    //         topic_name: "அறிவியல், தொழில்நுட்பம்",
    //         subject_name: "Tamil",
    //         subject_code: "TAMIL",
    //         options: [
    //           { option_id: "a37daeb4-d767-480a-8bb1-663293877eb6", option_text: "துரை", option_letter: "A", is_correct: false },
    //           { option_id: "7ddd1036-ad30-4838-92ce-ddf8ec6bc1f3", option_text: "சீனா", option_letter: "B", is_correct: false },
    //           { option_id: "86ca6a79-306d-46f5-8932-1a26f6b1b16e", option_text: "சுகா", option_letter: "C", is_correct: false },
    //           { option_id: "1f31db9c-cf76-4285-97a0-a154948e1a5d", option_text: "இலா", option_letter: "D", is_correct: true },
    //         ],
    //         correct_answer: { option_id: "1f31db9c-cf76-4285-97a0-a154948e1a5d", option_text: "இலா", option_letter: "D" },
    //       },
    //     ],
    //     pagination: { page: 1, limit: 20, total: 5, total_pages: 1 },
    //   };
      
    //   setTimeout(() => {
    //     setQuestions(sampleData.questions);
    //     setLoading(false);
    //   }, 1500);
      const response = await  apiClient.get(URLS.GET_UNIT_QUESTIONS(subjectId,topicId)); // Call your login API
      if ((response as any)?.error === false) {
      console.log('classs',response?.class?.subjects)
      setQuestions(response?.questions)
      setLoading(false)
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
    //    setLoading(false);
  };

  const toggleAnswer = (questionId: string) => {
    setRevealedAnswers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'easy': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'hard': return '#EF4444';
      default: return COLORS.textLight;
    }
  };

  const getOptionBgColor = (option: Option, questionId: string) => {
    const isRevealed = revealedAnswers.has(questionId);
    if (!isRevealed) return COLORS.card;
    if (option.is_correct) return '#D1FAE5';
    return COLORS.card;
  };
const EmptyListComponent = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyIcon}>📚</Text>
    <Text style={styles.emptyTitle}>No Questions Available</Text>
    <Text style={styles.emptySubtitle}>No questions on the selected topic</Text>
  </View>
);
  const getOptionBorderColor = (option: Option, questionId: string) => {
    const isRevealed = revealedAnswers.has(questionId);
    if (!isRevealed) return COLORS.border;
    if (option.is_correct) return COLORS.correct;
    return COLORS.border;
  };

  const renderQuestion = ({ item, index }: { item: Question; index: number }) => {
    const isAnswerRevealed = revealedAnswers.has(item.question_id);
    const gradientColors = ['#6366F1', '#EC4899', '#F59E0B', '#10B981', '#8B5CF6'];
    const cardAccent = gradientColors[index % gradientColors.length];

    return (
      <View style={[styles.questionCard, { borderLeftColor: cardAccent }]}>
        {/* Question Header */}
        <View style={styles.questionHeader}>
          <View style={[styles.questionNumber, { backgroundColor: cardAccent }]}>
            <Text style={styles.questionNumberText}>{index + 1}</Text>
          </View>
          <View style={styles.badges}>
            <View style={[styles.badge, { backgroundColor: getDifficultyColor(item.difficulty_level) + '20' }]}>
              <Text style={[styles.badgeText, { color: getDifficultyColor(item.difficulty_level) }]}>
                {item.difficulty_level}
              </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: COLORS.primary + '20' }]}>
              <Text style={[styles.badgeText, { color: COLORS.primary }]}>{item.marks} Mark</Text>
            </View>
          </View>
        </View>

        {/* Subject & Topic */}
        <View style={styles.subjectRow}>
          <Text style={styles.subjectText}>{item.subject_name}</Text>
          <Text style={styles.topicText}>{item.topic_name}</Text>
        </View>

        {/* Question Text */}
        <Text style={styles.questionText}>{item.question_text}</Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {item.options.map((option) => (
            <View
              key={option.option_id}
              style={[
                styles.optionCard,
                {
                  backgroundColor: getOptionBgColor(option, item.question_id),
                  borderColor: getOptionBorderColor(option, item.question_id),
                },
              ]}
            >
              <View
                style={[
                  styles.optionLetter,
                  {
                    backgroundColor: isAnswerRevealed && option.is_correct ? COLORS.correct : cardAccent + '20',
                  },
                ]}
              >
                <Text
                  style={[
                    styles.optionLetterText,
                    { color: isAnswerRevealed && option.is_correct ? '#FFFFFF' : cardAccent },
                  ]}
                >
                  {option.option_letter}
                </Text>
              </View>
              <Text style={styles.optionText}>{option.option_text}</Text>
              {isAnswerRevealed && option.is_correct && (
                <View style={styles.correctIcon}>
                  <Text style={styles.correctIconText}>✓</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Show Answer Button */}
        <TouchableOpacity
          style={[
            styles.showAnswerButton,
            { backgroundColor: isAnswerRevealed ? COLORS.textLight : cardAccent },
          ]}
          onPress={() => toggleAnswer(item.question_id)}
          activeOpacity={0.8}
        >
          <Text style={styles.showAnswerButtonText}>
            {isAnswerRevealed ? 'Hide Answer' : 'Show Answer'}
          </Text>
        </TouchableOpacity>

        {/* Answer Explanation (when revealed) */}
        {isAnswerRevealed && (
          <View style={styles.answerReveal}>
            <Text style={styles.answerLabel}>Correct Answer:</Text>
            <Text style={styles.answerText}>
              {item.correct_answer.option_letter}. {item.correct_answer.option_text}
            </Text>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Loading Questions...</Text>
          <View style={styles.loadingDots}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={[styles.dot, { backgroundColor: [COLORS.primary, COLORS.secondary, COLORS.accent][i] }]} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📚 Study Mode</Text>
        <Text style={styles.headerSubtitle}>{questions.length} Questions</Text>
      </View>

      {/* Questions List */}
      <FlatList
        data={questions}
        keyExtractor={(item) => item.question_id}
        renderItem={renderQuestion}
          ListEmptyComponent={EmptyListComponent}
  contentContainerStyle={questions.length === 0 ? styles.emptyListContent : styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderWrapper: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  loadingDots: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  listContent: {
    padding: 16,
  },
  separator: {
    height: 16,
  },
  questionCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  subjectRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  subjectText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
  },
  topicText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 10,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionLetterText: {
    fontSize: 14,
    fontWeight: '700',
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  correctIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.correct,
    justifyContent: 'center',
    alignItems: 'center',
  },
  correctIconText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  showAnswerButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  showAnswerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  answerReveal: {
    marginTop: 16,
    padding: 14,
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.correct,
  },
  answerLabel: {
    fontSize: 12,
    color: COLORS.correct,
    fontWeight: '600',
    marginBottom: 4,
  },
  answerText: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '600',
  },
  emptyContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 40,
},
emptyListContent: {
  flexGrow: 1,
  justifyContent: 'center',
},
emptyIcon: {
  fontSize: 64,
  marginBottom: 16,
},
emptyTitle: {
  fontSize: 22,
  fontWeight: '700',
  color: COLORS.text,
  marginBottom: 8,
  textAlign: 'center',
},
emptySubtitle: {
  fontSize: 16,
  color: COLORS.textLight,
  textAlign: 'center',
},
});

export default StudyScreen;
