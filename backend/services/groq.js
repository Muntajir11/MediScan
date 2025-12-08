import { GROQ_MODEL, GROQ_API_URL, getSymptomAnalysisPrompt } from '../utils/prompts.js';

export const analyzeSymptoms = async (symptoms, apiKey) => {
  const prompt = getSymptomAnalysisPrompt(symptoms);
  
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message || 'Groq API error');
  }

  const textResponse = data.choices?.[0]?.message?.content;

  if (!textResponse) {
    throw new Error('No response from API');
  }

  const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
  
  if (!jsonMatch) {
    throw new Error('Failed to parse response');
  }

  return JSON.parse(jsonMatch[0]);
};
