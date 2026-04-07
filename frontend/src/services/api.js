// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api-pathiq.onrender.com';

// ==================== LOCAL COURSE DATA (FULL CONTENT PRESERVED) ====================
const localCourses = [
  {
    _id: '1',
    courseTitle: 'CS101: Introduction to Computing',
    courseCode: 'CS101',
    description: 'A foundational module covering the transition from physical hardware to digital logic and safety.',
    longDescription: `At its most fundamental level, a computer is a programmable electronic device designed to accept raw data as input, process that data using a set of instructions (software), produce a result (output), and store that result for future use. However, in the 21st century, the definition has expanded. A computer is no longer just a "desktop" or "laptop"; it is an embedded system in your car, a smartphone in your pocket, and the massive server farms powering the cloud. Every computer follows the Information Processing Cycle (IPOS): Input, Processing, Output, Storage.`,
    section1: `1.1 Defining the Modern Computer...`,
    instructor: 'Dr. Smith',
    duration: '4 weeks',
    level: 'Beginner',
    category: 'Computer Science',
    icon: '💻',
    progress: 0,
    daysLeft: 30,
    enrolledStudent: [],
    topics: [
      {
        id: 1,
        title: 'Foundations of Computing',
        description: 'Hardware components, software categories, and the role of the CPU, memory, and I/O devices.',
        duration: '20 min',
        fullContent: `TOPIC 1: FOUNDATIONS OF COMPUTING (HARDWARE & SOFTWARE)

Hardware Components: The Physical Machine
Hardware refers to the tangible, physical parts of the computer system.

A. Central Processing Unit (CPU)
Often called the "Brain," the CPU executes instructions. It consists of:
1. ALU (Arithmetic Logic Unit): Performs all calculations.
2. CU (Control Unit): The "Traffic Cop." It decodes instructions.
3. Registers: Internal high-speed storage.

B. Input and Output (I/O) Devices
1. Input: Keyboard, Mouse, Scanner, Microphone.
2. Output: Monitors, Printers, Speakers.

C. Storage Hierarchy
1. Primary Storage (Memory): RAM - Volatile, fast.
2. Secondary Storage: SSD, HDD - Non-volatile, slower.

Software Categories:
A. System Software - Operating Systems, Utility Programs, Device Drivers
B. Application Software - Word Processors, Spreadsheets, Web Browsers`,
        quiz: {
          questions: [
            { id: 'q1_1', text: 'Which component is known as the "Brain" of the computer?', options: ['Monitor', 'Keyboard', 'CPU', 'Printer'], correct: 2 },
            { id: 'q1_2', text: 'Which of these is an example of an Output device?', options: ['Scanner', 'Mouse', 'Speaker', 'Joystick'], correct: 2 },
            { id: 'q1_3', text: 'What does RAM stand for?', options: ['Read Access Memory', 'Random Access Memory', 'Real Analysis Media', 'Remote Access Mode'], correct: 1 },
            { id: 'q1_4', text: 'Which software is responsible for managing computer hardware?', options: ['Microsoft Word', 'Operating System', 'Google Chrome', 'Adobe Photoshop'], correct: 1 },
            { id: 'q1_5', text: 'Which of the following is an example of System Software?', options: ['Windows 11', 'Instagram', 'WhatsApp', 'VLC Player'], correct: 0 }
          ]
        }
      },
      {
        id: 2,
        title: 'Binary Logic & Data Representation',
        description: 'Understanding the binary system, bits, bytes, and converting binary to decimal.',
        duration: '25 min',
        fullContent: `TOPIC 2: BINARY LOGIC & DATA REPRESENTATION

2.1 The Binary System (Base 2)
Computers use Binary because they are made of transistors that are either ON (1) or OFF (0).

2.2 Units of Data:
1. Bit: The smallest unit (a single 1 or 0)
2. Byte: 8 bits
3. Kilobyte (KB): 1,024 Bytes
4. Megabyte (MB): 1,024 KB
5. Gigabyte (GB): 1,024 MB
6. Terabyte (TB): 1,024 GB

2.3 Simple Binary to Decimal Conversion
Binary 1011 = 1×8 + 0×4 + 1×2 + 1×1 = 11`,
        quiz: {
          questions: [
            { id: 'q2_1', text: 'What is the smallest unit of data in a computer?', options: ['Byte', 'Bit', 'Nibble', 'Kilobyte'], correct: 1 },
            { id: 'q2_2', text: 'How many bits are in one byte?', options: ['4', '8', '16', '32'], correct: 1 },
            { id: 'q2_3', text: 'What is the binary representation of the decimal number 5?', options: ['100', '111', '101', '011'], correct: 2 },
            { id: 'q2_4', text: 'Convert binary 1011 to decimal.', options: ['9', '11', '13', '15'], correct: 1 },
            { id: 'q2_5', text: 'Which storage unit is the largest among these options?', options: ['Kilobyte (KB)', 'Megabyte (MB)', 'Gigabyte (GB)', 'Byte'], correct: 2 }
          ]
        }
      },
      {
        id: 3,
        title: 'Basics of Algorithms & Flowcharts',
        description: 'Defining algorithms, using flowchart symbols, and understanding control structures.',
        duration: '25 min',
        fullContent: `TOPIC 3: BASICS OF ALGORITHMS & FLOWCHARTS

3.1 Defining Algorithms
An algorithm is a finite, step-by-step procedure for solving a problem.

3.2 Flowchart Symbols:
• Terminal (Oval): Start/End
• Input/Output (Parallelogram): Input/Output operations
• Process (Rectangle): Calculations
• Decision (Diamond): Yes/No conditions

3.3 Logical Structures:
1. Sequence: Executing steps one after another
2. Selection (If-Then-Else): Making choices
3. Iteration (Loops): Repeating steps`,
        quiz: {
          questions: [
            { id: 'q3_1', text: 'What is the standard flowchart symbol used to represent the "Start" or "End" of a program?', options: ['Rectangle', 'Diamond', 'Oval', 'Parallelogram'], correct: 2 },
            { id: 'q3_2', text: 'Which of the following best defines an "Algorithm"?', options: ['A physical component of the CPU', 'A step-by-step procedure for solving a problem', 'A type of high-speed internet connection', 'A programming language'], correct: 1 },
            { id: 'q3_3', text: 'In a flowchart, which shape would you use to represent a calculation?', options: ['Diamond', 'Rectangle', 'Parallelogram', 'Oval'], correct: 1 },
            { id: 'q3_4', text: 'Which symbol is used for a Decision in a flowchart?', options: ['Rectangle', 'Oval', 'Parallelogram', 'Diamond'], correct: 3 },
            { id: 'q3_5', text: 'Which logical structure repeats steps until a condition is met?', options: ['Sequence', 'Selection', 'Iteration (Loop)', 'Encryption'], correct: 2 }
          ]
        }
      },
      {
        id: 4,
        title: 'Internet Safety & Digital Citizenship',
        description: 'Web browsers, HTTPS, malware, phishing, and digital ethics.',
        duration: '20 min',
        fullContent: `TOPIC 4: INTERNET SAFETY & DIGITAL CITIZENSHIP

4.1 Understanding the Web
The Internet is a massive network of networks. The World Wide Web (WWW) is the system of interlinked documents.

4.2 Cybersecurity Basics
A. Malware: Viruses, Worms, Trojan Horses, Ransomware
B. Phishing: Attempts to acquire sensitive information
C. Strong Passwords: Use 12+ characters with mixed case, numbers, symbols

4.3 Digital Ethics
• Think Before You Post
• Respect Intellectual Property
• Protect Your Digital Footprint`,
        quiz: {
          questions: [
            { id: 'q4_1', text: 'What does the "S" stand for in the protocol "HTTPS"?', options: ['Standard', 'Secure', 'System', 'Speed'], correct: 1 },
            { id: 'q4_2', text: 'Which type of malware disguises itself as legitimate software?', options: ['Worm', 'Virus', 'Trojan Horse', 'Spyware'], correct: 2 },
            { id: 'q4_3', text: 'An email asking you to verify your bank details is likely an example of:', options: ['Phishing', 'Firewall', 'Encryption', 'Cloud Computing'], correct: 0 },
            { id: 'q4_4', text: 'What is the most effective way to secure an account?', options: ['Short password', 'Multi-Factor Authentication (MFA)', 'Saving password in browser', 'Using birthdate'], correct: 1 },
            { id: 'q4_5', text: 'What is your permanent record of online activities called?', options: ['Digital Shadow', 'Internet History', 'Digital Footprint', 'Cyber Trail'], correct: 2 }
          ]
        }
      }
    ],
    exam: {
      timeLimit: 60,
      questions: [
        { id: 'e1', text: 'Which inventor is known as the "Father of the Computer"?', options: ['Alan Turing', 'Charles Babbage', 'Blaise Pascal', 'John von Neumann'], correct: 1 },
        { id: 'e2', text: 'First-generation computers used which technology?', options: ['Transistors', 'Integrated Circuits', 'Microprocessors', 'Vacuum Tubes'], correct: 3 },
        { id: 'e3', text: 'What was the breakthrough of the Second Generation?', options: ['The Transistor', 'World Wide Web', 'Artificial Intelligence', 'Magnetic Tapes'], correct: 0 },
        { id: 'e4', text: 'Which generation introduced the microprocessor?', options: ['Second', 'Third', 'Fourth', 'Fifth'], correct: 2 },
        { id: 'e5', text: 'What is Von Neumann Architecture?', options: ['The Babbage Principle', 'Stored program concept', 'Moore\'s Law', 'The Turing Test'], correct: 1 },
        { id: 'e6', text: 'Correct order of IPOS?', options: ['Processing, Input, Storage, Output', 'Input, Processing, Output, Storage', 'Input, Storage, Output, Processing', 'Storage, Input, Processing, Output'], correct: 1 },
        { id: 'e7', text: 'Which CPU part performs calculations?', options: ['Control Unit', 'Registers', 'ALU', 'System Clock'], correct: 2 },
        { id: 'e8', text: 'Which is volatile memory?', options: ['SSD', 'ROM', 'RAM', 'HDD'], correct: 2 },
        { id: 'e9', text: 'Which storage has no moving parts?', options: ['Magnetic Tape', 'SSD', 'CD-ROM', 'Floppy Disk'], correct: 1 },
        { id: 'e10', text: 'Primary role of OS?', options: ['Browse internet', 'Manage hardware', 'Create documents', 'Physical protection'], correct: 1 },
        { id: 'e11', text: 'Which software performs maintenance tasks?', options: ['Application Software', 'System Utilities', 'Device Drivers', 'Firmware'], correct: 1 },
        { id: 'e12', text: 'Which is an Input device?', options: ['Plotter', 'Monitor', 'Biometric Scanner', 'Projector'], correct: 2 },
        { id: 'e13', text: 'Purpose of Device Driver?', options: ['Speed up internet', 'Allow OS to communicate with hardware', 'Encrypt drive', 'Translate binary'], correct: 1 },
        { id: 'e14', text: 'Kernel is core of which software?', options: ['Microsoft Word', 'Operating System', 'Google Chrome', 'Antivirus'], correct: 1 },
        { id: 'e15', text: 'Middleman between software and hardware?', options: ['CPU', 'BIOS', 'Operating System', 'RAM'], correct: 2 },
        { id: 'e16', text: 'How many bits in a byte?', options: ['4', '8', '16', '32'], correct: 1 },
        { id: 'e17', text: 'Largest unit?', options: ['1024 KB', '1 GB', '1 TB', '1024 MB'], correct: 2 },
        { id: 'e18', text: 'Convert binary 1011 to decimal', options: ['9', '11', '13', '15'], correct: 1 },
        { id: 'e19', text: 'Binary of decimal 5?', options: ['101', '111', '011', '110'], correct: 0 },
        { id: 'e20', text: 'Encoding for all languages and emojis?', options: ['ASCII', 'Binary', 'Unicode', 'Hexadecimal'], correct: 2 },
        { id: 'e21', text: 'Parallelogram in flowchart?', options: ['Decision', 'Start/End', 'Input/Output', 'Process'], correct: 2 },
        { id: 'e22', text: 'Decision shape in flowchart?', options: ['Oval', 'Diamond', 'Rectangle', 'Circle'], correct: 1 },
        { id: 'e23', text: 'Step-by-step instructions to solve problem?', options: ['Program', 'Algorithm', 'Flowchart', 'Variable'], correct: 1 },
        { id: 'e24', text: 'Structure that repeats steps?', options: ['Sequence', 'Selection', 'Iteration', 'Branching'], correct: 2 },
        { id: 'e25', text: 'Oval represents?', options: ['Process', 'Input/Output', 'Terminal (Start/Stop)', 'Storage'], correct: 2 }
      ]
    },
    resources: []
  },
  {
    _id: '2',
    courseTitle: 'ENG303: English Language & Composition',
    courseCode: 'ENG303',
    description: 'Master the fundamentals of English grammar, sentence structure, punctuation, and formal communication.',
    longDescription: `This comprehensive course covers the essential elements of English language and composition...`,
    section1: `1.1 The 8 Parts of Speech: The Building Blocks...`,
    instructor: 'Dr. Johnson',
    duration: '6 weeks',
    level: 'Beginner',
    category: 'English Language',
    icon: '📝',
    progress: 0,
    daysLeft: 30,
    enrolledStudent: [],
    topics: [
      {
        id: 1,
        title: 'Parts of Speech & Sentence Structure',
        description: 'Learn the 8 parts of speech, sentence components, and different types of sentences.',
        duration: '25 min',
        fullContent: `TOPIC 1: PARTS OF SPEECH & SENTENCE STRUCTURE...`,
        quiz: {
          questions: [
            { id: 'eng1_q1', text: 'Identify the adverb: "The developer worked tirelessly."', options: ['Developer', 'Worked', 'Tirelessly', 'The'], correct: 2 },
            { id: 'eng1_q2', text: 'Which joins two clauses together?', options: ['Preposition', 'Conjunction', 'Interjection', 'Pronoun'], correct: 1 },
            { id: 'eng1_q3', text: 'Subject in "She sent the email"?', options: ['She', 'Sent', 'The', 'Email'], correct: 0 },
            { id: 'eng1_q4', text: '"I wanted to study, but I was tired" is?', options: ['Simple', 'Compound', 'Complex', 'Fragment'], correct: 1 },
            { id: 'eng1_q5', text: 'Which is an Abstract Noun?', options: ['Computer', 'Lagos', 'Knowledge', 'Teacher'], correct: 2 }
          ]
        }
      },
      {
        id: 2,
        title: 'Tenses and Concord',
        description: 'Master verb tenses and subject-verb agreement rules.',
        duration: '25 min',
        fullContent: `TOPIC 2: TENSES AND CONCORD...`,
        quiz: {
          questions: [
            { id: 'eng2_q1', text: 'Correct verb: "The group of analysts ___ meeting today."', options: ['is', 'are', 'were', 'am'], correct: 0 },
            { id: 'eng2_q2', text: '"They will have completed" is?', options: ['Future Continuous', 'Future Perfect', 'Simple Future', 'Past Perfect'], correct: 1 },
            { id: 'eng2_q3', text: 'Error: "Each of the boys play football."', options: ['Each', 'boys', 'play', 'football'], correct: 2 },
            { id: 'eng2_q4', text: 'Change "I eat" to Present Continuous', options: ['I ate', 'I have eaten', 'I am eating', 'I will eat'], correct: 2 },
            { id: 'eng2_q5', text: '"Neither keys nor phone (is/are) in car"', options: ['is', 'are', 'was', 'am'], correct: 0 }
          ]
        }
      },
      {
        id: 3,
        title: 'Punctuation and Mechanics',
        description: 'Learn proper punctuation, capitalization, and common spelling rules.',
        duration: '25 min',
        fullContent: `TOPIC 3: PUNCTUATION AND MECHANICS...`,
        quiz: {
          questions: [
            { id: 'eng3_q1', text: 'Which connects two related sentences?', options: ['Comma', 'Colon', 'Semicolon', 'Hyphen'], correct: 2 },
            { id: 'eng3_q2', text: 'Correct punctuation?', options: ['Its raining', 'It\'s raining', 'Its\' raining', 'It is raining\' outside'], correct: 1 },
            { id: 'eng3_q3', text: 'Capitalize: "we visited london"', options: ['we', 'london', 'both', 'neither'], correct: 2 },
            { id: 'eng3_q4', text: 'Which introduces a list?', options: ['Dash', 'Semicolon', 'Colon', 'Comma'], correct: 2 },
            { id: 'eng3_q5', text: 'Correct spelling?', options: ['Recieve', 'Receive', 'Recive', 'Receve'], correct: 1 }
          ]
        }
      },
      {
        id: 4,
        title: 'Letter Writing & Formal Communication',
        description: 'Master formal and informal letter writing techniques.',
        duration: '20 min',
        fullContent: `TOPIC 4: LETTER WRITING & FORMAL COMMUNICATION...`,
        quiz: {
          questions: [
            { id: 'eng4_q1', text: 'Start with "Dear Sir," end with?', options: ['Yours sincerely', 'Yours faithfully', 'Your friend', 'Best regards'], correct: 1 },
            { id: 'eng4_q2', text: 'Where does date go in formal letter?', options: ['Bottom left', 'Below receiver\'s address', 'Below sender\'s address', 'Middle'], correct: 2 },
            { id: 'eng4_q3', text: 'Informal salutation?', options: ['Dear Mr. President', 'To whom it may concern', 'Hey Sarah', 'Respected Sir'], correct: 2 },
            { id: 'eng4_q4', text: 'Purpose of Subject Line?', options: ['Say hello', 'Summarize purpose', 'List attachments', 'Show date'], correct: 1 },
            { id: 'eng4_q5', text: 'Characteristic of formal writing?', options: ['Slang', 'Contractions', 'Clear objective language', 'Exclamation marks'], correct: 2 }
          ]
        }
      }
    ],
    exam: {
      timeLimit: 60,
      questions: [
        { id: 'e1', text: 'Identify the Verb: "The machine operates smoothly."', options: ['Machine', 'Operates', 'Smoothly', 'The'], correct: 1 },
        { id: 'e2', text: 'Which is a Compound Sentence?', options: ['I slept.', 'I slept and he read.', 'While I slept, he read.', 'I slept late.'], correct: 1 },
        { id: 'e3', text: 'Collective noun "Team" takes which verb form?', options: ['Singular', 'Plural', 'Past', 'Future'], correct: 0 },
        { id: 'e4', text: 'Correct concord: "The bread and butter ___ served."', options: ['is', 'are', 'were', 'am'], correct: 0 },
        { id: 'e5', text: 'Past participle of "Speak"?', options: ['Spoke', 'Speaked', 'Spoken', 'Speaking'], correct: 2 },
        { id: 'e6', text: 'Which shows possession?', options: ['Comma', 'Semicolon', 'Apostrophe', 'Colon'], correct: 2 },
        { id: 'e7', text: 'Correct spelling: "He is very ___"', options: ['Busy', 'Buisy', 'Bussy', 'Bussey'], correct: 0 },
        { id: 'e8', text: 'In formal letter, whose address first?', options: ['Receiver', 'Sender', 'Post Office', 'Neither'], correct: 1 },
        { id: 'e9', text: '"He is running" is which aspect?', options: ['Simple', 'Perfect', 'Continuous', 'Perfect Continuous'], correct: 2 },
        { id: 'e10', text: 'Which is a Proper Noun?', options: ['Country', 'River', 'Monday', 'Month'], correct: 2 },
        { id: 'e11', text: 'Identify Adjective: "The heavy box fell."', options: ['The', 'Heavy', 'Box', 'Fell'], correct: 1 },
        { id: 'e12', text: 'Complex sentence must have:', options: ['Two independent clauses', 'One independent + one dependent', 'No verbs', 'Only adjectives'], correct: 1 },
        { id: 'e13', text: 'Which is used for abrupt break in thought?', options: ['Period', 'Dash', 'Comma', 'Question mark'], correct: 1 },
        { id: 'e14', text: '"I will have gone" is:', options: ['Past Perfect', 'Present Perfect', 'Future Perfect', 'Simple Future'], correct: 2 },
        { id: 'e15', text: 'Correct: "She dont like tea."', options: ['She doesn\'t like tea.', 'She don\'t likes tea.', 'She didn\'t liked tea.', 'She no like tea.'], correct: 0 },
        { id: 'e16', text: '"Yours faithfully" used when:', options: ['Know name', 'Don\'t know name', 'Writing to friend', 'Writing email'], correct: 1 },
        { id: 'e17', text: 'Identify Preposition: "The cat is under the bed."', options: ['Cat', 'Is', 'Under', 'Bed'], correct: 2 },
        { id: 'e18', text: 'Mark after Interjection?', options: ['?', '!', '.', ','], correct: 1 },
        { id: 'e19', text: '"To whom it may concern" is a:', options: ['Closing', 'Salutation', 'Subject line', 'Postscript'], correct: 1 },
        { id: 'e20', text: 'Correct capitalization:', options: ['i live in abuja', 'I live in abuja', 'I live in Abuja', 'i live In Abuja'], correct: 2 },
        { id: 'e21', text: 'Object in "The boy kicked the ball"?', options: ['The boy', 'Kicked', 'The ball', 'The'], correct: 2 },
        { id: 'e22', text: 'Informal letter also called:', options: ['Business letter', 'Personal letter', 'Official letter', 'Circular'], correct: 1 },
        { id: 'e23', text: 'Semicolon can replace:', options: ['Comma and Conjunction', 'Capital letter', 'Question mark', 'Noun'], correct: 0 },
        { id: 'e24', text: '"Ate" is past tense of:', options: ['Eat', 'Eating', 'Eaten', 'Eated'], correct: 0 },
        { id: 'e25', text: 'Subject-Verb agreement is also:', options: ['Composition', 'Concord', 'Context', 'Clause'], correct: 1 }
      ]
    },
    resources: []
  }
];

