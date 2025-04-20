import React, { useState, useRef, useEffect } from 'react';
import openaiService from '../services/openaiService';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hello! I'm your insurance advisor. I can help you with:\n\n1. Policy Types & Coverage:\n   • Health Insurance (₹500/month)\n   • Life Insurance (₹1000/month)\n   • Critical Illness (₹800/month)\n\n2. Claim Processes:\n   • Cashless treatment\n   • Reimbursement claims\n   • Required documents\n\n3. Network Hospitals:\n   • 5000+ hospitals across India\n   • 24/7 emergency support\n   • Cashless treatment process\n\n4. Policy Management:\n   • Easy renewal process\n   • 15 days grace period\n   • Policy portability\n\nWhat would you like to know about?", 
      sender: 'bot' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Get response
      const botResponse = await openaiService.getChatResponse([...messages, userMessage]);
      
      setMessages(prev => [...prev, { 
        text: botResponse, 
        sender: 'bot' 
      }]);
    } catch (error) {
      console.error('Chatbot Error:', error);
      setMessages(prev => [...prev, { 
        text: "I can help you with information about:\n\n1. Policy Types & Coverage\n2. Claim Processes\n3. Required Documents\n4. Network Hospitals\n5. Renewal Procedures\n6. Premium Information\n\nPlease ask about any of these topics.", 
        sender: 'bot' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        className="chatbot-float-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>Insurance Advisor</h3>
            <button 
              className="chatbot-close-button"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            ))}
            {isLoading && (
              <div className="message bot typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about insurance policies, claims, or coverage..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot; 