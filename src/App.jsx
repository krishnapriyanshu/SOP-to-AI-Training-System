import React, { useState } from 'react';
import MainLayout from './layouts/MainLayout';
import SopInputForm from './components/SopInputForm';
import LoadingState from './components/LoadingState';
import TrainingSteps from './components/TrainingSteps';
import QuizWidget from './components/QuizWidget';
import { generateTraining } from './utils/mockApi';

function App() {
  const [trainingData, setTrainingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSopSubmit = async (text) => {
    setIsLoading(true);
    try {
      const data = await generateTraining(text);
      setTrainingData(data);
    } catch (error) {
      console.error("Failed to generate training:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTrainingData(null);
    setIsLoading(false);
  };

  return (
    <MainLayout>
      <div className="w-full flex justify-center">
        {!isLoading && !trainingData && (
          <div className="flex flex-col items-center justify-center text-center mt-12 mb-20 max-w-5xl px-4 relative w-full">
            
            {/* Connecting lines SVG background element (simulated) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none opacity-20 -z-10"
              style={{
                backgroundImage: 'radial-gradient(circle at top, #6C48F2 0%, transparent 50%)',
                filter: 'blur(60px)'
              }}
            ></div>

            <h2 className="font-display text-5xl md:text-6xl lg:text-[72px] font-extrabold tracking-tight text-brand-dark mb-6 leading-[1.1]">
              World's First AI-Powered <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-[#9d8bf0]">
                SOP to Training Co-Pilot
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-slate-500 mb-8 max-w-2xl mx-auto">
              AI that converts documents to courses, quizzes, and training modules in one place. <span className="font-medium text-slate-700">10x Faster. Automated.</span>
            </p>
            
            <div className="flex items-center gap-3 mb-16 justify-center">
              <div className="flex -space-x-3">
                {[20, 33, 44, 12, 59].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden shadow-sm">
                     <img src={`https://i.pravatar.cc/100?img=${i}`} alt="avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start ml-2 text-sm font-medium text-slate-600">
                <span>4M+ trusted users</span>
              </div>
            </div>

            <div className="w-full relative max-w-3xl mx-auto">
              {/* Floating decor - left */}
              <div className="absolute -left-32 top-10 hidden xl:block animate-float" style={{ animationDelay: '0s' }}>
                <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 w-56 rotate-[-6deg]">
                  <div className="h-2 w-16 bg-brand-purple/20 rounded-full mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-10 bg-slate-50 rounded-xl w-full flex items-center px-3 border border-slate-100">
                      <div className="w-4 h-4 rounded-full bg-brand-light/50"></div>
                      <div className="w-20 h-2 bg-slate-200 rounded-full ml-3"></div>
                    </div>
                    <div className="h-10 bg-slate-50 rounded-xl w-full flex items-center px-3 border border-slate-100">
                      <div className="w-4 h-4 rounded-full bg-rose-200"></div>
                      <div className="w-16 h-2 bg-slate-200 rounded-full ml-3"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating decor - right */}
              <div className="absolute -right-32 top-24 hidden xl:block animate-float" style={{ animationDelay: '2s' }}>
                <div className="bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 w-64 rotate-[4deg]">
                  <div className="flex gap-3 mb-4 items-center">
                    <div className="h-8 w-8 rounded-lg bg-brand-purple/10 flex items-center justify-center text-brand-purple font-bold text-xs">AI</div>
                    <div className="space-y-1.5 flex-1">
                      <div className="h-2 w-full bg-slate-200 rounded-full"></div>
                      <div className="h-2 w-2/3 bg-slate-100 rounded-full"></div>
                    </div>
                  </div>
                  <div className="h-28 bg-slate-50 border border-slate-100 rounded-xl w-full relative overflow-hidden">
                     <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-brand-purple/10 to-transparent"></div>
                  </div>
                </div>
              </div>

              <div id="upload-section" className="relative z-10 w-full shadow-2xl shadow-brand-purple/10 rounded-3xl bg-white/50 backdrop-blur-3xl p-2 border border-slate-200/60 ring-1 ring-white/50">
                <SopInputForm onSubmit={handleSopSubmit} />
              </div>
            </div>
            
            {/* Social Icons matching design */}
            <div className="flex gap-6 mt-16 justify-center flex-wrap max-w-2xl mx-auto opacity-70">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-14 h-14 bg-white rounded-2xl shadow-md border border-slate-100 flex items-center justify-center text-slate-400 hover:text-brand-purple hover:-translate-y-1 transition-all cursor-pointer">
                    <div className="w-6 h-6 bg-slate-200 rounded-md"></div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="w-full max-w-4xl pt-12">
            <LoadingState />
          </div>
        )}

        {trainingData && !isLoading && (
          <div className="w-full max-w-4xl flex flex-col gap-6 pt-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-display font-bold text-lg text-slate-800">Generated Module</h3>
              <button 
                onClick={handleReset}
                className="text-sm font-medium text-white bg-brand-dark hover:bg-slate-800 transition-colors px-5 py-2 rounded-xl shadow-md"
              >
                Start Over
              </button>
            </div>
            
            <TrainingSteps summary={trainingData.summary} steps={trainingData.steps} />
            <QuizWidget quiz={trainingData.quiz} />
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default App;
