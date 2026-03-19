export const generateTraining = async (text) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const prompt = `You are an expert AI instructional designer. Analyze the following Standard Operating Procedure (SOP) or document and output a comprehensive training module in JSON format.
  
  The JSON must be exactly this structure:
  {
    "summary": "A concise summary of the training module based on the provided text.",
    "steps": [
      {
        "id": 1,
        "title": "Title of the step",
        "description": "Detailed description of what to do in this step",
        "keyPoints": ["Key point 1", "Key point 2", "Key point 3"]
      }
    ],
    "quiz": [
      {
        "id": "q1",
        "question": "A multiple choice question based on the document",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "correct_answer": "The exact string from options that is correct",
        "explanation": "Explanation of why this answer is correct"
      }
    ]
  }

  IMPORTANT REQUIREMENTS:
  1. Generate exactly 3-4 training steps.
  2. Generate AT LEAST 8 multiple-choice questions for the quiz. Add more questions (e.g., 10-15) if the SOP/document is very long and contains a lot of detailed information. The number of questions should scale with the length and complexity of the document.
  3. CRITICAL: Strongly randomize the position of the correct answer within the "options" array for each question. It should not constantly fall on the 2nd or 3rd option. Ensure the correct option has an equal chance of being the 1st, 2nd, 3rd, or 4th item in the array.
  
  Here is the document text:
  ---
  ${text}
  ---
  `;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to generate training module: ${response.statusText}`);
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    
    return JSON.parse(resultText);
  } catch (error) {
    console.error("Error generating from Gemini:", error);
    throw error;
  }
};
