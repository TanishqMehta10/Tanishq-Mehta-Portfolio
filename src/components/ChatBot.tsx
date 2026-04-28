import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone, Linkedin, FileText, Mic } from 'lucide-react';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; content: string }>>([
    {
      role: 'bot',
      content: 'Hi! 👋 I\'m Tanishq\'s AI Assistant. I can answer questions about his skills, projects, education, and more. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Resume Data
  const resumeData = {
    name: 'Tanishq Amar Mehta',
    email: 'tanishqamehta1@gmail.com',
    phone: '9322166466',
    linkedin: 'in/tanishq-mehta-2052832b7',
    portfolio: 'tanishq-mehta-portfolio.onrender.com/',
    summary: 'Python developer with expertise in data structures and algorithms, machine learning with an interest in team leadership and collaborative development.',
    projects: [
      {
        title: 'Stock Trading Decision System using Q-Learning',
        description: 'Developed an AI-driven stock trading system using reinforcement learning and Q-Learning on historical market data.',
        tech: ['Python', 'Q-Learning', 'Pandas', 'NumPy', 'yfinance', 'Streamlit'],
        link: 'https://stock-trading-decision-system.streamlit.app/',
        github: 'github.com/TanishqMehta10/Stock-Trading-Decision-System-using-Q-Learning'
      },
      {
        title: 'Multimodal Fake Media Detection System',
        description: 'Multi-modal deepfake detection system that identifies manipulated images and videos using AI-based analysis.',
        tech: ['Python', 'FastAPI', 'React.js', 'PyTorch', 'OpenCV', 'EfficientNet'],
        link: 'github.com/TanishqMehta10/Multimodal-Fake-Media-Detection-System'
      },
      {
        title: 'Smart Tourist Safety & Emergency Response System',
        description: 'A safety and emergency response platform for tourists that detects incidents and coordinates immediate rescue efforts.',
        tech: ['React', 'Tailwind CSS', 'MySQL', 'Ethereum', 'Node.js']
      },
      {
        title: 'Smart Surveillance System for Exam Integrity',
        description: 'AI-powered system that detects cheating during exams by spotting suspicious actions and banned items.',
        tech: ['Python', 'OpenCV', 'YOLOv8', 'Flask', 'dlib']
      }
    ],
    skills: {
      programming: ['Python', 'Java', 'C'],
      concepts: ['Data Structures', 'Algorithms'],
      ml: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning'],
      web: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js'],
      database: ['MySQL'],
      tools: ['Git', 'GitHub', 'VS Code', 'Anaconda', 'Render']
    },
    education: {
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science and Engineering',
      minor: 'Electronics and Telecommunication Engineering',
      university: 'Walchand Institute of Technology',
      location: 'Solapur',
      graduation: '2027',
      cgpa: '8.81'
    },
    certifications: [
      'Complete Data Science, Machine Learning, DL, NLP Bootcamp - Udemy (2026)'
    ],
    involvement: [
      'Event Coordinator - Walchand Institute of Technology (Feb 2026) - UI/UX design competition'
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Greeting
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hey there! 👋 I'm Tanishq's assistant. Feel free to ask me about his projects, skills, education, or anything else related to his profile!";
    }

    // Projects
    if (message.includes('project')) {
      return `Tanishq has worked on several amazing projects:\n\n1. **Stock Trading Decision System** - AI-driven trading using Q-Learning\n2. **Multimodal Fake Media Detection** - Deepfake detection with AI\n3. **Smart Tourist Safety System** - Emergency response platform with blockchain\n4. **Exam Surveillance System** - AI-powered cheating detection\n\nWould you like more details about any specific project?`;
    }

    // Skills
    if (message.includes('skill')) {
      return `**Tanishq's Skills:**\n\n📱 **Programming:** Python, Java, C\n🧠 **Machine Learning:** Supervised, Unsupervised, Reinforcement Learning\n🌐 **Web Dev:** React.js, Node.js, HTML, CSS, JavaScript\n💾 **Database:** MySQL\n🛠️ **Tools:** Git, GitHub, VS Code, Anaconda, Render\n\nHe specializes in Python development and ML!`;
    }

    // Education
    if (message.includes('education') || message.includes('degree') || message.includes('college')) {
      return `**Education:**\n\n🎓 **B.Tech in Computer Science and Engineering**\n🏛️ **University:** Walchand Institute of Technology, Solapur\n📅 **Graduation:** 2027\n📊 **CGPA:** 8.81\n\nMinor: Electronics and Telecommunication Engineering`;
    }

    // Experience / Background
    if (message.includes('experience') || message.includes('background')) {
      return `Tanishq is a Python developer with strong expertise in Data Structures, Algorithms, and Machine Learning. He has a keen interest in team leadership and collaborative development. He's currently studying at Walchand Institute of Technology and has completed a Data Science, Machine Learning, Deep Learning, and NLP Bootcamp.`;
    }

    // Certifications
    if (message.includes('certification') || message.includes('course')) {
      return `**Certifications:**\n\n✅ Complete Data Science, Machine Learning, DL, NLP Bootcamp - Udemy (2026)\n\nThis bootcamp covered core Python, machine learning, deep learning, NLP concepts, model building, and performance improvement techniques.`;
    }

    // Stock Trading Project
    if (message.includes('stock') || message.includes('trading')) {
      return `**Stock Trading Decision System** 📈\n\nAn AI-driven system that learns optimal trading decisions using Reinforcement Learning (Q-Learning) on historical market data.\n\n**Tech:** Python, Q-Learning, Pandas, NumPy, yfinance, Streamlit\n**Features:** Real-time market analysis, reward-based learning, performance visualization\n\n🔗 Try it: stock-trading-decision-system.streamlit.app/`;
    }

    // Fake Media Project
    if (message.includes('fake') || message.includes('deepfake') || message.includes('detection')) {
      return `**Multimodal Fake Media Detection System** 🎬\n\nDetects manipulated images and videos using AI-based analysis.\n\n**Tech:** Python, FastAPI, React.js, PyTorch, OpenCV, EfficientNet\n**Features:** Frame extraction, face detection, authenticity scoring, heatmap visualization\n\nThis system can identify deepfakes with high accuracy!`;
    }

    // ResQNow Project
    if (message.includes('tourist') || message.includes('safety') || message.includes('rescue') || message.includes('resqnow')) {
      return `**Smart Tourist Safety & Emergency Response System** 🏔️\n\nA comprehensive platform for detecting incidents and coordinating immediate rescue efforts for tourists.\n\n**Tech:** React, Tailwind CSS, MySQL, Ethereum (blockchain), Node.js\n**Features:** Real-time incident detection, location tracking, rescue team coordination, blockchain verification\n\n🔗 Live: resqnow-fast.vercel.app/`;
    }

    // Exam Surveillance Project
    if (message.includes('exam') || message.includes('surveillance') || message.includes('cheating')) {
      return `**Smart Surveillance System for Exam Integrity** 📹\n\nAI-powered system that detects cheating by spotting suspicious actions and banned items.\n\n**Tech:** Python, OpenCV, YOLOv8, Flask, dlib\n**Features:** Real-time detection, instant alerts to invigilators, proof-based evidence\n\nThis system helps maintain exam integrity and fairness!`;
    }

    // About Tanishq
    if (message.includes('who') || message.includes('about')) {
      return `👨‍💻 **About Tanishq Amar Mehta**\n\nA passionate Python developer with expertise in Data Structures, Algorithms, and Machine Learning. Currently pursuing B.Tech in CSE (with Minor in Electronics) at Walchand Institute of Technology, graduating in 2027.\n\nHe's enthusiastic about building AI-driven solutions and has worked on projects spanning ML, web development, and blockchain technology. He's also interested in team leadership and collaborative development.`;
    }

    // Contact / Links
    if (message.includes('contact') || message.includes('email') || message.includes('reach')) {
      return `📧 **Email:** tanishqamehta1@gmail.com\n\nYou can also:\n📞 Call directly using the phone option below\n💼 Connect on LinkedIn\n\nHe'd love to hear from you!`;
    }

    // GitHub / Portfolio
    if (message.includes('github') || message.includes('portfolio') || message.includes('code')) {
      return `Check out Tanishq's work:\n\n🐙 **GitHub:** github.com/TanishqMehta10\n🌐 **Portfolio:** tanishq-mehta-portfolio.onrender.com/\n\nYou'll find all his projects and contributions there!`;
    }

    // Default response
    return `I can help you learn about Tanishq's skills, projects, education, certifications, and more! Try asking about:\n- Projects\n- Skills\n- Education\n- Experience\n- Specific projects (Stock Trading, Fake Media Detection, etc.)\n\nWhat would you like to know? 😊`;
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    // Simulate delay for bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(userMessage);
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
      setIsLoading(false);
    }, 500);
  };

  const handleMicClick = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in your browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInput('');
      recognitionRef.current.start();
    }
  };

  return (
    <>
      {/* Floating Chatbot Icon */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl">💬</div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">Tanishq's Assistant</h2>
                <p className="text-sm text-purple-100">Online 🟢</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800/50">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-purple-600 text-white rounded-br-none'
                        : 'bg-gray-700 text-gray-100 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-700 px-4 py-2 rounded-lg rounded-bl-none">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Action Buttons */}
            <div className="bg-gray-800 p-3 border-t border-gray-700 grid grid-cols-3 gap-2">
              <a
                href="tel:9322166466"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-2 rounded-lg flex items-center justify-center gap-1 transition text-xs font-medium"
              >
                <Phone size={16} />
                <span className="hidden sm:inline">Call</span>
              </a>
              <a
                href="https://www.linkedin.com/in/tanishq-mehta-2052832b7"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 rounded-lg flex items-center justify-center gap-1 transition text-xs font-medium"
              >
                <Linkedin size={16} />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <a
                href="/Tanishq Mehta Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-2 rounded-lg flex items-center justify-center gap-1 transition text-xs font-medium"
              >
                <FileText size={16} />
                <span className="hidden sm:inline">Resume</span>
              </a>
            </div>

            {/* Input */}
            <div className="bg-gray-800 p-4 border-t border-gray-700 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about Tanishq..."
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
              />
              <button
                onClick={handleMicClick}
                className={`p-2 rounded-lg transition ${
                  isListening
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                <Mic size={20} />
              </button>
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white p-2 rounded-lg transition"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
