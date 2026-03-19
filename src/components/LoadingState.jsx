import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm min-h-[400px]">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-6" />
      <h3 className="text-xl font-semibold text-slate-800 mb-2">Analyzing SOP...</h3>
      <p className="text-slate-500 max-w-sm text-center">
        We're breaking down your procedures into bite-sized training steps and generating interactive questions.
      </p>
      
      {/* Mock skeleton UI below for aesthetic reasons */}
      <div className="mt-12 w-full max-w-md space-y-4 animate-pulse opacity-50">
        <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6 mx-auto"></div>
      </div>
    </div>
  );
};

export default LoadingState;
