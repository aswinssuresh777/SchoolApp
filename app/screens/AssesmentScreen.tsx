// // import React, { useEffect, useState } from "react";
// // import {
// //     ActivityIndicator,
// //     StyleSheet,
// //     Text,
// //     TouchableOpacity,
// //     View,
// // } from "react-native";

// // // Mock Question component
// // const QuestionComponent = ({ question, selectedOption, onSelectOption }) => {
// //   return (
// //     <View style={styles.questionContainer}>
// //       <Text style={styles.questionText}>{question.text}</Text>
// //       {question.options.map((option, index) => (
// //         <TouchableOpacity
// //           key={index}
// //           style={[
// //             styles.optionBox,
// //             selectedOption === option && styles.optionSelected,
// //           ]}
// //           onPress={() => onSelectOption(option)}
// //         >
// //           <Text
// //             style={[
// //               styles.optionText,
// //               selectedOption === option && styles.optionSelectedText,
// //             ]}
// //           >
// //             {option}
// //           </Text>
// //         </TouchableOpacity>
// //       ))}
// //     </View>
// //   );
// // };

// // // Mock API call
// // const fetchAssessmentData = async (currentIndex = 0) => {
// //   const mockData = [
// //     {
// //       id: 1,
// //       text: "What is the capital of France?",
// //       options: ["London", "Paris", "Rome", "Berlin"],
// //       correct: "Paris",
// //       timer: 10,
// //     },
// //     {
// //       id: 2,
// //       text: "Which language runs in a web browser?",
// //       options: ["C", "Python", "JavaScript", "Java"],
// //       correct: "JavaScript",
// //       timer: 8,
// //     },
// //     {
// //       id: 3,
// //       text: "2 + 2 = ?",
// //       options: ["3", "4", "5", "6"],
// //       correct: "4",
// //       timer: 6,
// //     },
// //   ];

// //   const total = mockData.length;
// //   const question = mockData[currentIndex];
// //   const answered = currentIndex;
// //   const unanswered = total - answered - 1;

// //   return new Promise((resolve) => {
// //     setTimeout(() => {
// //       resolve({
// //         success: true,
// //         question,
// //         totalQuestions: total,
// //         answered,
// //         unanswered,
// //       });
// //     }, 500);
// //   });
// // };

// // export default function AssessmentScreen() {
// //   const [loading, setLoading] = useState(true);
// //   const [question, setQuestion] = useState(null);
// //   const [timer, setTimer] = useState(0);
// //   const [selectedOption, setSelectedOption] = useState(null);
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [totalQuestions, setTotalQuestions] = useState(0);
// //   const [answered, setAnswered] = useState(0);
// //   const [unanswered, setUnanswered] = useState(0);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [completed, setCompleted] = useState(false);

// //   // Fetch question
// //   const loadQuestion = async (index = 0) => {
// //     setLoading(true);
// //     const response = await fetchAssessmentData(index);
// //     if (response.success) {
// //       setQuestion(response.question);
// //       setTimer(response.question.timer);
// //       setTotalQuestions(response.totalQuestions);
// //       setAnswered(response.answered);
// //       setUnanswered(response.unanswered);
// //       setSelectedOption(null);
// //     }
// //     setLoading(false);
// //   };

// //   // Submit answer and load next question
// //   const handleSubmit = async () => {
// //     if (!selectedOption) return;

// //     setSubmitting(true);
// //     // Mock sending data
// //     await new Promise((res) => setTimeout(res, 800));

// //     const nextIndex = currentIndex + 1;
// //     if (nextIndex < totalQuestions) {
// //       setCurrentIndex(nextIndex);
// //       await loadQuestion(nextIndex);
// //     } else {
// //       setCompleted(true);
// //     }
// //     setSubmitting(false);
// //   };

