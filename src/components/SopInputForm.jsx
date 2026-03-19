import React, { useState, useRef } from 'react';
import { Sparkles, UploadCloud, FileText } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf.mjs';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
import mammoth from 'mammoth';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const SopInputForm = ({ onSubmit }) => {
  const [text, setText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      onSubmit(text);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Only reset if we're leaving the main container, not its children
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
    // Reset input so the same file can be uploaded again if needed
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
  };

  const processFile = async (file) => {
    // text files
    if (file.type.match('text.*') || file.name.endsWith('.md') || file.name.endsWith('.csv')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
      };
      reader.onerror = () => {
        alert('Error reading file. Please try again.');
      };
      reader.readAsText(file);
      return;
    }

    // pdf files
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(' ');
          fullText += pageText + '\n';
        }
        setText(fullText);
      } catch (error) {
        console.error('Error reading PDF:', error);
        alert('Error reading PDF file. Please try again.');
      }
      return;
    }

    // word files
    if (
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.name.endsWith('.docx')
    ) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setText(result.value);
      } catch (error) {
        console.error('Error reading Word document:', error);
        alert('Error reading Word document. Please try again.');
      }
      return;
    }

    alert('Please upload a text, PDF, or Word (.docx) file.');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[22px] shadow-sm border border-slate-100 flex flex-col h-full w-full relative overflow-hidden">
      {/* Subtle top decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-light via-brand-purple to-brand-light opacity-60"></div>
      
      <div className="mb-6 text-left">
        <h3 className="text-xl font-display font-bold text-slate-800 mb-1">Create Training Module</h3>
        <p className="text-sm text-slate-500">
          Paste your SOP or drop a text/PDF/Word document below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
        <div 
          className={`relative flex flex-col w-full h-64 border-2 rounded-xl transition-all ${
            isDragging 
              ? 'border-brand-purple bg-brand-purple/5 border-dashed scale-[1.01]' 
              : 'border-slate-200 bg-slate-50/50 border-solid hover:border-slate-300'
          }`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt,.md,.csv,.pdf,.docx,text/plain,text/markdown,text/csv,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="hidden"
          />
          
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button
              type="button"
              onClick={triggerFileInput}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 hover:text-brand-purple transition-colors focus:ring-2 focus:ring-brand-purple/50 focus:outline-none"
            >
              <UploadCloud className="w-4 h-4" />
              Upload File
            </button>
          </div>

          <label htmlFor="sopText" className="sr-only">SOP Content</label>
          <textarea
            id="sopText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your raw SOP content here, or drag & drop a document (text/PDF/Word)..."
            className="flex-1 w-full p-5 pt-16 sm:pt-5 text-slate-700 bg-transparent border-none rounded-xl focus:ring-0 focus:outline-none resize-none z-0 placeholder:text-slate-400 font-sans"
            required
            minLength={10}
          />
          
          {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/90 rounded-xl backdrop-blur-sm z-20 pointer-events-none border-2 border-brand-purple border-dashed">
              <div className="flex flex-col items-center text-brand-purple">
                <FileText className="w-12 h-12 mb-3 animate-bounce shadow-brand-purple/20 drop-shadow-lg" />
                <p className="text-lg font-display font-semibold">Drop document here</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-3">
          <button
            type="submit"
            disabled={text.trim().length < 10}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-white bg-brand-purple hover:bg-[#5b3ce0] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold transition-all shadow-lg shadow-brand-purple/20 hover:shadow-brand-purple/40 hover:-translate-y-0.5"
          >
            <Sparkles className="w-5 h-5" />
            Generate Magic
          </button>
        </div>
      </form>
    </div>
  );
};

export default SopInputForm;
