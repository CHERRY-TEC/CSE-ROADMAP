export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "course" | "book" | "youtube" | "website" | "tool";
  category: string;
  free: boolean;
}

export const resourcesData: Resource[] = [
  { id: "r1", title: "Andrew Ng ML Course", description: "Best beginner-friendly ML course on Coursera", url: "https://coursera.org/learn/machine-learning", type: "course", category: "ml", free: true },
  { id: "r2", title: "Fast.ai", description: "Practical deep learning for coders", url: "https://fast.ai", type: "course", category: "dl", free: true },
  { id: "r3", title: "StatQuest", description: "ML & statistics explained visually on YouTube", url: "https://youtube.com/c/joshstarmer", type: "youtube", category: "math", free: true },
  { id: "r4", title: "3Blue1Brown", description: "Visual math explanations (linear algebra, calculus)", url: "https://youtube.com/c/3blue1brown", type: "youtube", category: "math", free: true },
  { id: "r5", title: "Kaggle Learn", description: "Free micro-courses on ML, Python, SQL", url: "https://kaggle.com/learn", type: "course", category: "ml", free: true },
  { id: "r6", title: "NeetCode", description: "DSA problem explanations and roadmaps", url: "https://neetcode.io", type: "website", category: "dsa", free: true },
  { id: "r7", title: "Automate the Boring Stuff", description: "Best Python book for beginners", url: "https://automatetheboringstuff.com", type: "book", category: "programming", free: true },
  { id: "r8", title: "HuggingFace Course", description: "Learn transformers and NLP", url: "https://huggingface.co/course", type: "course", category: "nlp", free: true },
  { id: "r9", title: "Made With ML", description: "Learn MLOps by building", url: "https://madewithml.com", type: "course", category: "mlops", free: true },
  { id: "r10", title: "Scikit-learn Docs", description: "Official docs with examples", url: "https://scikit-learn.org", type: "website", category: "ml", free: true },
  { id: "r11", title: "Google ML Crash Course", description: "Fast-paced ML intro by Google", url: "https://developers.google.com/machine-learning/crash-course", type: "course", category: "ml", free: true },
  { id: "r12", title: "Leetcode", description: "Practice coding problems for interviews", url: "https://leetcode.com", type: "website", category: "dsa", free: true },
  { id: "r13", title: "FreeCodeCamp", description: "Full-stack web dev courses", url: "https://freecodecamp.org", type: "course", category: "web", free: true },
  { id: "r14", title: "CS231n", description: "Stanford CNN course for computer vision", url: "https://cs231n.stanford.edu", type: "course", category: "cv", free: true },
  { id: "r15", title: "Deep Learning Specialization", description: "Andrew Ng's deep learning series", url: "https://coursera.org/specializations/deep-learning", type: "course", category: "dl", free: true },
  { id: "r16", title: "Papers With Code", description: "ML papers with implementations", url: "https://paperswithcode.com", type: "website", category: "research", free: true },
  { id: "r17", title: "LangChain", description: "Framework for LLM applications", url: "https://langchain.com", type: "tool", category: "genai", free: true },
  { id: "r18", title: "MLflow", description: "ML experiment tracking and deployment", url: "https://mlflow.org", type: "tool", category: "mlops", free: true },
  { id: "r19", title: "SQLBolt", description: "Interactive SQL tutorials", url: "https://sqlbolt.com", type: "website", category: "sql", free: true },
  { id: "r20", title: "Khan Academy", description: "Math foundations (linear algebra, calculus, stats)", url: "https://khanacademy.org", type: "course", category: "math", free: true },
  { id: "r21", title: "AlgoExpert", description: "160+ coding interview problems", url: "https://algoexpert.io", type: "tool", category: "dsa", free: false },
  { id: "r22", title: "Real Python", description: "Python tutorials and guides", url: "https://realpython.com", type: "website", category: "programming", free: true },
  { id: "r23", title: "Streamlit", description: "Build ML web apps in Python", url: "https://streamlit.io", type: "tool", category: "ml", free: true },
  { id: "r24", title: "Docker", description: "Containerize ML applications", url: "https://docker.com", type: "tool", category: "mlops", free: true },
  { id: "r25", title: "TensorFlow Cert", description: "Official TensorFlow developer certification", url: "https://tensorflow.org/certificate", type: "course", category: "dl", free: false },
  { id: "r26", title: "OpenAI Cookbook", description: "Examples and guides for GPT API", url: "https://cookbook.openai.com", type: "website", category: "genai", free: true },
];
