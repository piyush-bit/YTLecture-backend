function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const extractUsername = (email)=> {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    const atIndex = email.indexOf("@");
    return email.slice(0, atIndex);
  }

  return null; // Return null for invalid email addresses
}

export default validateEmail;
