export const GEMINI_MODEL = 'gemini-2.0-flash';
export const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

export const GROQ_MODEL = 'llama-3.3-70b-versatile';
export const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const getSymptomAnalysisPrompt = (symptoms) => {
  return `You are a medical assistant. Analyze the following symptoms and provide possible conditions.

Rules:
- If symptoms clearly point to one condition, provide only that one
- If uncertain, provide 2-3 most likely conditions (maximum 3)
- For each condition, specify which doctor to consult
- Keep descriptions brief and clear
- For medication: suggest OTC medicines or home remedies for mild conditions
- For serious conditions: Always say "Seek immediate medical attention" in the medication field

Symptoms: ${symptoms}

Respond in this exact JSON format only, no other text:
{"conditions": [{"disease": "condition name", "doctor": "type of doctor", "description": "brief description", "medication": "OTC medicine/home remedy OR 'Seek immediate medical attention' for serious cases"}]}`;
};
