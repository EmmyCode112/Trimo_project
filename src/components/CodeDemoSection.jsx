import React, { useState, useEffect, useRef } from 'react';

const CodeDemoSection = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const sectionRef = useRef(null);
  const codeLines = [
    '# Download the helper library from https://www.twilio.com/docs/python/install',
    'import os',
    'from twilio.rest import Client',
    '',
    '# Find your Account SID and Auth Token at twilio.com/console',
    '# and set the environment variables. See http://twil.io/secure',
    '',
    'account_sid = os.environ[\'TWILIO_ACCOUNT_SID\']',
    'auth_token = os.environ[\'TWILIO_AUTH_TOKEN\']',
    'client = Client(account_sid, auth_token)',
    '',
    'message = client.messages.create(',
    '                              body=\'Hi there\',',
    '                              from_=\'+15017122661\',',
    '                              to=\'+15558675310\'',
    '                          )',
    '',
    'print(message.sid)'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            startTypingAnimation();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const startTypingAnimation = () => {
    if (currentLine < codeLines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    startTypingAnimation();
  }, [currentLine]);

  return (
    <section ref={sectionRef} className="py-24 bg-[#310C16] text-white fade-up" id="code-demo">
      <div className="max-w-[1440px] mx-auto px-4">
        <div className="max-w-[1218px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-[106px]">
          <div className="lg:w-1/2 fade-up">
            <h2 className="text-[40px] font-general font-semibold leading-tight mb-6">
              Send your first text message in a matter of minutes
            </h2>
            <p className="text-[18px] font-general font-medium leading-[28px] mb-8 opacity-90">
              Sign up for a free Twilio account and grab one of our seven official server-side SDKs to get started. Send your first text message, phone call, or email in minutes and when you're ready to launch your app, upgrade to a pay-as-you-go plan.
            </p>
            <div className="flex gap-4">
              <a href="#" className="px-6 py-3 bg-transparent border border-white rounded-lg font-medium hover:bg-white hover:text-[#310C16] transition-colors">
                View docs
              </a>
              <a href="#" className="px-6 py-3 bg-white text-[#310C16] rounded-lg font-medium hover:bg-opacity-90 transition-colors">
                Sign up
              </a>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full max-w-[658px] bg-[#310C16] rounded-lg border border-gray-800 fade-up">
            <div className="p-6 overflow-hidden font-mono text-sm">
              <pre className="text-left">
                {codeLines.slice(0, currentLine).map((line, index) => {
                  if (line.includes('TWILIO_ACCOUNT_SID')) {
                    return <div key={index}><span className="text-gray-400">account_sid = os.environ[</span><span className="text-yellow-500">'TWILIO_ACCOUNT_SID'</span><span className="text-gray-400">]</span></div>;
                  }
                  if (line.includes('TWILIO_AUTH_TOKEN')) {
                    return <div key={index}><span className="text-gray-400">auth_token = os.environ[</span><span className="text-yellow-500">'TWILIO_AUTH_TOKEN'</span><span className="text-gray-400">]</span></div>;
                  }
                  if (line.includes('# Download') || line.includes('# Find') || line.includes('# and set')) {
                    return <div key={index} className="text-gray-500">{line}</div>;
                  }
                  if (line.includes('import')) {
                    const parts = line.split(' ');
                    return (
                      <div key={index}>
                        <span className="text-purple-400">{parts[0]}</span> {parts.slice(1).join(' ')}
                      </div>
                    );
                  }
                  if (line.includes('from')) {
                    const parts = line.split(' import ');
                    return (
                      <div key={index}>
                        <span className="text-purple-400">from</span> {parts[0].slice(5)} <span className="text-purple-400">import</span> <span className="text-green-400">{parts[1]}</span>
                      </div>
                    );
                  }
                  if (line.includes('\'Hi there\'')) {
                    return <div key={index}><span className="text-gray-400">                              body=</span><span className="text-green-400">'Hi there'</span><span className="text-gray-400">,</span></div>;
                  }
                  if (line.includes('+15017122661')) {
                    return <div key={index}><span className="text-gray-400">                              from_=</span><span className="text-green-400">'+15017122661'</span><span className="text-gray-400">,</span></div>;
                  }
                  if (line.includes('+15558675310')) {
                    return <div key={index}><span className="text-gray-400">                              to=</span><span className="text-green-400">'+15558675310'</span></div>;
                  }
                  return <div key={index}>{line}</div>;
                })}
                <span className="inline-block w-2 h-4 bg-white animate-pulse"></span>
              </pre>
            </div>
            
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-500 text-white">
                <span className="sr-only">Edit</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-[1218px] mx-auto mt-[45px]">
          <div className="bg-[#310C16] border border-gray-800 rounded-[15px] p-6 lg:p-[27px] grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-[36px] fade-up">
            <div>
              <h3 className="text-[20px] font-general font-semibold mb-2">Official SDKs</h3>
              <p className="text-[16px] opacity-80 font-general">
                Build quickly and confidently with our SDKs for Node.js, Python, C#, Java, PHP, Ruby, and Go.
              </p>
            </div>
            
            <div>
              <h3 className="text-[20px] font-general font-semibold mb-2">Triimo Functions</h3>
              <p className="text-[16px] opacity-80 font-general">
                Bring ideas to life without having to host your own code by deploying with Triimo Functions.
              </p>
            </div>
            
            <div>
              <h3 className="text-[20px] font-general font-semibold mb-2">99.95%+ API uptime</h3>
              <p className="text-[16px] opacity-80 font-general">
                Reliable availability you can trust to power your app's most important features.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16 fade-up">
            <p className="text-[18px] font-general font-medium mb-12">Join 4,000+ companies already growing</p>
            
            <div className="flex flex-wrap justify-center gap-12">
              <div className="w-[120px] h-[40px] flex items-center">
                <span className="text-white text-2xl font-bold">coinbase</span>
              </div>
              <div className="w-[120px] h-[40px] flex items-center">
                <span className="text-white text-2xl font-bold">Spotify</span>
              </div>
              <div className="w-[120px] h-[40px] flex items-center">
                <span className="text-white text-2xl font-bold">slack</span>
              </div>
              <div className="w-[120px] h-[40px] flex items-center">
                <span className="text-white text-2xl font-bold">Dropbox</span>
              </div>
              <div className="w-[120px] h-[40px] flex items-center">
                <span className="text-white text-2xl font-bold">webflow</span>
              </div>
              <div className="w-[120px] h-[40px] flex items-center">
                <span className="text-white text-2xl font-bold">zoom</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeDemoSection;