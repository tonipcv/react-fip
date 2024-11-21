import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  RegisterSuccess: undefined;
  HomeScreen: undefined;
  ForgotPassword: undefined;
  Courses: undefined;
  Reports: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>; 