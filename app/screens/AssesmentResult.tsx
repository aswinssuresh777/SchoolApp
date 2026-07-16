import { URLS } from "@/constants/urls";
import { apiClient } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ---- Replace this with your API response ----
const response = {
  assessment: {
    session_id: "cfb0372a-f2ad-459c-9539-7f8e6620661b",
    session_name: "Tamil - அறிவியல், தொழில்நுட்பம் Assessment",
    total_questions: 5,
    total_marks: 5,
    score: 1,
    percentage: "20.00",
    started_at: "2025-11-25T19:06:10.552Z",
    completed_at: "2025-11-25T19:06:15.916Z",
    status: "Completed",
  },
  statistics: {
    total_questions: 5,
    correct_answers: 1,
    accuracy: 20,
    average_time_seconds: 0,
  },
  answers: [
    {
      question_id: "d3d008ba-d95b-43ab-a5d8-cd99e98d8f7b",
      answer_text: null,
      selected_option_id: "fd6024d4-38cd-4f49-a9ba-82957f9c7828",
      is_correct: false,
      marks_obtained: 0,
      time_taken_seconds: 0,
      question_text:
        "வேர்ச்சொல்லை, மனச்சொல்லை, மாறிமாறாடை ஆகியவற்றைக் குறிப்பிடும் பயிறிவழை—",
      question_type: "MCQ",
      total_marks: 1,
      topic_name: "அறிவியல், தொழில்நுட்பம்",
      selected_option_text: "மனை வாக்கு",
      selected_option_letter: "B",
      correct_answer: {
        question_id: "d3d008ba-d95b-43ab-a5d8-cd99e98d8f7b",
        option_text: "குலை வாக்கு",
        option_letter: "A",
      },
    },
    {
      question_id: "bd8e2c48-65c8-4dd0-92f5-b8ec9da4469b",
      answer_text: null,
      selected_option_id: "297fb626-2c7b-48f8-8e8e-1d9e48d5a066",
      is_correct: false,
      marks_obtained: 0,
      time_taken_seconds: 0,
      question_text:
        "‘கேட்டவர் மகிழப் பாடிய பாடல் இது’ — தொடரில் இடம்பெற்றுள்ள தொழிற்பெயரும் விளைவாய்பெயரும் பெறும் முதலியே—",
      question_type: "MCQ",
      total_marks: 1,
      topic_name: "அறிவியல், தொழில்நுட்பம்",
      selected_option_text: "பாடல்; பாடிய",
      selected_option_letter: "B",
      correct_answer: {
        question_id: "bd8e2c48-65c8-4dd0-92f5-b8ec9da4469b",
        option_text: "பாடப்; கேட்டவர்",
        option_letter: "A",
      },
    },
    {
      question_id: "9fa281cf-3db5-4da3-a849-1fb8d8a35e68",
      answer_text: null,
      selected_option_id: "cf5cd754-d84d-4d52-a0b6-a9bcab4815cd",
      is_correct: true,
      marks_obtained: 1,
      time_taken_seconds: 0,
      question_text: "எந்தநூனா என்பதைப் பிரித்தால் இவ்வாறு வரும்—",
      question_type: "MCQ",
      total_marks: 1,
      topic_name: "அறிவியல், தொழில்நுட்பம்",
      selected_option_text: "எந்த + தமிழ் + நா",
      selected_option_letter: "B",
      correct_answer: {
        question_id: "9fa281cf-3db5-4da3-a849-1fb8d8a35e68",
        option_text: "எந்த + தமிழ் + நா",
        option_letter: "B",
      },
    },
    {
      question_id: "e3c289ab-6d23-480b-960c-a88b4be5f2c2",
      answer_text: null,
      selected_option_id: "0c370c24-b3d8-4a87-b25e-dca184f1d17a",
      is_correct: false,
      marks_obtained: 0,
      time_taken_seconds: 0,
      question_text:
        "‘காப்பாய் இலையையும் காப்பாய் தோளையும்’ அடிக்கோட்டுப் பகுதி குறிப்பு பெறுவது—",
      question_type: "MCQ",
      total_marks: 1,
      topic_name: "அறிவியல், தொழில்நுட்பம்",
      selected_option_text: "தாழும் ஒளையும்",
      selected_option_letter: "C",
      correct_answer: {
        question_id: "e3c289ab-6d23-480b-960c-a88b4be5f2c2",
        option_text: "இலைவும் சருகும்",
        option_letter: "A",
      },
    },
    {
      question_id: "7b5d6b7e-1c48-4c7a-ae84-b7dca8dcf901",
      answer_text: null,
      selected_option_id: "913da1cf-77a2-4cc0-a2ec-198aa45d0490",
      is_correct: false,
      marks_obtained: 0,
      time_taken_seconds: 1,
      question_text:
        "‘மெத்த வணிகலை’ என்னும் தொழிலில் தமிழ்மொழியாளர் குறைப்பது எது?",
      question_type: "MCQ",
      total_marks: 1,
      topic_name: "அறிவியல், தொழில்நுட்பம்",
      selected_option_text: "பெரும் வணிகமும் பெரும் கலைகளும்",
      selected_option_letter: "B",
      correct_answer: {
        question_id: "7b5d6b7e-1c48-4c7a-ae84-b7dca8dcf901",
        option_text: "வணிகக் கம்பெனிகளும் ஷாப்பிங்களும் காப்பியங்களும்",
        option_letter: "A",
      },
    },
  ],
};
// --------------------------------------------------

