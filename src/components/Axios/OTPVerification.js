//OTPVerification.js
import axios from 'axios';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function verifyOTP(encryptOTP, inputOTP) {
  return new Promise((resolve, reject) => {
    // Check if either argument is undefined
    if (encryptOTP === undefined || inputOTP === undefined) {
      console.warn('One or both of the OTP values is undefined!');
      return reject(new Error('Invalid OTP values provided'));
    }

    // Direct comparison using ==
    if (encryptOTP == inputOTP) {
      resolve(true);
    } else {
      resolve(false);
    }
  });
}
