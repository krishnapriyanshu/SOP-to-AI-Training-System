import React from 'react';
import { CheckCircle2, ChevronRight } from 'lucide-react';

const TrainingSteps = ({ summary, steps }) => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 mb-8">
      <div className="mb-8 p-5 bg-blue-50 border border-blue-100 rounded-xl">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Module Summary</h3>
        <p className="text-blue-800 leading-relaxed text-sm md:text-base">
          {summary}
        </p>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-6">Step-by-Step Training</h3>
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={step.id} className="relative pl-8 md:pl-0">
            {/* Timeline connector (hidden on mobile, shown on desktop) */}
            {index !== steps.length - 1 && (
              <div className="absolute left-[15px] top-10 bottom-[-24px] w-0.5 bg-slate-200 md:hidden"></div>
            )}
            
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
              <div className="absolute left-0 right-auto md:relative flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold border-2 border-white shadow-sm z-10">
                {index + 1}
              </div>
              
              <div className="md:w-full p-5 bg-slate-50 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                <h4 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h4>
                <p className="text-slate-600 mb-4 text-sm">{step.description}</p>
                
                <ul className="space-y-2">
                  {step.keyPoints.map((point, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingSteps;
