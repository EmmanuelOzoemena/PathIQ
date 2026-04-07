// src/services/coursesData.js
export const courses = [
  {
    id: 'cs101',
    title: 'CS101: Introduction to Computing',
    description: 'A foundational module covering the transition from physical hardware to digital logic and computing principles.',
    students: 0,
    topicsCount: 4,
    topics: [
      {
        id: 'topic1',
        title: 'Foundations of Computing',
        content: '...',
        quizzes: []
      },
      {
        id: 'topic2',
        title: 'Binary Logic & Data Representation',
        content: '...',
        quizzes: []
      },
      {
        id: 'topic3',
        title: 'Basics of Algorithms & Flowcharts',
        content: '...',
        quizzes: []
      },
      {
        id: 'topic4',
        title: 'Computer Hardware & Software',
        content: '...',
        quizzes: []
      }
    ],
    exam: {
      id: 'final-exam-cs101',
      title: 'CS101 Final Examination',
      description: 'Comprehensive final exam covering all topics in Introduction to Computing',
      timeLimit: 120,
      passingScore: 70,
      totalQuestions: 25,
      sections: [
        {
          id: 'section-a',
          title: 'Section A: Origin and History of Computing',
          questions: [
            {
              id: 'q1',
              question: 'Which 19th-century inventor is widely regarded as the "Father of the Computer" for designing the Analytical Engine?',
              options: [
                'A) Alan Turing',
                'B) Charles Babbage',
                'C) Blaise Pascal',
                'D) John von Neumann'
              ],
              correctAnswer: 1,
              explanation: 'Charles Babbage designed the Analytical Engine in 1837, which had all the essential elements of a modern computer.'
            },
            {
              id: 'q2',
              question: 'First-generation computers (1940-1956) were characterized by the use of which technology for circuitry?',
              options: [
                'A) Transistors',
                'B) Integrated Circuits',
                'C) Microprocessors',
                'D) Vacuum Tubes'
              ],
              correctAnswer: 3,
              explanation: 'First-generation computers used vacuum tubes for circuitry and magnetic drums for memory.'
            },
            {
              id: 'q3',
              question: 'What was the primary technological breakthrough of the Second Generation of computers?',
              options: [
                'A) The invention of the Transistor',
                'B) The development of the World Wide Web',
                'C) The use of Artificial Intelligence',
                'D) The creation of Magnetic Tapes'
              ],
              correctAnswer: 0,
              explanation: 'Transistors replaced vacuum tubes in second-generation computers, making them smaller, faster, and more reliable.'
            },
            {
              id: 'q4',
              question: 'Which generation of computers saw the introduction of the microprocessor, allowing the entire CPU to fit on a single chip?',
              options: [
                'A) Second Generation',
                'B) Third Generation',
                'C) Fourth Generation',
                'D) Fifth Generation'
              ],
              correctAnswer: 2,
              explanation: 'The Intel 4004, the first microprocessor, was introduced in 1971, marking the beginning of the fourth generation.'
            },
            {
              id: 'q5',
              question: 'The concept that data and programs should be stored in the same memory unit is known as:',
              options: [
                'A) The Babbage Principle',
                'B) Von Neumann Architecture',
                'C) Moore\'s Law',
                'D) The Turing Test'
              ],
              correctAnswer: 1,
              explanation: 'Von Neumann Architecture describes a stored-program computer where instructions and data are stored in the same memory.'
            }
          ]
        },
        {
          id: 'section-b',
          title: 'Section B: Hardware and Software Foundations',
          questions: [
            {
              id: 'q6',
              question: 'In the Information Processing Cycle (IPOS), what is the correct order of stages?',
              options: [
                'A) Processing, Input, Storage, Output',
                'B) Input, Processing, Output, Storage',
                'C) Input, Storage, Output, Processing',
                'D) Storage, Input, Processing, Output'
              ],
              correctAnswer: 1,
              explanation: 'IPOS stands for Input, Processing, Output, and Storage - the four stages of information processing.'
            },
            {
              id: 'q7',
              question: 'Which part of the CPU is responsible for performing mathematical calculations and logical comparisons?',
              options: [
                'A) Control Unit (CU)',
                'B) Registers',
                'C) Arithmetic Logic Unit (ALU)',
                'D) System Clock'
              ],
              correctAnswer: 2,
              explanation: 'The ALU performs all arithmetic and logical operations in the CPU.'
            },
            {
              id: 'q8',
              question: 'Which of the following is a \'Volatile\' form of memory?',
              options: [
                'A) SSD (Solid State Drive)',
                'B) ROM (Read-Only Memory)',
                'C) RAM (Random Access Memory)',
                'D) HDD (Hard Disk Drive)'
              ],
              correctAnswer: 2,
              explanation: 'RAM is volatile memory - it loses all data when power is turned off.'
            },
            {
              id: 'q9',
              question: 'Which storage technology uses flash memory and has no moving parts, making it faster than a traditional hard drive?',
              options: [
                'A) Magnetic Tape',
                'B) SSD',
                'C) CD-ROM',
                'D) Floppy Disk'
              ],
              correctAnswer: 1,
              explanation: 'SSDs (Solid State Drives) use flash memory with no moving parts, offering faster access times than HDDs.'
            },
            {
              id: 'q10',
              question: 'What is the primary role of the Operating System (OS)?',
              options: [
                'A) To browse the internet',
                'B) To manage hardware resources and provide a user interface',
                'C) To create spreadsheets and documents',
                'D) To protect the computer from physical damage'
              ],
              correctAnswer: 1,
              explanation: 'The OS manages hardware resources and provides a user interface for interaction.'
            },
            {
              id: 'q11',
              question: 'Which category of software is specifically designed to perform maintenance tasks like defragmentation or virus scanning?',
              options: [
                'A) Application Software',
                'B) System Software (Utilities)',
                'C) Device Drivers',
                'D) Firmware'
              ],
              correctAnswer: 1,
              explanation: 'Utility software performs maintenance tasks like disk cleanup, defragmentation, and virus scanning.'
            },
            {
              id: 'q12',
              question: 'Which of these is considered an \'Input\' device?',
              options: [
                'A) Plotter',
                'B) Monitor',
                'C) Biometric Scanner',
                'D) Projector'
              ],
              correctAnswer: 2,
              explanation: 'A biometric scanner inputs biological data into the computer system.'
            },
            {
              id: 'q13',
              question: 'What is the purpose of a \'Device Driver\'?',
              options: [
                'A) To speed up the internet connection',
                'B) To allow the OS to communicate with a specific piece of hardware',
                'C) To encrypt the hard drive',
                'D) To translate binary into English'
              ],
              correctAnswer: 1,
              explanation: 'Device drivers enable the operating system to communicate with hardware devices.'
            },
            {
              id: 'q14',
              question: 'The \'Kernel\' is the core component of which software?',
              options: [
                'A) Microsoft Word',
                'B) The Operating System',
                'C) Google Chrome',
                'D) Antivirus software'
              ],
              correctAnswer: 1,
              explanation: 'The kernel is the core of an operating system, managing system resources and communication between hardware and software.'
            },
            {
              id: 'q15',
              question: 'Which component acts as the \'middleman\' between the user\'s software and the computer\'s hardware?',
              options: [
                'A) The CPU',
                'B) The BIOS',
                'C) The Operating System',
                'D) The RAM'
              ],
              correctAnswer: 2,
              explanation: 'The OS acts as an intermediary between applications and hardware.'
            }
          ]
        },
        {
          id: 'section-c',
          title: 'Section C: Binary Logic and Data Representation',
          questions: [
            {
              id: 'q16',
              question: 'How many bits are contained in one single Byte?',
              options: [
                'A) 4',
                'B) 8',
                'C) 16',
                'D) 32'
              ],
              correctAnswer: 1,
              explanation: 'One byte consists of 8 bits.'
            },
            {
              id: 'q17',
              question: 'Which of the following units represents the largest amount of data?',
              options: [
                'A) 1024 Kilobytes',
                'B) 1 Gigabyte',
                'C) 1 Terabyte',
                'D) 1024 Megabytes'
              ],
              correctAnswer: 2,
              explanation: '1 Terabyte = 1024 GB, which is larger than 1 GB, 1024 MB (1.07 GB), and 1024 KB (1 MB).'
            },
            {
              id: 'q18',
              question: 'Convert the binary number 1011 to its decimal (Base 10) equivalent.',
              options: [
                'A) 9',
                'B) 11',
                'C) 13',
                'D) 15'
              ],
              correctAnswer: 1,
              explanation: '1011 in binary = (1×2³) + (0×2²) + (1×2¹) + (1×2⁰) = 8 + 0 + 2 + 1 = 11.'
            },
            {
              id: 'q19',
              question: 'What is the binary representation of the decimal number 5?',
              options: [
                'A) 101',
                'B) 111',
                'C) 011',
                'D) 110'
              ],
              correctAnswer: 0,
              explanation: '5 in binary is 101: (1×2²) + (0×2¹) + (1×2⁰) = 4 + 0 + 1 = 5.'
            },
            {
              id: 'q20',
              question: 'Which encoding standard was developed to represent every character from every language in the world, including emojis?',
              options: [
                'A) ASCII',
                'B) Binary',
                'C) Unicode',
                'D) Hexadecimal'
              ],
              correctAnswer: 2,
              explanation: 'Unicode supports over 143,000 characters covering all world languages and symbols including emojis.'
            }
          ]
        },
        {
          id: 'section-d',
          title: 'Section D: Algorithms and Flowcharts',
          questions: [
            {
              id: 'q21',
              question: 'In a flowchart, what does the \'Parallelogram\' symbol represent?',
              options: [
                'A) A logical decision',
                'B) The start or end of the program',
                'C) Input or Output operations',
                'D) A process or calculation'
              ],
              correctAnswer: 2,
              explanation: 'Parallelograms in flowcharts represent input/output operations.'
            },
            {
              id: 'q22',
              question: 'What shape is used in a flowchart to represent a \'Decision\' or \'Condition\'?',
              options: [
                'A) Oval',
                'B) Diamond',
                'C) Rectangle',
                'D) Circle'
              ],
              correctAnswer: 1,
              explanation: 'Diamonds represent decision points with yes/no or true/false branches.'
            },
            {
              id: 'q23',
              question: 'A step-by-step set of instructions designed to solve a specific problem is called:',
              options: [
                'A) A Program',
                'B) An Algorithm',
                'C) A Flowchart',
                'D) A Variable'
              ],
              correctAnswer: 1,
              explanation: 'An algorithm is a step-by-step procedure for solving a problem.'
            },
            {
              id: 'q24',
              question: 'Which algorithmic structure involves repeating a set of steps until a condition is met?',
              options: [
                'A) Sequence',
                'B) Selection',
                'C) Iteration (Loop)',
                'D) Branching'
              ],
              correctAnswer: 2,
              explanation: 'Iteration or looping repeats steps until a condition is satisfied.'
            },
            {
              id: 'q25',
              question: 'What does the \'Oval\' symbol represent in a standard flowchart?',
              options: [
                'A) A Process',
                'B) Input/Output',
                'C) Terminal (Start/Stop)',
                'D) Storage'
              ],
              correctAnswer: 2,
              explanation: 'Ovals represent start and end points in flowcharts.'
            }
          ]
        }
      ],
      answerKey: {
        'q1': 1, 'q2': 3, 'q3': 0, 'q4': 2, 'q5': 1,
        'q6': 1, 'q7': 2, 'q8': 2, 'q9': 1, 'q10': 1,
        'q11': 1, 'q12': 2, 'q13': 1, 'q14': 1, 'q15': 2,
        'q16': 1, 'q17': 2, 'q18': 1, 'q19': 0, 'q20': 2,
        'q21': 2, 'q22': 1, 'q23': 1, 'q24': 2, 'q25': 2
      }
    }
  }
];

// Helper function to get course by ID
export const getCourseById = (courseId) => {
  return courses.find(course => course.id === courseId);
};

// Helper function to get exam by course ID
export const getExamByCourseId = (courseId) => {
  const course = courses.find(course => course.id === courseId);
  return course?.exam || null;
};