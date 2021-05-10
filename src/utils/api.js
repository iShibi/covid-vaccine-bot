import fetch from 'node-fetch';
import { API } from './Constants.js';

const { baseURL, version, userAgent } = API;

export async function fetchSingleDateAppointementByPin(pincode, date) {
  const url = `${baseURL}/v${version}/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': userAgent,
    },
  });
  const data = await res.json();
  return data;
}

export async function fetchMultipleDateAppointementByPin(pincode, startDate) {
  const url = `${baseURL}/v${version}/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${startDate}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'User-Agent': userAgent,
    },
  });
  const data = res.json();
  return data;
}
