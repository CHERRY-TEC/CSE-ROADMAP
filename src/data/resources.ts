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
  { id: "r1", title: "CS50 Harvard", description: "Best intro to computer science", url: "https://cs50.harvard.edu", type: "course", category: "cs", free: true },
  { id: "r2", title: "NeetCode", description: "DSA problem explanations and roadmaps", url: "https://neetcode.io", type: "website", category: "dsa", free: true },
  { id: "r3", title: "Striver DSA Sheet", description: "191 most important DSA problems", url: "https://takeuforward.org/strivers-a2z-dsa-course/", type: "website", category: "dsa", free: true },
  { id: "r4", title: "Gate Smashers", description: "OS, CN, DBMS concepts explained", url: "https://youtube.com/c/gatesmashers", type: "youtube", category: "core", free: true },
  { id: "r5", title: "Leetcode", description: "Practice coding problems for interviews", url: "https://leetcode.com", type: "website", category: "dsa", free: true },
  { id: "r6", title: "OSTEP", description: "Best free OS textbook online", url: "https://pages.cs.wisc.edu/~remzi/OSTEP/", type: "book", category: "os", free: true },
  { id: "r7", title: "FreeCodeCamp", description: "Full-stack web dev courses", url: "https://freecodecamp.org", type: "course", category: "web", free: true },
  { id: "r8", title: "GeeksforGeeks", description: "CS concepts, DSA, interview prep", url: "https://geeksforgeeks.org", type: "website", category: "dsa", free: true },
  { id: "r9", title: "SQLBolt", description: "Interactive SQL tutorials", url: "https://sqlbolt.com", type: "website", category: "dbms", free: true },
  { id: "r10", title: "Docker Docs", description: "Official Docker documentation", url: "https://docs.docker.com", type: "website", category: "tools", free: true },
  { id: "r11", title: "React Docs", description: "Official React documentation", url: "https://react.dev", type: "website", category: "web", free: true },
  { id: "r12", title: "System Design Primer", description: "Learn system design with Python examples", url: "https://github.com/donnemartin/system-design-primer", type: "website", category: "system-design", free: true },
  { id: "r13", title: "Git Handbook", description: "Official Git guide", url: "https://guides.github.com", type: "website", category: "tools", free: true },
  { id: "r14", title: "Linux Journey", description: "Learn Linux from scratch", url: "https://linuxjourney.com", type: "website", category: "tools", free: true },
  { id: "r15", title: "AlgoExpert", description: "160+ coding interview problems", url: "https://algoexpert.io", type: "tool", category: "dsa", free: false },
  { id: "r16", title: "Codeforces", description: "Competitive programming platform", url: "https://codeforces.com", type: "website", category: "dsa", free: true },
  { id: "r17", title: "Refactoring Guru", description: "Design patterns explained", url: "https://refactoring.guru", type: "website", category: "core", free: true },
  { id: "r18", title: "Khan Academy", description: "Math foundations", url: "https://khanacademy.org", type: "course", category: "math", free: true },
  { id: "r19", title: "MIT OCW", description: "Free MIT courses", url: "https://ocw.mit.edu", type: "course", category: "cs", free: true },
  { id: "r20", title: "AWS Free Tier", description: "Free cloud resources for 12 months", url: "https://aws.amazon.com/free/", type: "website", category: "cloud", free: true },
  { id: "r21", title: "OverTheWire", description: "Linux/security wargames", url: "https://overthewire.org", type: "website", category: "tools", free: true },
  { id: "r22", title: "MongoDB University", description: "Free NoSQL courses", url: "https://university.mongodb.com", type: "course", category: "dbms", free: true },
  { id: "r23", title: "Next.js Learn", description: "Official Next.js tutorial", url: "https://nextjs.org/learn", type: "course", category: "web", free: true },
  { id: "r24", title: "InterviewBit", description: "Interview preparation platform", url: "https://interviewbit.com", type: "website", category: "interview", free: true },
  { id: "r25", title: "CS50 Sections", description: "Supplementary CS50 videos", url: "https://youtube.com/cs50", type: "youtube", category: "cs", free: true },
  { id: "r26", title: "Baeldung", description: "Java/Spring tutorials", url: "https://baeldung.com", type: "website", category: "web", free: true },
];
