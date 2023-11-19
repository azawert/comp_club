export const formatPhoneNumberForValidation = (phoneNumber: string) => {
  return phoneNumber.slice(1, phoneNumber.length);
};

export const formatPhoneNumberForFilter = (phoneNumber: string) => {
  return phoneNumber.replace(/[-_]/g, '');
};
