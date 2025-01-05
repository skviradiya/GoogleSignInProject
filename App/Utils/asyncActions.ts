import asyncAccess from '@App/Constant/asyncAccess';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SignInSuccessResponse} from '@react-native-google-signin/google-signin';

export async function saveUserInfo(params: SignInSuccessResponse) {
  return await AsyncStorage.setItem(
    asyncAccess.loginInfo,
    JSON.stringify(params),
  );
}
export async function readUserInfo(): Promise<SignInSuccessResponse | null> {
  try {
    const data = await AsyncStorage.getItem(asyncAccess.loginInfo);
    return data ? (JSON.parse(data) as SignInSuccessResponse) : null;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
