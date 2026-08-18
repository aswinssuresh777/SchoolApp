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
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  BackHandler,
  Easing,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";


// =======================================================================================
// LATEX / HTML HELPERS
// =======================================================================================

const escapeHtmlText = (text = "") => {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

/**
 * Keeps LaTeX untouched while escaping normal HTML text.
 *
 * Supports:
 * $...$
 * $$...$$
 * \(...\)
 * \[...\]
 *
 * Also converts:
 * <mark>text</mark>
 * into bold text.
 */
const prepareContentForMathJax = (content = "") => {
  let text = String(content || "");

  // Convert your existing <mark>...</mark> into <strong>...</strong>
  text = text.replace(
    /<mark>([\s\S]*?)<\/mark>/gi,
    (_, value) => `__MARK_START__${value}__MARK_END__`
  );

  /*
   * Split normal text and LaTeX.
   *
   * IMPORTANT:
   * We do NOT HTML escape LaTeX because LaTeX can contain
   * characters such as &, { }, etc.
   */
  const mathRegex =
    /(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\])/g;

  const parts = text.split(mathRegex);

  return parts
    .map((part) => {
      const isMath =
        /^\$\$[\s\S]*\$\$$/.test(part) ||
        /^\$[^$\n]+?\$$/.test(part) ||
        /^\\\([\s\S]*\\\)$/.test(part) ||
        /^\\\[[\s\S]*\\\]$/.test(part);

      if (isMath) {
        return part;
      }

      let escaped = escapeHtmlText(part);

      escaped = escaped
        .replace(
          /__MARK_START__([\s\S]*?)__MARK_END__/g,
          "<strong>$1</strong>"
        );

      return escaped;
    })
    .join("");
};

// =======================================================================================
// MATH RENDERER
// =======================================================================================

type MathRendererProps = {
  content?: string;
  fontSize?: number;
  textColor?: string;
  onHeightChange?: (height: number) => void;
  backgroundColor?: string
};

const MathRenderer = ({
  content = "",
  fontSize = 17,
  textColor,
  onHeightChange,
  backgroundColor='transparent',
}: MathRendererProps) => {
  const colorScheme = useColorScheme();

  const [height, setHeight] = useState(0);

  const finalTextColor =
    textColor ||
    (colorScheme === "dark"
      ? "#FFFFFF"
      : "#222222");

  const html = useMemo(() => {
    const preparedContent = prepareContentForMathJax(content);

    return `
<!DOCTYPE html>

<html>

<head>

<meta
  name="viewport"
  content="width=device-width,
  initial-scale=1.0,
  maximum-scale=1.0,
  user-scalable=no"
/>

<script>

window.MathJax = {

  tex: {

    inlineMath: [
      ['$', '$'],
      ['\\\\(', '\\\\)']
    ],

    displayMath: [
      ['$$', '$$'],
      ['\\\\[', '\\\\]']
    ],

    processEscapes: true,

    processEnvironments: true,

    packages: {
      '[+]': [
        'ams',
        'newcommand',
        'configmacros'
      ]
    }

  },

  svg: {
    fontCache: 'global'
  }

};

</script>

<script
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js">
</script>

<style>

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {

  width: 100%;

background-color: ${backgroundColor};
  font-family:
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Arial,
    sans-serif;

  font-size: ${fontSize}px;
//  text-align:center;
  line-height: 1.55;
  overflow-x: hidden;

  overflow-y: hidden;

  word-wrap: break-word;

  overflow-wrap: break-word;
}

#content {
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
// text-align: center;
}

strong {

  font-weight: 700;

}

/*
 * Inline equations
 */

mjx-container[jax="SVG"] {

  vertical-align: middle;

  max-width: 100% !important;

}

/*
 * Large/display equations
 *
 * If the equation is wider than the screen,
 * it will scroll horizontally.
 */

mjx-container[display="true"] {

  margin: 12px 0 !important;

  max-width: 100% !important;

  overflow-x: auto !important;

  overflow-y: hidden !important;

  padding: 4px 0;

  -webkit-overflow-scrolling: touch;

}

/*
 * Prevent horizontal page overflow
 */

mjx-container {

  max-width: 100% !important;

}

::-webkit-scrollbar {

  width: 0;
  height: 0;

}

</style>

</head>

<body>

<div id="content">
  ${preparedContent}
</div>

<script>

function sendHeight() {
  const content = document.getElementById("content");

  const height = content
    ? content.getBoundingClientRect().height
    : document.body.scrollHeight;

  window.ReactNativeWebView.postMessage(
    JSON.stringify({
      type: "height",
      height: Math.ceil(height),
    })
  );
}

function renderMath() {

  if (
    typeof MathJax === "undefined" ||
    !MathJax.typesetPromise
  ) {

    setTimeout(renderMath, 100);

    return;

  }

  MathJax.typesetPromise()
    .then(() => {

      setTimeout(() => {

        sendHeight();

      }, 100);

    })
    .catch((error) => {

      window.ReactNativeWebView.postMessage(
        JSON.stringify({
          type: "error",
          error: String(error)
        })
      );

    });

}

window.addEventListener(
  "load",
  renderMath
);

setTimeout(
  renderMath,
  500
);

</script>

</body>

</html>
`;
  }, [
    content,
    fontSize,
    finalTextColor,
    backgroundColor
  ]);

  return (
    <View
      style={[
        styles.mathRendererContainer,
        {
          minHeight: height,
        },
      ]}
    >
      <WebView
        source={{
          html,
        }}
        originWhitelist={["*"]}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        backgroundColor="transparent"
        automaticallyAdjustContentInsets={false}
        style={{

          width: "100%",
          height: height || 1,
          opacity: height > 0 ? 1 : 0,
        }}
        pointerEvents="none"
        onMessage={(event) => {
          try {
            const data = JSON.parse(
              event.nativeEvent.data
            );

            if (data.type === "height") {
              const newHeight = Math.ceil(
                Number(data.height)
              );

              if (
                newHeight > 0 &&
                newHeight < 5000
              ) {
                setHeight(newHeight);

                onHeightChange?.(
                  newHeight
                );
              }
            }

            if (data.type === "error") {
              console.log(
                "MathJax error:",
                data.error
              );
            }
          } catch (error) {
            console.log(
              "MathRenderer message error:",
              error
            );
          }
        }}
        onError={(error) => {
          console.log(
            "Math WebView error:",
            error.nativeEvent
          );
        }}
      />
    </View>
  );
};