// //   // Timer effect
// //   useEffect(() => {
// //     if (timer > 0 && !completed) {
// //       const countdown = setTimeout(() => setTimer((t) => t - 1), 1000);
// //       return () => clearTimeout(countdown);
// //     } else if (timer === 0 && !completed) {
// //       handleSubmit(); // auto next when timer hits 0
// //     }
// //   }, [timer]);

// //   useEffect(() => {
// //     loadQuestion(0);
// //   }, []);

// //   if (loading) {
// //     return (
// //       <View style={styles.centered}>
// //         <ActivityIndicator size="large" color="#0080ff" />
// //       </View>
// //     );
// //   }

// //   if (completed) {
// //     return (
// //       <View style={styles.centered}>
// //         <Text style={styles.doneTitle}>🎉 Assessment Completed</Text>
// //         <Text style={styles.doneSub}>
// //           You answered {answered} out of {totalQuestions}
// //         </Text>
// //         <TouchableOpacity style={styles.restartBtn} onPress={() => {
// //           setCompleted(false);
// //           setCurrentIndex(0);
// //           loadQuestion(0);
// //         }}>
// //           <Text style={styles.restartText}>Restart</Text>
// //         </TouchableOpacity>
// //       </View>
// //     );
// //   }

// //   return (
// //     <View style={styles.container}>
// //       {/* Header Info */}
// //       <View style={styles.header}>
// //         <Text style={styles.headerText}>Q {currentIndex + 1}/{totalQuestions}</Text>
// //         <Text style={styles.headerText}>⏱ {timer}s</Text>
// //       </View>

// //       {/* Progress Info */}
// //       <View style={styles.progressRow}>
// //         <Text style={styles.progressText}>Answered: {answered}</Text>
// //         <Text style={styles.progressText}>Unanswered: {unanswered}</Text>
// //       </View>

// //       {/* Question Section */}
// //       <QuestionComponent
// //         question={question}
// //         selectedOption={selectedOption}
// //         onSelectOption={setSelectedOption}
// //       />

// //       {/* Submit Button */}
// //       <TouchableOpacity
// //         style={[
// //           styles.submitBtn,
// //           !selectedOption && styles.disabledBtn,
// //         ]}
// //         disabled={!selectedOption || submitting}
// //         onPress={handleSubmit}
// //       >
// //         <Text style={styles.submitText}>
// //           {submitting ? "Submitting..." : "Submit"}
// //         </Text>
// //       </TouchableOpacity>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: "#f8faff", padding: 16 },
// //   centered: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //   },
// //   header: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginBottom: 12,
// //   },
// //   headerText: {
// //     fontSize: 16,
// //     fontWeight: "600",
// //     color: "#333",
// //   },
// //   progressRow: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginBottom: 20,
// //   },
// //   progressText: { fontSize: 14, color: "#666" },
// //   questionContainer: {
// //     backgroundColor: "#fff",
// //     borderRadius: 12,
// //     padding: 16,
// //     elevation: 2,
// //   },
// //   questionText: {
// //     fontSize: 17,
// //     fontWeight: "600",
// //     color: "#222",
// //     marginBottom: 14,
// //   },
// //   optionBox: {
// //     borderWidth: 1,
// //     borderColor: "#ddd",
// //     borderRadius: 10,
// //     paddingVertical: 12,
// //     paddingHorizontal: 10,
// //     marginVertical: 6,
// //   },
// //   optionSelected: {
// //     backgroundColor: "#0080ff",
// //     borderColor: "#0080ff",
// //   },
// //   optionText: {
// //     color: "#333",
// //     fontSize: 15,
// //   },
// //   optionSelectedText: {
// //     color: "#fff",
// //   },
// //   submitBtn: {
// //     backgroundColor: "#0080ff",
// //     padding: 14,
// //     borderRadius: 10,
// //     alignItems: "center",
// //     marginTop: 20,
// //   },
// //   disabledBtn: {
// //     backgroundColor: "#aacfff",
// //   },
// //   submitText: {
// //     color: "#fff",
// //     fontWeight: "600",
// //     fontSize: 16,
// //   },
// //   doneTitle: {
// //     fontSize: 22,
// //     fontWeight: "700",
// //     color: "#222",
// //     marginBottom: 10,
// //   },
// //   doneSub: { fontSize: 16, color: "#555", marginBottom: 20 },
// //   restartBtn: {
// //     backgroundColor: "#0080ff",
// //     paddingHorizontal: 24,
// //     paddingVertical: 12,
// //     borderRadius: 10,
// //   },
// //   restartText: { color: "#fff", fontWeight: "600", fontSize: 16 },
// // });

// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   StatusBar,
// } from "react-native";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from '@expo/vector-icons';

// // 🧩 Mock Question Component (Choose the best)
// const QuestionComponent = ({ question, selectedOption, onSelectOption }) => {
//   return (
//     <View style={styles.questionBox}>
//       <Text style={styles.questionText}>{question.text}</Text>
//       {question.options.map((opt, i) => (
//         <TouchableOpacity
//           key={i}
//           style={[
//             styles.option,
//             selectedOption === opt && styles.optionSelected,
//           ]}
//           onPress={() => onSelectOption(opt)}
//         >
//           <Text
//             style={[
//               styles.optionText,
//               selectedOption === opt && styles.optionTextSelected,
//             ]}
//           >
//             {opt}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// // 🧠 Mock API (Simulated Server)
// const fetchAssessmentData = async (index = 0) => {
//   const mockData = [
//     {
//       id: 1,
//       text: "What is the capital of France?",
//       options: ["Paris", "London", "Berlin", "Rome"],
//       timer: 5000, // milliseconds → 5s
//     },
//     {
//       id: 2,
//       text: "Which language runs in a web browser?",
//       options: ["C", "Python", "JavaScript", "Java"],
//       timer: 8000, // 8 seconds
//     },
//     {
//       id: 3,
//       text: "2 + 2 = ?",
//       options: ["3", "4", "5", "6"],
//       timer: 6000, // 6 seconds
//     },
//   ];

//   const total = mockData.length;
//   const question = mockData[index];
//   const answered = index;
//   const unanswered = total - answered - 1;

//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve({
//         success: true,
//         question,
//         totalQuestions: total,
//         answered,
//         unanswered,
//       });
//     }, 300);
//   });
// };

// export default function AssessmentScreen() {
//   const [loading, setLoading] = useState(true);
//   const [question, setQuestion] = useState(null);
//   const [timer, setTimer] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [totalQuestions, setTotalQuestions] = useState(0);
//   const [answered, setAnswered] = useState(0);
//   const [unanswered, setUnanswered] = useState(0);
//   const [submitting, setSubmitting] = useState(false);
//   const [completed, setCompleted] = useState(false);

//   // 🕐 Fetch Question
//   const loadQuestion = async (index = 0) => {
//     setLoading(true);
//     const response = await fetchAssessmentData(index);
//     if (response.success) {
//       setQuestion(response.question);
//       setTimer(response.question.timer / 1000); // convert ms → sec
//       setTotalQuestions(response.totalQuestions);
//       setAnswered(response.answered);
//       setUnanswered(response.unanswered);
//       setSelectedOption(null);
//     }
//     setLoading(false);
//   };

//   // ✅ Submit Answer or Move to Next Automatically
//   const handleSubmit = async () => {
//     setSubmitting(true);

//     await new Promise((res) => setTimeout(res, 500)); // simulate send API

//     const next = currentIndex + 1;
//     if (next < totalQuestions) {
//       setCurrentIndex(next);
//       await loadQuestion(next);
//     } else {
//       setCompleted(true);
//     }

//     setSubmitting(false);
//   };

//   // ⏳ Timer Effect
//   useEffect(() => {
//     if (timer > 0 && !completed) {
//       const countdown = setTimeout(() => setTimer((t) => t - 1), 1000);
//       return () => clearTimeout(countdown);
//     } else if (timer === 0 && !completed) {
//       handleSubmit(); // auto move when time over
//     }
//   }, [timer]);

