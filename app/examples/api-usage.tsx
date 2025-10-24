// // In your component
// const MyComponent = () => {
//     const handleLogin = async () => {
//         try {
//             const response = await apiClient.post<{ token: string }>(URLS.LOGIN, {
//                 email: 'user@example.com',
//                 password: 'password123'
//             });
            
//             // Handle successful login
//             await AsyncStorage.setItem('userToken', response.token);
//             router.replace('/(home)');
//         } catch (error) {
//             // Handle error
//             console.error('Login failed:', error);
//         }
//     };

//     return (
//         // Your component JSX
//     );
// };