// =======================================================================================
// QUESTION COMPONENT
// =======================================================================================
const QuestionComponent = ({ question, selectedOption, onSelectOption }) => {
  if (!question) return null;
  const renderQuestion = (text = '') => {
    // No mark tag → render normally
    if (text.includes('<mark>')) {
      return <Text style={styles.questionText}>{text}</Text>;
    }

    const parts = text.split(/(<mark>.*?<\/mark>)/g);

    return (
      <>
        {/* <Text style={styles.questionText}>
      {parts.map((part, index) => {
        if (part.startsWith('<mark>')) {
          return (
            <Text key={index} style={styles.boldText}>
              {part.replace(/<\/?mark>/g, '')}
            </Text>
          );
        }

        return <Text key={index} style={styles.questionText}>{part}</Text>;
      })}
    </Text>
     */}
        <View style={styles.questionContent}>
          <MathRenderer
            content={
              question.question_text || ""
            }
            fontSize={17}
          />
        </View>
      </>
    );
  };

  return (
    <View style={styles.questionBox}>
      <Text style={styles.topicName}>Topic: {question.topic_name}</Text>
      {renderQuestion(question.question_text)}

      {question.options?.map((opt) => {
        const isSelected = selectedOption === opt.option_id;

        return (
          <TouchableOpacity
            key={opt.option_id}
            style={[styles.option, isSelected && styles.optionSelected]}
            onPress={() => onSelectOption(opt.option_id)}
            activeOpacity={0.7}
          >
            {/* <>
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
            </> */}
            {/* OPTION LETTER */}

            <View
              style={[
                styles.optionBadge,
                isSelected &&
                styles.optionBadgeSelected,
              ]}
            >
              <Text
                style={[
                  styles.optionBadgeText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {opt.option_letter}
              </Text>
            </View>

            {/* OPTION CONTENT */}

            <View
              style={[
                styles.optionContent,
                {
                  flex: 1,
                  alignItems: "center",
                  justifyContent: 'center',
                },
              ]}
            >
              <MathRenderer
                content={
                  opt.option_text || ""
                }
                fontSize={16}
                textColor={
                  isSelected
                    ? "#FFFFFF"
                    : "#222222"
                }
                backgroundColor={
                  isSelected
                    ? "#007bff" : 'transparent'

                }
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default function AssessmentScreen() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [assessmentInfo, setAssessmentInfo] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [unanswered, setUnanswered] = useState([]);

  const [timer, setTimer] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [assessmentResponse, setAssessmentResponse] = useState({
  });
  const { state } = useUser();
  const { userData } = state;
  const {
    selectedTopics,
    questionCount = 5,
    subjectId,
    activeAssesment
  } = useLocalSearchParams() ?? {};
  const parsedSelectedTopics: string[] = selectedTopics
    ? JSON.parse(selectedTopics as string)
    : [];
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timeSpent, setTimeSpent] = useState({});
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 900, // slower fade
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 900, // smooth slide up
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // =======================================================================================
  // BLOCK HARDWARE BACK
  // =======================================================================================
  useEffect(() => {
    if (!loading && !completed && questions?.length > 0) {
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
    }
  }, [loading, questions?.length > 0, completed]);

  // =======================================================================================
  // LOAD DATA
  // =======================================================================================
  const loadAssessment = async () => {
    setLoading(true);
    const payload = {
      class_subject_id: subjectId,
      question_count: questionCount,
      units: parsedSelectedTopics,
    };
    console.log("payloa d", payload);
    try {
      const response = await apiClient.post(URLS.GENERATE_ASSESSMENT, payload);
      if (!(response as any).error) {
        setTimer(response?.assessment?.time_limit_minutes * 60);
        setAssessmentInfo(response.assessment);
        setQuestions(response.questions);
        setLoading(false);
      }

      console.log(response);
    } catch (error) {
      // Alert.alert(
      //   "Cannot Generate Assessment",
      //   "There is an active assessment. Complete it to create new one.",
      //   [
      //     {
      //       text: "OK",
      //       style: "cancel",
      //       onPress: () => router.back()   // ➤ Go back when OK is pressed
      //     }
      //   ]
      // );
      console.log("Error calling API:", error);
    }
    setLoading(false);
  };

  const loadActiveAssesment = async () => {
    setLoading(true);
    const payload = {
      class_subject_id: subjectId,
      question_count: questionCount,
      units: parsedSelectedTopics,
    };
    console.log("payloa d", payload);
    try {
      const response = await apiClient.get(URLS.ACTIVE_ASSESMENT);
      if (!(response as any).error) {
        setTimer(response?.assessment?.time_limit_minutes * 60);
        setAssessmentInfo(response.assessment);
        setQuestions(response.questions);
        setLoading(false);
      }

      console.log(response);
    } catch (error) {
      // Alert.alert(
      //   "Cannot Generate Assessment",
      //   "There is an active assessment. Complete it to create new one.",
      //   [
      //     {
      //       text: "OK",
      //       style: "cancel",
      //       onPress: () => router.back()   // ➤ Go back when OK is pressed
      //     }
      //   ]
      // );
      console.log("Error calling API:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeAssesment) {
      loadActiveAssesment()
    }
    else {
      loadAssessment();
    }
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
      Alert.alert(
        "Time's Up!",
        "Your assessment has been submitted automatically."
      );
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
    recordTimeForCurrentQuestion();
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }, 250);
  };

  const recordTimeForCurrentQuestion = () => {
    const q = questions[currentIndex];
    const now = Date.now();
    const secondsSpent = Math.floor((now - questionStartTime) / 1000);

    setTimeSpent((prev) => ({
      ...prev,
      [q?.question_id]: (prev[q?.question_id] || 0) + secondsSpent,
    }));

    setQuestionStartTime(Date.now());
  };

  // =======================================================================================
  // NAVIGATION
  // =======================================================================================
  const goNext = () => {
    recordTimeForCurrentQuestion();
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
    const q = questions[currentIndex];

    if (!answers[q.question_id]) {
      setUnanswered((prev) =>
        prev.includes(currentIndex) ? prev : [...prev, currentIndex]
      );
    }
    recordTimeForCurrentQuestion();
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  // =======================================================================================
  // SUBMIT
  // =======================================================================================
  const handleSubmit = async () => {
    if (unanswered?.length > 0) {
      Alert.alert(
        "You have unanswered questions please complete it to Submit Assesment"
      );
      return;
    }
    recordTimeForCurrentQuestion();
    const payload = {
      answers: questions.map((q) => ({
        question_id: q?.question_id,
        selected_option_id: answers[q?.question_id],
        time_taken_seconds: timeSpent[q?.question_id] || 0,
      })),
    };
    try {
      const response = await apiClient.post(URLS.SUBMIT_ASSESMENT, payload);
      if (!(response as any).error) {
        setAssessmentResponse(response);
        setCompleted(true);
      }
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log("Error calling API:", error);
    }
    console.log("FINAL PAYLOAD:", payload);

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

  if (completed) {
    const percentage = assessmentResponse?.assessment?.percentage || 0;

    // Dynamic color based on score
    const scoreColor =
      percentage >= 80 ? "#2ecc71" : percentage >= 50 ? "#f1c40f" : "#e74c3c";

    return (
      <View style={styles.centered}>
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ translateY }],
            },
          ]}
        >
          <Text style={styles.completeTitle}>🎉 Assessment Completed</Text>
          <Text style={styles.completeSubtitle}>
            You scored{"  "}
            <Text style={{ color: scoreColor, fontWeight: "700" }}>
              {assessmentResponse?.assessment?.score}
            </Text>{" "}
            out of {assessmentResponse?.assessment?.total_marks}
          </Text>

          <Text style={[styles.percentageTitle, { color: scoreColor }]}>
            Your Assessment Percentage: {percentage}%
          </Text>

          <TouchableOpacity
            style={styles.restartBtn}
            onPress={() => {
              // navigation logic for "Go To Results"
              router.push({
                pathname: "/screens/AssesmentResult",
                params: { assessmentSessionId: assessmentResponse?.assessment?.session_id },
              });
            }}
          >
            <Text style={styles.restartText}>View Detailed Results</Text>
          </TouchableOpacity>
        </Animated.View>
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
            <Text
              style={[
                styles.headerValue,
                { color: timer < 60 ? "red" : "#007bff" },
              ]}
            >
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
        {unanswered?.length > 0 && (
          <View style={styles.questionNavigator}>
            <Text style={styles.unansweredTitle}>Unanswered Questions</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {unanswered?.map((idx) => (
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
            <TouchableOpacity
              style={[styles.submitFinalBtn, { backgroundColor: unanswered?.length !== 0 ? "#a4f3b6" : "#28a745", }]}
              disabled={unanswered?.length !== 0}
              onPress={handleSubmit}
            >
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

  questionText: { fontSize: 17, fontWeight: "400", marginBottom: 16 },

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

  // optionBadge: {
  //   width: 26,
  //   height: 26,
  //   backgroundColor: "#007bff",
  //   borderRadius: 13,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginRight: 12,
  // },

  optionText: { fontSize: 15, flex: 1 },
  optionTextSelected: { color: "#0c0101" },

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
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 16,
    width: "90%",
    elevation: 6, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    alignItems: "center",
  },

  completeTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#222",
    marginBottom: 10,
    textAlign: "center",
  },

  completeSubtitle: {
    fontSize: 18,
    color: "#555",
    marginBottom: 8,
    textAlign: "center",
  },

  percentageTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 12,
    textAlign: "center",
  },

  restartBtn: {
    backgroundColor: "#007bff",
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 15,
    width: "90%",
    alignItems: "center",
  },

  restartText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
  boldText: {
    fontWeight: '700', // or 'bold'
  },
  // =====================================================================================
  // QUESTION
  // =====================================================================================


  topicName: {
    color: "#007bff",
    fontWeight: "700",
    marginBottom: 8,
    fontSize: 14,
  },

  questionContent: {
    width: "100%",
    marginBottom: 14,
  },

  mathRendererContainer: {
    width: "100%",
    backgroundColor: "transparent",
    // justifyContent:"center",
    // alignItems:"center"
  },

  // =====================================================================================
  // OPTIONS
  // =====================================================================================


  optionBadge: {
    width: 30,
    height: 30,

    backgroundColor: "#007bff",

    borderRadius: 15,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,

    flexShrink: 0,
  },

  optionBadgeSelected: {
    backgroundColor: "#ffffff",
  },

  optionBadgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  optionContent: {
    flex: 1,
    minWidth: 0,
  },

});