//   useEffect(() => {
//     loadQuestion(0);
//   }, []);

//   // 🌀 Loading
//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#007bff" />
//       </View>
//     );
//   }

//   // 🏁 Completed Screen
//   if (completed) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.completeTitle}>🎉 Assessment Completed</Text>
//         <Text style={styles.completeSubtitle}>
//           You answered {answered} out of {totalQuestions}
//         </Text>

//         <TouchableOpacity
//           style={styles.restartBtn}
//           onPress={() => {
//             setCompleted(false);
//             setCurrentIndex(0);
//             loadQuestion(0);
//           }}
//         >
//           <Text style={styles.restartText}>Restart Test</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   // 🧭 Main UI
//   return (
//     <SafeAreaView style={styles.Maincontainer}>
//     <StatusBar barStyle="dark-content" />
//     <View style={styles.container}>
//       {/* Top Info Bar */}
//       <View style={styles.header}>
//         <View style={styles.headerBox}>
//           <Text style={styles.headerLabel}>Question</Text>
//           <Text style={styles.headerValue}>
//             {currentIndex + 1}/{totalQuestions}
//           </Text>
//         </View>
//         <View style={[styles.headerBox, { alignItems: "flex-end" }]}>
//           <Text style={styles.headerLabel}>Time Left</Text>
//           <Text
//             style={[
//               styles.headerValue,
//               { color: timer <= 3 ? "#ff5555" : "#007bff" },
//             ]}
//           >
//             {timer}s
//           </Text>
//         </View>
//       </View>

//       {/* Progress Row */}
//       <View style={styles.progressRow}>
//         <Text style={styles.progressText}>✅ Answered: {answered}</Text>
//         <Text style={styles.progressText}>❌ Unanswered: {unanswered}</Text>
//       </View>

//       {/* Question Display */}
//       <QuestionComponent
//         question={question}
//         selectedOption={selectedOption}
//         onSelectOption={setSelectedOption}
//       />

//       {/* Submit Button */}
//       <TouchableOpacity
//         style={[
//           styles.submitBtn,
//           !selectedOption && styles.submitDisabled,
//         ]}
//         disabled={!selectedOption || submitting}
//         onPress={handleSubmit}
//       >
//         <Text style={styles.submitText}>
//           {submitting ? "Submitting..." : "Submit"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   Maincontainer: {
//     flex: 1,
//     backgroundColor: '#f3f4f6',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 18,
//     backgroundColor: '#FFF',
//     borderBottomWidth: 1,
//     borderBottomColor: '#E6E6E6',
//   },
//   backButton: { padding: 8 },
//   headerTitle: { fontSize: 20, fontWeight: '700', color: '#1A1A1A' },
//   container: {
//     flex: 1,
//     backgroundColor: "#f3f6fb",
//     padding: 16,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 10,
//   },
//   headerBox: {
//     flexDirection: "column",
//   },
//   headerLabel: {
//     fontSize: 13,
//     color: "#777",
//   },
//   headerValue: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#222",
//   },
//   progressRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 15,
//   },
//   progressText: {
//     fontSize: 14,
//     color: "#555",
//   },
//   questionBox: {
//     flex: 1,
//     backgroundColor: "#fff",
//     borderRadius: 16,
//     padding: 18,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   questionText: {
//     fontSize: 17,
//     fontWeight: "600",
//     color: "#222",
//     marginBottom: 16,
//   },
//   option: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 12,
//     paddingVertical: 12,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//     justifyContent: "center",
//   },
//   optionSelected: {
//     backgroundColor: "#007bff",
//     borderColor: "#007bff",
//   },
//   optionText: {
//     fontSize: 15,
//     color: "#333",
//   },
//   optionTextSelected: {
//     color: "#fff",
//   },
//   submitBtn: {
//     backgroundColor: "#007bff",
//     padding: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 16,
//   },
//   submitDisabled: {
//     backgroundColor: "#aac9f0",
//   },
//   submitText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "600",
//   },
//   completeTitle: {
//     fontSize: 22,
//     fontWeight: "700",
//     color: "#222",
//     marginBottom: 8,
//   },
//   completeSubtitle: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 20,
//   },
//   restartBtn: {
//     backgroundColor: "#007bff",
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 10,
//   },
//   restartText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

