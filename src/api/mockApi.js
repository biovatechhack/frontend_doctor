import * as mockData from '../data/mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getDashboardStats = async () => {
  await delay(1500); // Simulate network lag
  return mockData.dashStats;
};

export const getHighRiskPatients = async () => {
  await delay(1000);
  return mockData.highRiskPatients;
};

export const getEmergencyLogs = async () => {
  await delay(1200);
  return mockData.emergencyLogs;
};

export const getResourceAllocation = async () => {
  await delay(800);
  return mockData.resourceAllocation;
};

export const getPatients = async () => {
  await delay(2000);
  return mockData.patientsList;
};

export const getAppointments = async () => {
  await delay(1500);
  return mockData.appointments;
};