// ==================== HELPER FUNCTIONS ====================
const getCourseById = (courseId) => localCourses.find(course => course._id === courseId);
const getExamByCourseId = (courseId) => {
  const course = localCourses.find(course => course._id === courseId);
  return course?.exam || null;
};

const getToken = () => localStorage.getItem('token');
const getStudentId = () => {
  const userData = localStorage.getItem('user_data');
  if (userData) {
    try {
      const parsed = JSON.parse(userData);
      return parsed._id || parsed.id;
    } catch {
      return null;
    }
  }
  return null;
};

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const errorMessage = data.message || data.data?.message || `Request failed`;
    throw new Error(errorMessage);
  }
  return data;
};

const fetchWithTimeout = (url, options = {}, timeout = 30000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
};

const authFetch = (url, options = {}, timeout = 30000) => {
  const token = getToken();
  return fetchWithTimeout(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  }, timeout).then(handleResponse);
};

const formDataFetch = (url, formData, method = 'POST', timeout = 30000) => {
  const token = getToken();
  return fetchWithTimeout(`${API_BASE_URL}${url}`, {
    method,
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  }, timeout).then(handleResponse);
};

// ==================== API EXPORT ====================
export const api = {
  student: {
    signup: (userData) => fetchWithTimeout(`${API_BASE_URL}/api/v1/auth/student/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    }, 30000).then(handleResponse),
    
    login: (email, password) => fetchWithTimeout(`${API_BASE_URL}/api/v1/auth/student/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }, 30000).then(handleResponse),
    
    logout: () => authFetch('/api/v1/auth/student/logout', { method: 'POST' }, 10000).catch(() => ({ success: true })),
    refreshToken: () => authFetch('/api/v1/auth/student/refresh-token', { method: 'POST' }, 15000),
    getProfile: () => authFetch('/api/v1/auth/student/profile', { method: 'GET' }, 15000),
    updateProfile: (profileData) => authFetch('/api/v1/auth/student/update-profile', {
      method: 'PATCH',
      body: JSON.stringify(profileData)
    }, 15000),
    uploadProfilePicture: (formData) => formDataFetch('/api/v1/auth/student/upload-profile-picture', formData, 'POST', 30000),
    deleteAccount: () => authFetch('/api/v1/auth/student/delete-profile', { method: 'DELETE' }, 15000),
    verifyAccount: (email, otp) => authFetch('/api/v1/auth/student/verify-account', {
      method: 'POST',
      body: JSON.stringify({ email, otp })
    }, 15000),
    resendOtp: (email) => fetchWithTimeout(`${API_BASE_URL}/api/v1/auth/student/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }, 15000).then(handleResponse),
    forgotPassword: (email) => fetchWithTimeout(`${API_BASE_URL}/api/v1/auth/student/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }, 15000).then(handleResponse),
    resetPassword: (email, otp, newPassword) => fetchWithTimeout(`${API_BASE_URL}/api/v1/auth/student/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword })
    }, 15000).then(handleResponse),
    getMyCourses: () => authFetch('/api/v1/student/course/my-courses', { method: 'GET' }, 15000),
    getCourseDetails: (courseId) => authFetch(`/api/v1/student/course/${courseId}`, { method: 'GET' }, 15000),
    startCourse: (courseId) => authFetch('/api/v1/student/course/start-course', {
      method: 'POST',
      body: JSON.stringify({ courseId })
    }, 15000),
    enrollCourses: (courseIds) => authFetch('/api/v1/student/course/enroll-courses', {
      method: 'POST',
      body: JSON.stringify({ courseIds })
    }, 15000),
    updateCourseProgress: (courseId, topicIndex) => authFetch('/api/v1/student/course/course-progress', {
      method: 'PATCH',
      body: JSON.stringify({ courseId, topicIndex })
    }, 15000),
    getMyProgress: () => authFetch('/api/v1/student/course/my-progress', { method: 'GET' }, 15000),
    trackAppOpen: () => authFetch('/api/v1/student/app-open', { method: 'POST' }, 10000),
  },

  admin: {
    signup: (adminData) => fetchWithTimeout(`${API_BASE_URL}/api/v1/auth/admin/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminData)
    }, 30000).then(handleResponse),
    
    login: (email, password) => fetchWithTimeout(`${API_BASE_URL}/api/v1/auth/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }, 30000).then(handleResponse),
    
    logout: () => authFetch('/api/v1/auth/admin/logout', { method: 'POST' }, 10000),
    refreshToken: () => authFetch('/api/v1/auth/admin/refresh-token', { method: 'POST' }, 15000),
    getProfile: () => authFetch('/api/v1/auth/admin/profile', { method: 'GET' }, 15000),
    updateProfile: (profileData) => authFetch('/api/v1/auth/admin/update-profile', {
      method: 'PATCH',
      body: JSON.stringify(profileData)
    }, 15000),
    uploadProfilePicture: (formData) => formDataFetch('/api/v1/auth/admin/upload-profile-picture', formData, 'POST', 30000),
    deleteAccount: () => authFetch('/api/v1/auth/admin/delete-profile', { method: 'DELETE' }, 15000),
    verifyAccount: (email, otp) => authFetch('/api/v1/auth/admin/verify-account', {
      method: 'POST',
      body: JSON.stringify({ email, otp })
    }, 15000),
    resendOtp: (email) => fetchWithTimeout(`${API_BASE_URL}/api/v1/auth/admin/resend-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }, 15000).then(handleResponse),
    forgotPassword: (email) => fetchWithTimeout(`${API_BASE_URL}/api/v1/auth/admin/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    }, 15000).then(handleResponse),
    resetPassword: (email, otp, newPassword) => fetchWithTimeout(`${API_BASE_URL}/api/v1/auth/admin/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp, newPassword })
    }, 15000).then(handleResponse),
    getAllStudents: () => authFetch('/api/v1/auth/admin/get-all-students', { method: 'GET' }, 20000),
    getAllGuardians: () => authFetch('/api/v1/auth/admin/get-all-guardians', { method: 'GET' }, 20000),
    getStudentsProgress: () => authFetch('/api/v1/auth/admin/all-progress', { method: 'GET' }, 20000),
    getAllProgress: () => authFetch('/api/v1/auth/admin/all-progress', { method: 'GET' }, 20000),
    getDashboardStats: async () => {
      try {
        return await authFetch('/api/v1/auth/admin/dashboard-stats', { method: 'GET' }, 15000);
      } catch {
        return await authFetch('/api/v1/auth/admin/all-progress', { method: 'GET' }, 15000);
      }
    },
    triggerReminders: () => authFetch('/api/v1/auth/admin/trigger-reminders', {
      method: 'POST',
      body: JSON.stringify({})
    }, 30000),
  },

  guardian: {
    signup: (guardianData) => fetchWithTimeout(`${API_BASE_URL}/api/v1/auth/guardian/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(guardianData)
    }, 30000).then(handleResponse),
    
    login: (email, password) => fetchWithTimeout(`${API_BASE_URL}/api/v1/auth/guardian/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    }, 30000).then(handleResponse),
    
    logout: () => authFetch('/api/v1/auth/guardian/logout', { method: 'POST' }, 10000),
    refreshToken: () => authFetch('/api/v1/auth/guardian/refresh-token', { method: 'POST' }, 15000),
    getProfile: () => authFetch('/api/v1/auth/guardian/profile', { method: 'GET' }, 15000),
    updateProfile: (profileData) => authFetch('/api/v1/auth/guardian/update-profile', {
      method: 'PATCH',
      body: JSON.stringify(profileData)
    }, 15000),
    getStudents: () => authFetch('/api/v1/auth/guardian/get-students', { method: 'GET' }, 15000),
    linkStudent: (uniqueCode) => authFetch('/api/v1/auth/guardian/link-student', {
      method: 'POST',
      body: JSON.stringify({ uniqueCode })
    }, 15000),
    getStudentsProgress: () => authFetch('/api/v1/auth/guardian/students-progress', { method: 'GET' }, 15000),
    getChildProgress: (studentId) => authFetch(`/api/v1/auth/guardian/student/${studentId}/progress`, { method: 'GET' }, 15000),
  },

  courses: {
    findAllCourses: async () => {
      try {
        return await authFetch('/api/v1/student/course/find-all-courses', { method: 'GET' }, 15000);
      } catch (error) {
        return { message: localCourses, source: 'local' };
      }
    },
    
    findOneCourse: async (courseId) => {
      try {
        const allCoursesResponse = await authFetch('/api/v1/student/course/find-all-courses', { method: 'GET' }, 15000);
        
        let coursesList = [];
        if (allCoursesResponse?.message && Array.isArray(allCoursesResponse.message)) {
          coursesList = allCoursesResponse.message;
        } else if (Array.isArray(allCoursesResponse)) {
          coursesList = allCoursesResponse;
        }
        
        const foundCourse = coursesList.find(course => course._id === courseId);
        
        if (foundCourse) {
          return { data: foundCourse, source: 'backend' };
        }
        
        const localCourse = getCourseById(courseId);
        if (localCourse) {
          return { data: localCourse, source: 'local' };
        }
        
        throw new Error('Course not found');
        
      } catch (error) {
        const localCourse = getCourseById(courseId);
        if (localCourse) {
          return { data: localCourse, source: 'local' };
        }
        throw new Error('Course not found');
      }
    },
    
    createCourse: async (courseData) => {
      return await authFetch('/api/v1/student/course/create-course', {
        method: 'POST',
        body: JSON.stringify(courseData)
      }, 15000);
    },
    
    updateCourse: async (courseId, courseData) => {
      return await authFetch(`/api/v1/student/course/update-course/${courseId}`, {
        method: 'PATCH',
        body: JSON.stringify(courseData)
      }, 15000);
    },
    
    deleteCourse: async (courseId) => {
      return await authFetch(`/api/v1/student/course/delete-course/${courseId}`, {
        method: 'DELETE'
      }, 15000);
    },
    
    addTopics: (courseId, title, description) => authFetch('/api/v1/student/course/add-topic', {
      method: 'POST',
      body: JSON.stringify({ courseId, title, description })
    }, 15000),
    
    getCourseTopics: (courseId) => authFetch(`/api/v1/student/course/get-all-topics?courseId=${courseId}`, { method: 'GET' }, 15000),
    
    enrollStudent: (courseId, studentId) => authFetch('/api/v1/student/course/enroll', {
      method: 'POST',
      body: JSON.stringify({ courseId, studentId })
    }, 15000),
    
    getEnrolledStudents: (courseId) => authFetch(`/api/v1/student/course/${courseId}/students`, { method: 'GET' }, 15000),
    
    addExamScore: (courseId, studentId, examScore) => authFetch('/api/v1/student/course/add-exam-score', {
      method: 'POST',
      body: JSON.stringify({ courseId, studentId, examScore })
    }, 15000),
    
    addQuizScore: (courseId, studentId, topicName, score) => authFetch('/api/v1/student/course/add-quiz-score', {
      method: 'POST',
      body: JSON.stringify({ courseId, studentId, topicName, score })
    }, 15000),
    
    finalGrades: (courseId, studentId) => authFetch('/api/v1/student/course/final-grade', {
      method: 'POST',
      body: JSON.stringify({ courseId, studentId })
    }, 15000),
  },
  
  events: {
    getEvents: () => authFetch('/api/v1/event/grading', { method: 'GET' }, 15000),
    getEvent: (eventId) => authFetch(`/api/v1/event/grading/${eventId}`, { method: 'GET' }, 15000),
    createEvent: (eventData) => authFetch('/api/v1/event/grading', { method: 'POST', body: JSON.stringify(eventData) }, 15000),
    updateEvent: (eventId, eventData) => authFetch(`/api/v1/event/grading/${eventId}`, { method: 'PATCH', body: JSON.stringify(eventData) }, 15000),
    deleteEvent: (eventId) => authFetch(`/api/v1/event/grading/${eventId}`, { method: 'DELETE' }, 15000),
  },

  quiz: {
    getQuizQuestions: async (courseId, topicId) => {
      try {
        return await authFetch(`/api/v1/student/course/${courseId}/${topicId}/quiz`, { method: 'GET' }, 15000);
      } catch (error) {
        return null;
      }
    },
    
    submitQuiz: async (courseId, topicId, answers, score) => {
      const studentId = getStudentId();
      return await authFetch(`/api/v1/student/course/quiz/${courseId}/${topicId}/submit`, {
        method: 'POST',
        body: JSON.stringify({ answers, score, studentId, timestamp: new Date().toISOString() })
      }, 15000);
    },
    
    getTestQuestions: async (courseId) => {
      try {
        return await authFetch(`/api/v1/student/course/${courseId}/test`, { method: 'GET' }, 15000);
      } catch (error) {
        return null;
      }
    },
    
    submitTestAnswers: async (courseId, answers, score) => {
      const studentId = getStudentId();
      return await authFetch(`/api/v1/student/course/test/${courseId}/submit`, {
        method: 'POST',
        body: JSON.stringify({ answers, score, studentId, timestamp: new Date().toISOString() })
      }, 15000);
    },
    
    addQuizQuestion: async (courseId, topicId, questionData) => {
      return await authFetch(`/api/v1/course/${courseId}/${topicId}/add-quiz-question`, {
        method: 'POST',
        body: JSON.stringify(questionData)
      }, 15000);
    },
    
    addTestQuestion: async (courseId, topicId, questionData) => {
      return await authFetch(`/api/v1/course/${courseId}/${topicId}/test-questions`, {
        method: 'POST',
        body: JSON.stringify(questionData)
      }, 15000);
    },
  },

  exam: {
    addExamScore: async (studentId, examData) => {
      return await authFetch(`/api/v1/course/student/${studentId}/add-exam-score`, {
        method: 'POST',
        body: JSON.stringify(examData)
      }, 15000);
    },
    
    submitExam: async (courseId, answers) => {
      const studentId = getStudentId();
      return await authFetch(`/api/v1/course/test/${courseId}/submit`, {
        method: 'POST',
        body: JSON.stringify({ answers, studentId })
      }, 15000);
    }
  },

  grades: {
    getFinalGrade: async (courseId, studentId) => {
      return await authFetch(`/api/v1/course/${courseId}/${studentId}/final-grade`, { method: 'POST' }, 15000);
    },
    
    calculateFinalGrade: async (courseId, studentId) => {
      return await authFetch(`/api/v1/course/${courseId}/${studentId}/final-grade`, { method: 'POST' }, 15000);
    }
  },

  progress: {
    updateProgress: async (progressData) => {
      return await authFetch('/api/v1/progress/update', { method: 'POST', body: JSON.stringify(progressData) }, 15000);
    },
    
    getProgress: async (courseId) => {
      return await authFetch(`/api/v1/progress/${courseId}`, { method: 'GET' }, 15000);
    }
  },

  social: {
    google: {
      login: () => {
        window.location.href = `${API_BASE_URL}/api/v1/oauth/google`;
      },
      callback: (code) => {
        return fetchWithTimeout(`${API_BASE_URL}/api/v1/oauth/google/callback?code=${code}`, { method: 'GET' }, 15000).then(handleResponse);
      },
    },
    facebook: {
      login: () => {
        window.location.href = `${API_BASE_URL}/api/v1/oauth/facebook`;
      },
      callback: (code) => {
        return fetchWithTimeout(`${API_BASE_URL}/api/v1/oauth/facebook/callback?code=${code}`, { method: 'GET' }, 15000).then(handleResponse);
      },
    },
  },
};

export default api;