import { URLS } from "@/constants/urls";
import { useUser } from "@/context/UserContext";
import { apiClient } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  Alert,
  BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


// =======================================================================================
// MOCK DATA
// =======================================================================================
const mockData = {
  "error": false,
  "message": "Assessment generated successfully",
  "assessment": {
      "session_id": "2f99f5f5-ef80-4138-ad09-b66596aa23ed",
      "session_name": "Tamil Assessment - 11/20/2025",
      "total_questions": 5,
      "total_marks": 5,
      "time_limit_minutes": 5,
      "started_at": "2025-11-20T05:11:32.509Z",
      "end_time": "2025-11-20T05:16:32.509Z"
  },
  "questions": [
      {
          "question_id": "d3d008ba-d95b-43ab-a5d8-cd99e98d8f7b",
          "question_text": "வேர்ச்சொல்லை, மனச்சொல்லை, மாறிமாறாடை ஆகியவற்றைக் குறிப்பிடும் பயிறிவழை—",
          "question_type": "MCQ",
          "difficulty_level": "Easy",
          "marks": 1,
          "topic_name": "அறிவியல், தொழில்நுட்பம்",
          "options": [
              {
                  "option_id": "d5e8271c-c301-4b6e-9b11-709d16afbb74",
                  "option_text": "குலை வாக்கு",
                  "option_letter": "A"
              },
              {
                  "option_id": "fd6024d4-38cd-4f49-a9ba-82957f9c7828",
                  "option_text": "மனை வாக்கு",
                  "option_letter": "B"
              },
              {
                  "option_id": "8b3c1a6a-5a47-4d95-8098-3d22ce01afec",
                  "option_text": "கொடுத்த வாக்கு",
                  "option_letter": "C"
              },
              {
                  "option_id": "0a50bbfb-470c-4f18-9dd3-e948c0ad6e18",
                  "option_text": "விலை வாக்கு",
                  "option_letter": "D"
              }
          ]
      },
      {
          "question_id": "bd8e2c48-65c8-4dd0-92f5-b8ec9da4469b",
          "question_text": "‘கேட்டவர் மகிழப் பாடிய பாடல் இது’ — தொடரில் இடம்பெற்றுள்ள தொழிற்பெயரும் விளைவாய்பெயரும் பெறும் முதலியே—",
          "question_type": "MCQ",
          "difficulty_level": "Easy",
          "marks": 1,
          "topic_name": "அறிவியல், தொழில்நுட்பம்",
          "options": [
              {
                  "option_id": "90d83c6c-d04c-4fd1-9ac6-202db58737f2",
                  "option_text": "பாடப்; கேட்டவர்",
                  "option_letter": "A"
              },
              {
                  "option_id": "297fb626-2c7b-48f8-8e8e-1d9e48d5a066",
                  "option_text": "பாடல்; பாடிய",
                  "option_letter": "B"
              },
              {
                  "option_id": "8df35cb9-b63e-4de4-a286-2fcfd615513b",
                  "option_text": "கேட்டவர்; பாடப்",
                  "option_letter": "C"
              },
              {
                  "option_id": "ae02f56d-825e-44b4-b445-7d35ede3b64d",
                  "option_text": "பாடல்; கேட்டவர்",
                  "option_letter": "D"
              }
          ]
      },
      {
          "question_id": "e3c289ab-6d23-480b-960c-a88b4be5f2c2",
          "question_text": "‘காப்பாய் இலையையும் காப்பாய் தோளையும்’ அடிக்கோட்டுப் பகுதி குறிப்பு பெறுவது—",
          "question_type": "MCQ",
          "difficulty_level": "Easy",
          "marks": 1,
          "topic_name": "அறிவியல், தொழில்நுட்பம்",
          "options": [
              {
                  "option_id": "c89e6a75-3127-4957-afbb-59639393faef",
                  "option_text": "இலைவும் சருகும்",
                  "option_letter": "A"
              },
              {
                  "option_id": "67224255-8f8b-4b78-a0bc-278c102ef889",
                  "option_text": "தோளையம் சண்டும்",
                  "option_letter": "B"
              },
              {
                  "option_id": "0c370c24-b3d8-4a87-b25e-dca184f1d17a",
                  "option_text": "தாழும் ஒளையும்",
                  "option_letter": "C"
              },
              {
                  "option_id": "18f6a4f7-86d9-4ec8-a283-6672d284aece",
                  "option_text": "சருகும் சண்டும்",
                  "option_letter": "D"
              }
          ]
      },
      {
          "question_id": "9fa281cf-3db5-4da3-a849-1fb8d8a35e68",
          "question_text": "எந்தநூனா என்பதைப் பிரித்தால் இவ்வாறு வரும்—",
          "question_type": "MCQ",
          "difficulty_level": "Easy",
          "marks": 1,
          "topic_name": "அறிவியல், தொழில்நுட்பம்",
          "options": [
              {
                  "option_id": "d71048d3-8dc3-4ae0-9eee-0d19f885e1fb",
                  "option_text": "எ + தமிழ் + நா",
                  "option_letter": "A"
              },
              {
                  "option_id": "cf5cd754-d84d-4d52-a0b6-a9bcab4815cd",
                  "option_text": "எந்த + தமிழ் + நா",
                  "option_letter": "B"
              },
              {
                  "option_id": "51bef075-e396-4f0b-bd7b-533da2dc6d04",
                  "option_text": "எம் + தமிழ் + நா",
                  "option_letter": "C"
              },
              {
                  "option_id": "e6f0b3c0-f0e4-4a2f-93b6-1a239a09d610",
                  "option_text": "எந்தம் + தமிழ் + நா",
                  "option_letter": "D"
              }
          ]
      },
      {
          "question_id": "7b5d6b7e-1c48-4c7a-ae84-b7dca8dcf901",
          "question_text": "‘மெத்த வணிகலை’ என்னும் தொழிலில் தமிழ்மொழியாளர் குறைப்பது எது?",
          "question_type": "MCQ",
          "difficulty_level": "Easy",
          "marks": 1,
          "topic_name": "அறிவியல், தொழில்நுட்பம்",
          "options": [
              {
                  "option_id": "d6671b0f-630d-4b82-8525-9ad7e05fb499",
                  "option_text": "வணிகக் கம்பெனிகளும் ஷாப்பிங்களும் காப்பியங்களும்",
                  "option_letter": "A"
              },
              {
                  "option_id": "913da1cf-77a2-4cc0-a2ec-198aa45d0490",
                  "option_text": "பெரும் வணிகமும் பெரும் கலைகளும்",
                  "option_letter": "B"
              },
              {
                  "option_id": "3adb3f17-fb05-4cf0-9f7d-815e3cb43385",
                  "option_text": "ஷாப்பிங்கு காப்பியங்களும் அலங்கணங்களும்",
                  "option_letter": "C"
              },
              {
                  "option_id": "fb61feb0-cf47-4dcb-afe1-73f2cb52df92",
                  "option_text": "வணிகக் கம்பெனிகள் அலங்கணங்களும்",
                  "option_letter": "D"
              }
          ]
      }
  ]
};
// (I removed the long mock to shorten; keep your own full mock)