const renderEmptyAnswers = () => (
  <View style={styles.emptyContainer}>
    <View style={styles.emptyIconContainer}>
      <Ionicons name="document-text-outline" size={48} color="#94A3B8" />
    </View>

    <Text style={styles.emptyTitle}>No Answers Found</Text>

    <Text style={styles.emptyText}>
      Your assessment has no recorded answers.
    </Text>
  </View>
);

const AssesmentResult = () => {
  const { statistics } = response;
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [assessment, setAssessment] = useState([]);
  const { assessmentSessionId,fromOverall } = useLocalSearchParams();

  useEffect(() => {
    if(!fromOverall){
      const backAction = () => {
        router.replace('/(home)');
      };

      const handler = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          backAction();
          return true;
        }
      );

      return () => handler.remove();
    }
  }, []);


  const loadAssessment = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get(
        URLS.GET_ASSESMENT_RESULT(assessmentSessionId)
      );
      if (!(response as any).error) {
        setAssessment(response?.assessment);
        setAnswers(response?.answers);
        setLoading(false);
      }

      console.log(response);
    } catch (error) {
      console.log("Error calling API:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAssessment();
  }, []);

  if (answers?.length === 0) {
    renderEmptyAnswers();
  }
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }
  const statusColor =
    assessment?.status === "Completed" ? "#16a34a" : "#f59e0b";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
          {
            if(fromOverall)
            {
                router.back()
            }
            else{
            router.replace("/(home)")
            }
        }
        }
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.headerTitle}>Assessment Results</Text>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {assessment.status}
          </Text>
        </View>

        <View style={styles.placeholder} />
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{assessment.total_marks}</Text>
          <Text style={styles.summaryLabel}>Total Marks</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{assessment.score}</Text>
          <Text style={styles.summaryLabel}>Your Score</Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{assessment.percentage}%</Text>
          <Text style={styles.summaryLabel}>Percentage</Text>
        </View>
      </View>

      {/* Mistakes List */}
      <ScrollView
        style={styles.mistakesList}
        showsVerticalScrollIndicator={false}
      >
        {answers.map((item, index) => {
          return (
            <View key={index} style={styles.mistakeCard}>
              {/* Header row */}
              <View style={styles.mistakeHeader}>
                <Text style={styles.subjectTag}>{item.topic_name}</Text>
                <Text
                  style={[
                    styles.statusBadgeText,
                    {
                      backgroundColor: item.is_correct ? "#DCFCE7" : "#FEE2E2",
                      color: item.is_correct ? "#16A34A" : "#DC2626",
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 12,
                    },
                  ]}
                >
                  {item.is_correct ? "Correct" : "Wrong"}
                </Text>
              </View>

              {/* Question */}
              <Text style={styles.questionText}>{item.question_text}</Text>

              {/* Answers */}
              <View style={styles.answerContainer}>
                <View style={styles.answerRow}>
                  {/* User Answer */}
                  <Text style={styles.answerLabel}>Your Answer:</Text>
                  <Text
                    style={
                      item.is_correct
                        ? styles.correctAnswer
                        : styles.wrongAnswer
                    }
                  >
                    {item.selected_option_text || "—"}
                  </Text>

                  {/* Correct Answer */}
                  <Text style={[styles.answerLabel, { marginTop: 6 }]}>
                    Correct Answer:
                  </Text>
                  <Text style={styles.correctAnswer}>
                    {item.correct_answer?.option_letter +
                      ")" +
                      item.correct_answer?.option_text}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssesmentResult;

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, backgroundColor: "#F5F7FA" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
  },

  backButton: { padding: 4 },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1A1A1A",
    textAlign: "center",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },

  placeholder: { width: 40 },

  summaryCard: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    margin: 16,
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },

  summaryItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  summaryNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1A1A1A",
  },

  summaryLabel: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },

  summaryDivider: {
    width: 1,
    backgroundColor: "#E6E6E6",
  },

  mistakesList: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },

  mistakeCard: {
    backgroundColor: "#FFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    elevation: 1,
  },

  mistakeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  subjectTag: {
    backgroundColor: "#E3F2FD",
    color: "#1976D2",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "600",
  },

  dateText: { fontSize: 12, color: "#888" },

  questionText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 12,
    lineHeight: 22,
    flexWrap: "wrap",
  },

  answerContainer: { flexDirection: "column", gap: 6 },

  answerRow: { flexDirection: "column" },

  answerLabel: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },

  wrongAnswer: {
    fontSize: 14,
    color: "#DC2626",
    fontWeight: "700",
  },

  correctAnswer: {
    fontSize: 14,
    color: "#059669",
    fontWeight: "700",
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
