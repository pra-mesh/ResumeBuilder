const generatePassword = (length = 12) => {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const specialChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return password;
};

const cleanText = (text) => {
  return text
    .replace(/\*\*|\n/g, "") // Remove markdown formatting and new lines
    .replace(/\(Note:.*?\)/g, "") // Remove unnecessary notes
    .trim(); 
};

module.exports = { generatePassword, cleanText };