// =======================================================================================
// QUESTION COMPONENT
// =======================================================================================
const QuestionComponent = ({ question, selectedOption, onSelectOption }) => {
  if (!question) return null;

  return (
    <View style={styles.questionBox}>
      <Text style={styles.topicName}>Topic: {question.topic_name}</Text>
      <Text style={styles.questionText}>{question.question_text}</Text>

      {question.options?.map((opt) => {
        const isSelected = selectedOption === opt.option_id;

        return (
          <TouchableOpacity
            key={opt.option_id}
            style={[styles.option, isSelected && styles.optionSelected]}
            onPress={() => onSelectOption(opt.option_id)}
            activeOpacity={0.7}
          >
            <View style={styles.optionBadge}>
              <Text style={styles.optionBadgeText}>{opt.option_letter}</Text>
            </View>

            <Text
              style={[
                styles.optionText,
                isSelected && styles.optionTextSelected,
              ]}
            >
              {opt.option_text}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};



// =======================================================================================
// MOCK API FORMAT EXACTLY LIKE BACKEND
// =======================================================================================
const fetchAssessmentData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        error: false,
        message: "Assessment generated successfully",
        assessment: mockData.assessment,
        questions: mockData.questions,
      });
    }, 300);
  });
};



// =======================================================================================
// MAIN SCREEN
// =======================================================================================
export default function AssessmentScreen() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [assessmentInfo, setAssessmentInfo] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [unanswered, setUnanswered] = useState([]);

  const [timer, setTimer] = useState(0);
  const [completed, setCompleted] = useState(false);

  const { state } = useUser();
  const { userData } = state;
  const { selectedTopics = [], questionCount = 5 } = useLocalSearchParams() ?? {};



  // =======================================================================================
  // BLOCK HARDWARE BACK
  // =======================================================================================
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Assessment in Progress",
        "There is an active assessment. You cannot go back now.",
        [{ text: "OK", style: "cancel" }]
      );
      return true;
    };

    const handler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => handler.remove();
  }, []);



  // =======================================================================================
  // LOAD DATA
  // =======================================================================================
  const loadAssessment = async () => {
    setLoading(true);

    try {
      const response = await fetchAssessmentData();

      if (response.error) {
        setLoading(false);
        return;
      }

      setAssessmentInfo(response.assessment);
      setQuestions(response.questions);

      // timer in seconds
      setTimer(response.assessment.time_limit_minutes * 60);
    } catch (err) {
      console.log("Assessment error:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadAssessment();
  }, []);



  // =======================================================================================
  // TIMER + AUTO SUBMIT
  // =======================================================================================
  useEffect(() => {
    if (!questions.length || completed) return;

    if (timer > 0) {
      const t = setTimeout(() => setTimer((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }

    if (timer === 0 && !completed) {
      Alert.alert("Time's Up!", "Your assessment has been submitted automatically.");
      handleSubmit();
    }
  }, [timer, questions, completed]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };



  // =======================================================================================
  // SELECT OPTION
  // =======================================================================================
  const handleSelectOption = (optionId) => {
    const q = questions[currentIndex];

    setAnswers((prev) => ({
      ...prev,
      [q.question_id]: optionId,
    }));

    setUnanswered((prev) => prev.filter((x) => x !== currentIndex));

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 250);
  };



  // =======================================================================================
  // NAVIGATION
  // =======================================================================================
  const goNext = () => {
    const q = questions[currentIndex];

    if (!answers[q.question_id]) {
      setUnanswered((prev) =>
        prev.includes(currentIndex) ? prev : [...prev, currentIndex]
      );
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };



  // =======================================================================================
  // SUBMIT
  // =======================================================================================
  const handleSubmit = () => {
    if(unanswered.length>0)
    {
      Alert.alert("You have unanswered questions please complete it to Submit Assesment");
      return ;
    }
    setCompleted(true);
    console.log("FINAL ANSWERS:", answers);
  };



  // =======================================================================================
  // LOADING
  // =======================================================================================
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }



  // =======================================================================================
  // MAIN UI
  // =======================================================================================
  const currentQ = questions[currentIndex];
  const selected = answers[currentQ?.question_id];

  return (
    <SafeAreaView style={styles.Maincontainer}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>

        {/* Header */}
        <View style={styles.topBar}>
          <View style={styles.headerBox}>
            <Text style={styles.headerLabel}>Question</Text>
            <Text style={styles.headerValue}>
              {currentIndex + 1}/{questions.length}
            </Text>
          </View>

          <View style={styles.headerBox}>
            <Text style={styles.headerLabel}>Time Left</Text>
            <Text style={[styles.headerValue, { color: timer < 60 ? "red" : "#007bff" }]}>
              {formatTime(timer)}
            </Text>
          </View>
        </View>



       



        {/* Question */}
        <ScrollView style={{ flex: 1 }}>
          <QuestionComponent
            question={currentQ}
            selectedOption={selected}
            onSelectOption={handleSelectOption}
          />
        </ScrollView>

{/* Unanswered Navigator */}
{unanswered.length > 0 && (
          <View style={styles.questionNavigator}>
            <Text style={styles.unansweredTitle}>Unanswered Questions</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {unanswered.map((idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => setCurrentIndex(idx)}
                  style={[
                    styles.questionDot,
                    currentIndex === idx && styles.questionDotActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.questionDotText,
                      currentIndex === idx && styles.questionDotTextActive,
                    ]}
                  >
                    {idx + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Navigation Buttons */}
        <View style={styles.navigationRow}>
          <TouchableOpacity
            style={[
              styles.navButton,
              styles.prevButton,
              currentIndex === 0 && styles.disabledBtn,
            ]}
            disabled={currentIndex === 0}
            onPress={goPrev}
          >
            <Text style={styles.navButtonText}>← Previous</Text>
          </TouchableOpacity>



          {currentIndex === questions.length - 1 ? (
            <TouchableOpacity style={styles.submitFinalBtn} onPress={handleSubmit}>
              <Text style={styles.submitFinalText}>Submit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.navButton} onPress={goNext}>
              <Text style={styles.navButtonText}>Next →</Text>
            </TouchableOpacity>
          )}
        </View>
 
      </View>
    </SafeAreaView>
  );
}




// =======================================================================================
// STYLES
// =======================================================================================
const styles = StyleSheet.create({
  Maincontainer: { flex: 1, backgroundColor: "#f3f6fb" },
  container: { flex: 1, padding: 16 },

  centered: { flex: 1, justifyContent: "center", alignItems: "center" },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  headerBox: { alignItems: "center" },
  headerLabel: { fontSize: 12, color: "#777" },
  headerValue: { fontSize: 20, fontWeight: "700" },

  questionBox: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    elevation: 2,
  },

  questionText: { fontSize: 17, fontWeight: "600", marginBottom: 16 },
  topicName: { color: "#007bff", fontWeight: "700", marginBottom: 6 },

  option: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  optionSelected: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },

  optionBadge: {
    width: 26,
    height: 26,
    backgroundColor: "#007bff",
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  optionBadgeText: { color: "#fff", fontWeight: "700" },

  optionText: { fontSize: 15, flex: 1 },
  optionTextSelected: { color: "#fff" },

  navigationRow: { flexDirection: "row", gap: 12, marginTop: 12 },

  navButton: {
    flex: 1,
    backgroundColor: "#007bff",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  prevButton: { backgroundColor: "#555" },
  disabledBtn: { opacity: 0.4 },
  navButtonText: { color: "#fff", fontWeight: "700" },

  submitFinalBtn: {
    flex: 1,
    backgroundColor: "#28a745",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  submitFinalText: { color: "#fff", fontWeight: "700" },


  // Unanswered
  questionNavigator: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  unansweredTitle: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 10,
    color: "#ff5555",
  },
  questionDot: {
    width: 40,
    height: 40,
    backgroundColor: "#ffe6e6",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ff5555",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  questionDotActive: {
    backgroundColor: "#ff5555",
    borderColor: "#ff5555",
  },
  questionDotText: { color: "#ff5555", fontWeight: "700" },
  questionDotTextActive: { color: "#fff" },

});
