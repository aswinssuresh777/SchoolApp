import { URLS } from '@/constants/urls';
import { apiClient } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../assets/colors';
import { Strings } from '../../assets/strings';
import { useUser } from '../../context/UserContext';
import { backgroundImage } from './login';


interface FormData {
  first_name: string;
  last_name: string;
  student_code: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: Date;
  gender: string;
  board_name: string;
  board_id: string;
  class: string;
  class_id:string;
}

export default function RegisterScreen() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [allBoardsData, setAllBoardsData] = useState([]);
  const [allClassesData, setAllClassesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Keyboard event listeners
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      setIsKeyboardVisible(true);
    });
    
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);

  // Ensure keyboard aware scroll on mount
  React.useEffect(() => {
    callApi();
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#f5f6fa');
      StatusBar.setBarStyle('dark-content');
    }
  }, []);


  const callApi = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(URLS.GET_BOARDS);
      if(!(response as any).error){
        const activeBoards = (response as any).boards.filter(
          (board: any) => board.is_active
        );
        setAllBoardsData(activeBoards);
      }
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };

const getClassesData = async (board_id:any)=>{
  try{
    const response = await apiClient.get(URLS.GET_CLASSES(board_id)); // 👈 pass boardId here
    console.log('Classes:', response,URLS.GET_CLASSES(board_id));
    if(!(response as any).error){
      const activeClasses = (response as any).classes.filter(
        (cls: any) => cls.is_active
      );

      setAllClassesData(activeClasses);
    }
    console.log(response);
  }catch(error){

  }
}


  const router = useRouter();
  const { setUserData, setLoading } = useUser();
  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    student_code: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: new Date(2000, 0, 1),
    gender: '',
    board: '',
    class: '',
    class_id:'',
    board_id:'',
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDatePlaceholder, setShowDatePlaceholder] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showBoardDropdown, setShowBoardDropdown] = useState(false);
  const [showClassDropdown, setShowClassDropdown] = useState(false);
  const confirmPasswordRef = React.useRef<TextInput>(null);

  // Dropdown options
  const boardOptions = Strings.REGISTER.BOARD_OPTIONS;
  const classOptions = Strings.REGISTER.CLASS_OPTIONS;
  const genderOptions = ['Male', 'Female', 'Other'];

  // Function to close all dropdowns
  const closeAllDropdowns = () => {
    setShowBoardDropdown(false);
    setShowClassDropdown(false);
  };
  
  // Effect to validate form on any input change
  React.useEffect(() => {
    const newErrors: Record<string, string> = {};
    
    if (formData.first_name) {
      const firstNameError = validateFirstName(formData.first_name);
      if (firstNameError) newErrors.first_name = firstNameError;
    }
    
    if (formData.last_name) {
      const lastNameError = validateLastName(formData.last_name);
      if (lastNameError) newErrors.last_name = lastNameError;
    }
    
    if (formData.student_code) {
      const studentCodeError = validateStudentCode(formData.student_code);
      if (studentCodeError) newErrors.student_code = studentCodeError;
    }
    
    if (formData.email) {
      const emailError = validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;
    }
    
    if (formData.password) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) newErrors.password = passwordError;
    }
    
    if (formData.confirmPassword) {
      const confirmPasswordError = validateConfirmPassword(formData.confirmPassword);
      if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    }
    
    if (formData.gender) {
      const genderError = validateGender(formData.gender);
      if (genderError) newErrors.gender = genderError;
    }
    
    setErrors(newErrors);
  }, [formData]);

  // Force re-render when progress changes
  const [progressKey, setProgressKey] = React.useState(0);
  React.useEffect(() => {
    setProgressKey(prev => prev + 1);
  }, [formData, showDatePlaceholder]);

  const validateFirstName = (firstName: string) => {
    if (!firstName) {
      return 'First name is required';
    }
    if (firstName.length < 2) {
      return 'First name must be at least 2 characters long';
    }
    if (firstName.length > 50) {
      return 'First name must be less than 50 characters';
    }
    if (!/^[a-zA-Z\s]+$/.test(firstName)) {
      return 'First name can only contain alphabets and spaces';
    }
    return '';
  };

  const validateLastName = (lastName: string) => {
    if (!lastName) {
      return 'Last name is required';
    }
    // if (lastName.length < 2) {
    //   return 'Last name must be at least 2 characters long';
    // }
    if (lastName.length > 50) {
      return 'Last name must be less than 50 characters';
    }
    if (!/^[a-zA-Z\s]+$/.test(lastName)) {
      return 'Last name can only contain alphabets and spaces';
    }
    return '';
  };

  const validateStudentCode = (studentCode: string) => {
    if (!studentCode) {
      return 'Student code is required';
    }
    if (studentCode.length < 3) {
      return 'Student code must be at least 3 characters long';
    }
    if (studentCode.length > 20) {
      return 'Student code must be less than 20 characters';
    }
    if (!/^[a-zA-Z0-9]+$/.test(studentCode)) {
      return 'Student code can only contain letters and numbers';
    }
    return '';
  };

  const validateGender = (gender: string) => {
    if (!gender) {
      return 'Gender is required';
    }
    return '';
  };

  const validateEmail = (email: string) => {
    if (!email) {
      return Strings.VALIDATION.EMAIL_REQUIRED;
    }
    if (email.length > 255) {
      return Strings.VALIDATION.EMAIL_TOO_LONG;
    }
    if (!email.includes('@')) {
      return Strings.VALIDATION.EMAIL_MUST_CONTAIN_AT;
    }
    const [localPart, domain] = email.split('@');
    if (!localPart || !domain) {
      return Strings.VALIDATION.EMAIL_INVALID_FORMAT;
    }
    if (localPart.length > 64) {
      return Strings.VALIDATION.EMAIL_LOCAL_PART_TOO_LONG;
    }
    if (/^[.-]|[.-]$/.test(localPart)) {
      return Strings.VALIDATION.EMAIL_INVALID_START_END;
    }
    if (!/^[a-zA-Z0-9.-]+$/.test(domain)) {
      return Strings.VALIDATION.EMAIL_INVALID_DOMAIN_CHARS;
    }
    if (!domain.includes('.')) {
      return Strings.VALIDATION.EMAIL_INVALID_DOMAIN_FORMAT;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return Strings.VALIDATION.EMAIL_VALID_FORMAT;
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password) {
      return Strings.VALIDATION.PASSWORD_REQUIRED;
    }
    if (password.length < 8) {
      return Strings.VALIDATION.PASSWORD_MIN_LENGTH;
    }
    if (password.length > 20) {
      return Strings.VALIDATION.PASSWORD_MAX_LENGTH;
    }
    if (!/[A-Z]/.test(password)) {
      return Strings.VALIDATION.PASSWORD_UPPERCASE;
    }
    if (!/[a-z]/.test(password)) {
      return Strings.VALIDATION.PASSWORD_LOWERCASE;
    }
    if (!/[0-9]/.test(password)) {
      return Strings.VALIDATION.PASSWORD_NUMBER;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return Strings.VALIDATION.PASSWORD_SPECIAL;
    }
    if (/\s/.test(password)) {
      return Strings.VALIDATION.PASSWORD_NO_SPACES;
    }
    return '';
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword !== formData.password) {
      return Strings.VALIDATION.PASSWORDS_NOT_MATCH;
    }
    return '';
  };

  const validateBoard = (board: string) => {
    if (!board) {
      return Strings.VALIDATION.BOARD_REQUIRED;
    }
    return '';
  };

  const validateClass = (classValue: string) => {
    if (!classValue) {
      return Strings.VALIDATION.CLASS_REQUIRED;
    }
    return '';
  };

  // Calculate progress
  const calculateProgress = () => {
    let completedFields = 0;
    const totalFields = 10; // Include confirm password separately
    
    // Check each field individually for completion and validity
    const firstNameValid = formData.first_name && !validateFirstName(formData.first_name);
    const lastNameValid = formData.last_name && !validateLastName(formData.last_name);
    const studentCodeValid = formData.student_code && !validateStudentCode(formData.student_code);
    const emailValid = formData.email && !validateEmail(formData.email);
    const passwordValid = formData.password && !validatePassword(formData.password);
    const confirmPasswordValid = formData.confirmPassword && !validateConfirmPassword(formData.confirmPassword);
    const dobValid = !showDatePlaceholder;
    const genderValid = formData.gender && !validateGender(formData.gender);
    const boardValid = formData.board_id && !validateBoard(formData.board_id);
    const classValid = formData.class_id && !validateClass(formData.class_id);
    
    // Count valid fields
    if (firstNameValid) completedFields++;
    if (lastNameValid) completedFields++;
    if (studentCodeValid) completedFields++;
    if (emailValid) completedFields++;
    if (passwordValid) completedFields++;
    if (confirmPasswordValid) completedFields++;
    if (dobValid) completedFields++;
    if (genderValid) completedFields++;
    if (boardValid) completedFields++;
    if (classValid) completedFields++;

    const progress = completedFields / totalFields;
    

    return progress;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    console.log('form_data',formData)
    // Check all fields are filled
    if (!formData.first_name) newErrors.first_name = 'First name is required';
    if (!formData.last_name) newErrors.last_name = 'Last name is required';
    if (!formData.student_code) newErrors.student_code = 'Student code is required';
    if (!formData.email) newErrors.email = Strings.VALIDATION.EMAIL_REQUIRED;
    if (!formData.password) newErrors.password = Strings.VALIDATION.PASSWORD_REQUIRED;
    if (!formData.confirmPassword) newErrors.confirmPassword = Strings.VALIDATION.CONFIRM_PASSWORD_REQUIRED;
    if (showDatePlaceholder) newErrors.dob = Strings.VALIDATION.DOB_REQUIRED;
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.board_id) newErrors.board = Strings.VALIDATION.BOARD_REQUIRED;
    if (!formData.class_id) newErrors.class = Strings.VALIDATION.CLASS_REQUIRED;
    
    // If all fields are filled, validate their content
    if (formData.first_name) {
      const firstNameError = validateFirstName(formData.first_name);
      if (firstNameError) newErrors.first_name = firstNameError;
    }

    if (formData.last_name) {
      const lastNameError = validateLastName(formData.last_name);
      if (lastNameError) newErrors.last_name = lastNameError;
    }

    if (formData.student_code) {
      const studentCodeError = validateStudentCode(formData.student_code);
      if (studentCodeError) newErrors.student_code = studentCodeError;
    }

    if (formData.email) {
      const emailError = validateEmail(formData.email);
      if (emailError) newErrors.email = emailError;
    }

    if (formData.password) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) newErrors.password = passwordError;
    }

    if (formData.confirmPassword) {
      const confirmPasswordError = validateConfirmPassword(formData.confirmPassword);
      if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    }

    if (formData.gender) {
      const genderError = validateGender(formData.gender);
      if (genderError) newErrors.gender = genderError;
    }

    if (formData.board_id) {
      const boardError = validateBoard(formData.board_id);
      if (boardError) newErrors.board = boardError;
    }

    if (formData.class_id) {
      const classError = validateClass(formData.class_id);
      if (classError) newErrors.class = classError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    try {
      // Validate form before submitting
      if (!validateForm()) {
        return;
      }
  
      setLoading(true);
  
      const userData = {
        first_name: formData?.first_name,
        last_name: formData?.last_name,
        email: formData?.email,
        password: formData?.password,
        student_code: formData?.student_code,
        date_of_birth: formData?.dob,
        gender: formData?.gender,
        class_id: formData?.class_id,
        board_id: formData?.board_id,
      };
  console.log('userData',userData)
      // Call the registration API
      const response = await apiClient.post(URLS.REGISTER, userData);
  console.log(response)
      // Check if API call was successful
      if (!(response as any)?.error) {
        setUserData(userData); // Save user data if needed
        setShowSuccessModal(true); // Show success modal
        await AsyncStorage.setItem('userToken',response?.token);
        await AsyncStorage.setItem('userData',JSON.stringify(response?.student));
        // Navigate to home after 2 seconds
        setTimeout(() => {
          setShowSuccessModal(false);
          setLoading(false);
          router.replace('/(home)');
        }, 2000);
      } else {
        setUserData(userData); // Save user data if needed
        setShowSuccessModal(true); // Show success modal
        await AsyncStorage.setItem('userToken',response?.token);
        await AsyncStorage.setItem('userData',JSON.stringify(response?.student));
        // Handle API failure
        setLoading(false);
        console.error('Registration failed:', (response as any)?.message || 'Unknown error');
        // Optionally show error to user
      }
  
    } catch (error) {
      console.error('Registration API error:', error);
      setLoading(false);
      // Optionally show error modal/message
    }
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#f5f6fa" /> */}
      {/* Progress header */}
      {isLoading?
       <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="#2e86de" />
      </View>:
      <>
      <View style={[
        styles.progressHeader,
        calculateProgress() === 1 && styles.progressHeaderComplete
      ]} key={progressKey}>
        <Text style={styles.progressHeaderText}>
          {Strings.REGISTER.PROGRESS_HEADER} {Math.round(calculateProgress() * 100)}% 
          {calculateProgress() === 1 && Strings.REGISTER.PROGRESS_COMPLETE}
        </Text>
      </View>
      <ImageBackground 
        source={backgroundImage} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        enabled
      >
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
          closeAllDropdowns();
        }}>
          <ScrollView 
            contentContainerStyle={[
              styles.scrollView,
              // isKeyboardVisible && { paddingBottom: keyboardHeight + 50 }
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            bounces={false}
            automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
            keyboardDismissMode="interactive"
            nestedScrollEnabled={true}
            scrollEventThrottle={16}
            style={{ flex: 1 }}
          >
          <View style={styles.progressContainer} key={progressKey}>
            {/* <CustomProgressBar
              progress={calculateProgress()}
              width={Dimensions.get('window').width - 40}
              color={Colors.PRIMARY}
              backgroundColor={Colors.PROGRESS_BACKGROUND}
            /> */}
          </View>
          <View style={styles.content}>
          <Text style={styles.title}>{Strings.REGISTER.TITLE}</Text>

          {/* First Name Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.first_name && styles.inputError]}
              placeholder="First Name"
               placeholderTextColor="grey"
              value={formData.first_name}
              onChangeText={(text) => {
                setFormData({ ...formData, first_name: text });
                const firstNameError = validateFirstName(text);
                setErrors(prev => {
                  const newErrors = { ...prev };
                  if (firstNameError) {
                    newErrors.first_name = firstNameError;
                  } else {
                    delete newErrors.first_name;
                  }
                  return newErrors;
                });
              }}
            />
            {errors.first_name && <Text style={styles.errorText}>{errors.first_name}</Text>}
          </View>

          {/* Last Name Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.last_name && styles.inputError]}
              placeholder="Last Name"
              placeholderTextColor="grey"
              value={formData.last_name}
              onChangeText={(text) => {
                setFormData({ ...formData, last_name: text });
                const lastNameError = validateLastName(text);
                setErrors(prev => {
                  const newErrors = { ...prev };
                  if (lastNameError) {
                    newErrors.last_name = lastNameError;
                  } else {
                    delete newErrors.last_name;
                  }
                  return newErrors;
                });
              }}
            />
            {errors.last_name && <Text style={styles.errorText}>{errors.last_name}</Text>}
          </View>

          {/* Student Code Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.student_code && styles.inputError]}
              placeholder="Student Code"
              placeholderTextColor="grey"
              value={formData.student_code}
              onChangeText={(text) => {
                setFormData({ ...formData, student_code: text });
                const studentCodeError = validateStudentCode(text);
                setErrors(prev => {
                  const newErrors = { ...prev };
                  if (studentCodeError) {
                    newErrors.student_code = studentCodeError;
                  } else {
                    delete newErrors.student_code;
                  }
                  return newErrors;
                });
              }}
            />
            {errors.student_code && <Text style={styles.errorText}>{errors.student_code}</Text>}
          </View>

          {/* Date of Birth */}
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={[styles.input]}
              onPress={() => setShowDatePicker(true)}
            >
              <View style={styles.dateInput}>
                <Text style={showDatePlaceholder ? styles.placeholderText : styles.inputText}>
                  {showDatePlaceholder ? Strings.REGISTER.DATE_PLACEHOLDER : formData.dob.toLocaleDateString()}
                </Text>
                <Ionicons name="calendar-outline" size={24} color={Colors.ICON_PRIMARY} style={styles.calendarIcon} />
              </View>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={formData.dob}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={(event: any, selectedDate?: Date) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setShowDatePlaceholder(false);
                  setFormData({ ...formData, dob: selectedDate });
                }
              }}
            />
          )}

          {/* Gender Selection */}
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Gender</Text>
            <View style={styles.radioContainer}>
              {genderOptions?.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.radioOption}
                  onPress={() => {
                    setFormData({ ...formData, gender: option });
                    if (errors.gender) {
                      setErrors(prev => ({ ...prev, gender: '' }));
                    }
                  }}
                >
                  <View style={styles.radioCircle}>
                    {formData.gender === option && <View style={styles.radioSelected} />}
                  </View>
                  <Text style={styles.radioText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
          </View>

          {/* Board Dropdown */}
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={[styles.input, errors.board && styles.inputError]}
              onPress={() => {
                Keyboard.dismiss();
                if (showClassDropdown) {
                  setShowClassDropdown(false);
                  // Small delay to ensure smooth transition
                  setTimeout(() => {
                    setShowBoardDropdown(!showBoardDropdown);
                  }, 100);
                } else {
                  setShowBoardDropdown(!showBoardDropdown);
                }
              }}
            >
              <View style={styles.dropdownInput}>
                <Text style={formData.board_name ? styles.inputText : styles.placeholderText}>
                  {formData.board_name || Strings.REGISTER.BOARD_PLACEHOLDER}
                </Text>
                <Ionicons 
                  name={showBoardDropdown ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color={Colors.ICON_PRIMARY} 
                />
              </View>
            </TouchableOpacity>
            {showBoardDropdown && (
  <View style={styles.dropdown}>
    <ScrollView
      style={styles.dropdownScroll}
      showsVerticalScrollIndicator={true}
      bounces={false}
      nestedScrollEnabled={true}
    >
      {allBoardsData.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dropdownItem,
            index === allBoardsData.length - 1 && styles.dropdownItemLast
          ]}
          onPress={() => {
            setFormData({
              ...formData,
              board_id: option.board_id,    
              board_name: option.board_name, 
            }); 
            getClassesData(option.board_id);
            closeAllDropdowns();
            if (errors.board) {
              setErrors(prev => ({ ...prev, board: '' }));
            }
          }}
        >
          <Text style={styles.dropdownItemText}>{option.board_name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
)}

            {errors.board && <Text style={styles.errorText}>{errors.board}</Text>}
          </View>

          {/* Class Dropdown */}
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={[styles.input, errors.class && styles.inputError]}
              onPress={() => {
                Keyboard.dismiss();
                if (showBoardDropdown) {
                  setShowBoardDropdown(false);
                  // Small delay to ensure smooth transition
                  setTimeout(() => {
                    setShowClassDropdown(!showClassDropdown);
                  }, 100);
                } else {
                  setShowClassDropdown(!showClassDropdown);
                }
              }}
            >
              <View style={styles.dropdownInput}>
                <Text style={formData?.class_name ? styles.inputText : styles.placeholderText}>
                  {formData?.class_name || Strings.REGISTER.CLASS_PLACEHOLDER}
                </Text>
                <Ionicons 
                  name={showClassDropdown ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color={Colors.ICON_PRIMARY} 
                />
              </View>
            </TouchableOpacity>
            {showClassDropdown && (
  <View style={styles.dropdown}>
    <ScrollView
      style={styles.dropdownScroll}
      showsVerticalScrollIndicator={true}
      bounces={false}
      nestedScrollEnabled={true}
    >
      {allClassesData?.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dropdownItem,
            index === allClassesData?.length - 1 && styles.dropdownItemLast
          ]}
          onPress={() => {
            setFormData({
              ...formData,
              class_id: option.class_id,     
              class_name: option.class_name, 
            });
            closeAllDropdowns();
            if (errors.class) {
              setErrors(prev => ({ ...prev, class: '' }));
            }
          }}
        >
          <Text style={styles.dropdownItemText}>{option.class_name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
)}

            {errors.class && <Text style={styles.errorText}>{errors.class}</Text>}
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder={Strings.REGISTER.EMAIL_PLACEHOLDER}
              placeholderTextColor="grey"
              value={formData.email}
              onChangeText={(text) => {
                setFormData({ ...formData, email: text });
                const emailError = validateEmail(text);
                setErrors(prev => emailError ? { ...prev, email: emailError } : { ...prev, email: '' });
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder={Strings.REGISTER.PASSWORD_PLACEHOLDER}
              placeholderTextColor="grey"
              value={formData.password}
              onChangeText={(text) => {
                setFormData({ ...formData, password: text });
                if (errors.password) {
                  const newErrors = { ...errors };
                  delete newErrors.password;
                  setErrors(newErrors);
                }
              }}
              secureTextEntry={!showPassword}
              returnKeyType="next"
              onSubmitEditing={() => {
                confirmPasswordRef.current?.focus();
              }}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color={Colors.ICON_PRIMARY}
              />
            </TouchableOpacity>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              ref={confirmPasswordRef}
              style={[styles.input, errors.confirmPassword && styles.inputError]}
              placeholder={Strings.REGISTER.CONFIRM_PASSWORD_PLACEHOLDER}
              placeholderTextColor="grey"
              value={formData.confirmPassword}
              onChangeText={(text) => {
                setFormData({ ...formData, confirmPassword: text });
                if (errors.confirmPassword) {
                  const newErrors = { ...errors };
                  delete newErrors.confirmPassword;
                  setErrors(newErrors);
                }
              }}
              secureTextEntry={!showConfirmPassword}
              returnKeyType="done"
              onSubmitEditing={() => {
                Keyboard.dismiss();
              }}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? 'eye-off' : 'eye'}
                size={24}
                color={Colors.ICON_PRIMARY}
              />
            </TouchableOpacity>
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              // calculateProgress() < 1 && styles.buttonDisabled,
            ]}
            onPress={handleRegister}
            // disabled={calculateProgress() < 1}
            key={progressKey}
          >
            <Text style={[
              styles.buttonText,
              // calculateProgress() < 1 && styles.buttonTextDisabled
            ]}>
              {Strings.REGISTER.REGISTER_BUTTON}
            </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
        </TouchableWithoutFeedback>

      {/* Success Modal */}
      <Modal
        transparent
        visible={showSuccessModal}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark-circle" size={60} color={Colors.SUCCESS} />
            </View>
            <Text style={styles.successText}>{Strings.REGISTER.SUCCESS_TITLE}</Text>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
    </ImageBackground>
    </>
}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  backgroundImage: {
    flex: 1,
 
  },
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_OVERLAY,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 80, // more space so button stays visible
    // minHeight: Dimensions.get('window').height - 100,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.TEXT_PRIMARY,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 12,
    position: 'relative',
  },
  input: {
    height: 50,
    borderColor: Colors.BORDER,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: Colors.INPUT_BACKGROUND,
    fontSize: 16,
    color: Colors.TEXT_PRIMARY,
    marginBottom: 4,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  inputError: {
    borderColor: Colors.BORDER_ERROR,
    borderWidth: 1,
  },
  inputText: {
    fontSize: 16,
    color: Colors.TEXT_PRIMARY,
    flex: 1,
  },
  placeholderText: {
    fontSize: 16,
    color: 'grey',
    flex: 1,
  },
  errorText: {
    color: Colors.ERROR_DARK,
    fontSize: 12,
    marginLeft: 4,
    marginBottom: 8,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 13,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  calendarIcon: {
    position: 'absolute',
    right: 0,
    top: 13,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.BUTTON_PRIMARY,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 20, // Add bottom margin to ensure button is always visible
  },
  buttonDisabled: {
    backgroundColor: Colors.BUTTON_DISABLED,
  },
  buttonText: {
    color: Colors.TEXT_WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: Colors.TEXT_LIGHT,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.MODAL_OVERLAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.MODAL_BACKGROUND,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    elevation: 5,
    shadowColor: Colors.SHADOW_LIGHT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  successIcon: {
    marginBottom: 16,
  },
  successText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.TEXT_PRIMARY,
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: Colors.DROPDOWN_BACKGROUND,
    borderColor: Colors.DROPDOWN_BORDER,
    borderWidth: 1,
    borderRadius: 8,
    zIndex: 1000,
    elevation: 8,
    shadowColor: Colors.SHADOW_LIGHT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    maxHeight: 160,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.DROPDOWN_ITEM_BORDER,
    backgroundColor: Colors.DROPDOWN_BACKGROUND,
    minHeight: 44,
    justifyContent: 'center',
  },
  dropdownItemText: {
    fontSize: 15,
    color: Colors.TEXT_PRIMARY,
    fontWeight: '500',
  },
  dropdownScroll: {
    flex: 1,
  },
  dropdownItemLast: {
    borderBottomWidth: 0,
  },
  progressHeader: {
    backgroundColor: Colors.PRIMARY,
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER_LIGHT,
  },
  progressHeaderComplete: {
    backgroundColor: Colors.PROGRESS_COMPLETE,
  },
  progressHeaderText: {
    color: Colors.TEXT_WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 16,
    color: Colors.TEXT_PRIMARY,
    marginBottom: 8,
    fontWeight: '500',
  },
  radioContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    minWidth: '30%',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.BORDER,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
  },
  radioText: {
    fontSize: 16,
    color: Colors.TEXT_PRIMARY,
  },
});