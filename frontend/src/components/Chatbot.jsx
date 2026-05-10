import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            content: 'Hello! I\'m your Health Insurance Assistant. How can I help you today? You can ask me about:',
            options: [
                'General Information about Policies',
                'Policy Coverage',
                'Premium and Payment',
                'Claim and Renewal',
                'Exclusions',
                'Policy Types and Riders',
                'Policy Upgrades',
                'Comparison and Recommendations'
            ]
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const faqData = {
        "general information": {
            title: "General Information about Policies",
            questions: {
                "what is health insurance": "A contract that covers medical expenses due to illness, injury, or surgery, reducing your healthcare costs.",
                "how does health insurance work": "You pay a premium, and the insurer covers medical costs as per policy terms (hospital stays, surgeries, etc.).",
                "difference between individual and family": "Individual plans cover one person; family plans cover multiple members under one policy.",
                "benefits of health insurance": "Financial protection, access to care, cashless treatment, and tax benefits.",
                "claim process": "Notify the insurer, submit documents (bills, prescriptions), and choose cashless or reimbursement claim."
            }
        },
        "policy coverage": {
            title: "Policy Coverage",
            questions: {
                "what is covered": "Hospitalization, surgery, doctor visits, tests, ambulance, daycare, maternity, and pre-existing conditions (after waiting).",
                "maternity coverage": "Yes, including delivery, hospitalization, pre- and post-natal care (after waiting period).",
                "pre existing conditions": "Yes, after a waiting period (usually 2–4 years). Check policy terms.",
                "daycare treatments": "Yes, including cataract, dialysis, chemotherapy, etc.",
                "mental health coverage": "Yes, many policies now include mental health coverage. Check specific policy details."
            }
        },
        "premium": {
            title: "Premium and Payment",
            questions: {
                "how is premium calculated": "Based on age, health, sum insured, plan type, and riders.",
                "factors affecting premium": "Age, medical history, coverage amount, insurer network, pre-existing conditions.",
                "installment payment": "Yes, monthly/quarterly/annual options are available.",
                "missed payment": "Your policy may lapse after the grace period. Late fee or reinstatement may apply."
            }
        },
        "claim": {
            title: "Claim and Renewal",
            questions: {
                "how to file claim": "Submit claim online with documents like bills, summary, prescriptions.",
                "claim documents": "Policy copy, bills, discharge summary, test reports, ID proof.",
                "online renewal": "Yes, login to your account and complete renewal.",
                "check claim status": "Use your login and claim reference number on our site to track."
            }
        },
        "exclusions": {
            title: "Exclusions",
            questions: {
                "what are exclusions": "Cosmetic surgery, dental, pre-existing during waiting, drug/alcohol-related, etc.",
                "cosmetic treatments": "Not unless medically necessary (e.g., post-accident reconstruction).",
                "dental coverage": "Only if medically necessary or included via add-on riders."
            }
        },
        "policy types": {
            title: "Policy Types and Riders",
            questions: {
                "types of policies": "Health Insurance – Covers general medical expenses.\nCritical Illness Insurance – Lump sum payout on critical illness diagnosis.\nFamily Health Insurance – Covers entire family in one policy.\nSenior Citizen Health Insurance – Designed for elderly individuals.\nTop-up Plans – Extra coverage over base policy at lower cost.",
                "what are riders": "Add-ons like critical illness, maternity, hospital cash—enhance base coverage.",
                "critical illness coverage": "Yes, for financial support on serious diseases like cancer or heart attack."
            }
        },
        "upgrades": {
            title: "Policy Upgrades",
            questions: {
                "upgrade policy": "Yes, at renewal or via policy revision (subject to terms).",
                "increase coverage": "Request during renewal or add top-up. May need medical checks."
            }
        },
        "comparison": {
            title: "Comparison and Recommendations",
            questions: {
                "best family policy": "Star Family Health Optima – ₹1.5 Cr cover, 650+ hospitals, maternity & daycare included.",
                "compare plans": "Care Plus – ₹5L cover, ₹35K premium, 380+ hospitals, riders: CI/OPD.\nNiva Bupa Aspire Gold+ – ₹5L, ₹37.5K, 234+ hospitals, riders: Hospital Cash/Safeguard+.\nStar Family Health Optima – ₹1.5Cr, ₹1.99L, 650+ hospitals, ideal for families.\nSenior Citizen Plan – ₹5L, ₹42K, designed for elderly.",
                "pre existing condition policy": "Care Plus and Senior Citizen Plan – both cover pre-existing conditions post-waiting period."
            }
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const findAnswer = (query) => {
        query = query.toLowerCase();
        
        // Check each category
        for (const [category, data] of Object.entries(faqData)) {
            // Check if query matches category
            if (query.includes(category)) {
                return {
                    type: 'bot',
                    content: `Here's what I know about ${data.title}:`,
                    options: Object.keys(data.questions)
                };
            }
            
            // Check questions in category
            for (const [question, answer] of Object.entries(data.questions)) {
                if (query.includes(question)) {
                    return {
                        type: 'bot',
                        content: answer
                    };
                }
            }
        }

        // If no direct match, provide category options
        return {
            type: 'bot',
            content: "I'm not sure about that. Would you like to know about any of these topics?",
            options: Object.keys(faqData).map(category => category.charAt(0).toUpperCase() + category.slice(1))
        };
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
        setInputValue('');
        setIsTyping(true);

        // Simulate bot thinking
        setTimeout(() => {
            setIsTyping(false);
            const response = findAnswer(inputValue);
            setMessages(prev => [...prev, response]);
        }, 1000);
    };

    const handleOptionClick = (option) => {
        setMessages(prev => [...prev, { type: 'user', content: option }]);
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const response = findAnswer(option);
            setMessages(prev => [...prev, response]);
        }, 1000);
    };

    return (
        <>
            <button 
                className="chatbot-float-button"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '✕' : '💬'}
            </button>

            {isOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <h3>Health Insurance Assistant</h3>
                        <button 
                            className="chatbot-close-button"
                            onClick={() => setIsOpen(false)}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.type}`}>
                                <p>{message.content}</p>
                                {message.options && (
                                    <div className="message-options">
                                        {message.options.map((option, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleOptionClick(option)}
                                                className="option-button"
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your question here..."
                            disabled={isTyping}
                        />
                        <button 
                            onClick={handleSend}
                            disabled={isTyping || !inputValue.trim()}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot; 