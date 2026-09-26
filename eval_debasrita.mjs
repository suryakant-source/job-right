import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

const resumeText = `
NAME: Debasrita Das
LOCATION: Cuttack, Odisha | Phone: +91 6370785766 | Email: dasdebasrita90@gmail.com
LINKS: Leetcode, LinkedIn, GitHub
EDUCATION: Silicon University, B.Tech in CSE (2023 - 2027), CGPA: 8.78
TECHNICAL SKILLS:
- Languages: Kotlin, Java, Python, JavaScript, C++, SQL, HTML/CSS
- Android: Jetpack Compose, Material 3, MVVM, Clean Architecture, Repository Pattern, ViewModel, StateFlow, Kotlin Coroutines, Retrofit, OkHttp, Gson, Room, Firebase, Supabase, DataStore, ML Kit
- Generative AI: LLM Integration, Retrieval-Augmented Generation (RAG), Prompt Engineering, Vector Embeddings, Groq API, Gemini API
- Web: React.js, Node.js, Express.js, MongoDB, Mongoose, REST API, JWT Authentication
- Cloud: AWS (EC2, S3, RDS, Lambda, API Gateway, CloudFormation, IAM, CloudWatch)
- Tools: Git, GitHub, Android Studio, Figma, VS Code, Postman
EXPERIENCE:
1. GenAI Android Development Intern at Ingenious Tech (Jun 2026 - Present):
   - Developed 5+ AI-powered Android features (on-device text recognition, barcode scanning, real-time translation) using Kotlin, Jetpack Compose, MVVM, ML Kit.
   - Designed RAG pipelines with embedding generation, language detection, context-aware document retrieval across 3+ languages, improving response relevance by ~40%.
   - Integrated Supabase Auth & DB with Coroutines for 100+ concurrent users.
2. Android Development Intern at Ingenious Tech (Jun 2025 - Jul 2025):
   - Delivered 10+ responsive screens in Jetpack Compose & Material 3, reducing turnaround by ~30%.
   - Integrated 10+ REST endpoints via Retrofit & Coroutines.
   - Optimized Compose recomposition across 5+ screens, reducing state rebuilds by ~25%.
3. AWS Cloud Intern at Ingenious Tech (Jun 2024 - Jul 2024):
   - CloudFormation templates for EC2, S3, RDS, Lambda, API Gateway.
   - Configured 20+ IAM roles and least-privilege policies.
PROJECTS:
- NeuraChat: AI-Powered Android Chat App (Kotlin, Jetpack Compose, Groq API, LLaMA 3.3, Supabase)
- GigShield: Safety Intelligence Platform for Gig Workers (MERN stack, Leaflet.js, OpenWeather API)
- AskIt: Community Q&A Android Application (Kotlin, Jetpack Compose, Firebase Firestore)
CERTIFICATIONS: NPTEL The Joy of Computing Using Python (92%), NPTEL Incubation and Entrepreneurship (91%).
`;

const prompt = `
Candidate Profile:
${resumeText}

You are an elite Tech Career Matchmaker & Senior Engineering Recruiter in India and Global Tech.
Analyze Debasrita Das's resume with extreme precision. 
Her profile is unusually potent: She has 3 internships while still an undergrad (B.Tech 2027), combining Native Android (Kotlin + Jetpack Compose) with GenAI (RAG, Groq, Gemini, ML Kit) and AWS Cloud.

Identify the TOP 5 BEST & MOST VALID JOB ROLES in India and Global Remote that are an immediate 90%+ match for her.

For each of the Top 5 roles:
1. Exact Job Title & Level (Internship / SDE-1 / Associate Engineer)
2. Target Company Categories & Real Examples (e.g. Fintech, AI Startups, D2C Superapps like Swiggy, Zomato, Razorpay, CRED, Juspay, InVideo, Perplexity mobile, Speechify)
3. Match Score (e.g. 96/100, 5/5 Stars)
4. Why it's a Perfect Fit (link her specific projects: NeuraChat, Jetpack Compose, ML Kit, RAG pipelines, AWS CloudFormation)
5. Critical ATS Keywords to Highlight
6. Expected Salary / Stipend Range in India (2026 market standards)
7. Strategic Application Pitch (The exact pitch she should send to founders/hiring managers on LinkedIn)

Format in clean, structured, highly professional Markdown with a comparative summary table at the beginning.
`;

const apiKey = process.env.GROQ_API_KEY;

const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + apiKey,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'openai/gpt-oss-120b',
    messages: [
      { role: 'system', content: 'You are an elite Tech Career Matchmaker & Senior Engineering Recruiter specializing in Mobile and Generative AI talent.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.3,
    max_tokens: 3500
  })
});

const data = await res.json();
if (data.choices && data.choices[0]) {
  const content = data.choices[0].message.content;
  console.log(content);
  fs.writeFileSync('debasrita_top_5_jobs_report.md', content, 'utf-8');
  console.log('\n--> Successfully saved to debasrita_top_5_jobs_report.md');
} else {
  console.error('Groq Error:', JSON.stringify(data));
}
