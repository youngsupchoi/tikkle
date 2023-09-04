//OTPVerification.js
import bcrypt from 'react-native-bcrypt';
import axios from 'axios';
import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function verifyOTP(encryptOTP, inputOTP) {
  return new Promise((resolve, reject) => {
    // Check if either argument is undefined
    if (encryptOTP === undefined || inputOTP === undefined) {
      console.warn('One or both of the OTP values is undefined!');
      return Promise.reject(new Error('Invalid OTP values provided'));
    }
    bcrypt.compare(inputOTP, encryptOTP, function (err, isMatch) {
      if (err) {
        console.error('Error comparing passwords:', err);
        reject(err);
      } else {
        isMatch ? resolve(true) : resolve(false);
      }
    });
  });
}
