import React, { useState } from 'react';
import { Chapter } from '../types';
import { useGame } from '../context/GameContext';
import { PerspectiveBadge } from './PerspectiveBadge';
import { TypewriterText } from './TypewriterText';
import { ArrowLeft, CheckCircle2, Code2, HelpCircle, MessageSquare, ExternalLink, Save, ArrowRight, ShieldAlert, FileText, Scale } from 'lucide-react';

interface Props {
  chapter: Chapter;
  onBack: () => void;
  onSelectChapter: (id: number) => void;
}

export const ChapterViewer: React.FC<Props> = ({ chapter, onBack, onSelectChapter }) => {
  const { profile, completeChapter, recordDilemmaDecision, saveReflection, saveNote } = useGame();

  const [code, setCode] = useState(chapter.initialCode || '');
  const [reflectionText, setReflectionText] = useState(profile.reflections[chapter.id] || '');
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizSuccess, setQuizSuccess] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const selectedDilemma = profile.dilemmaDecisions[chapter.id];

  const handleDilemmaClick = (idx: number, bonusXp: number) => {
    recordDilemmaDecision(chapter.id, idx, bonusXp);
  };

  const handleQuizAnswer = (idx: number, isCorrect: boolean) => {
    setSelectedQuizIndex(idx);
    setQuizAnswered(true);
    if (isCorrect) {
      setQuizSuccess(true);
      completeChapter(chapter.id, chapter.xpReward);
    } else {
      setQuizSuccess(false);
      setTimeout(() => {
        setQuizAnswered(false);
        setSelectedQuizIndex(null);
      }, 2000);
    }
  };

  const handleSaveReflection = () => {
    saveReflection(chapter.id, reflectionText);
    saveNote(chapter.id, code);
    setSaveStatus('Erfolgreich gespeichert!');
    setTimeout(() => setSaveStatus(null), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
      
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-bold transition"
        >
          <ArrowLeft className="w-4 h-4" /> Zurück zum Hauptquartier
        </button>

        <PerspectiveBadge perspective={chapter.perspective} />
      </div>

      {/* Chapter Title Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        <div>
          <div className="text-xs uppercase font-extrabold tracking-widest text-indigo-400 mb-1">
            {chapter.category} • KAPITEL {chapter.id}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {chapter.title}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-1">
            {chapter.subtitle}
          </p>
        </div>

        {/* Secret Dossier Background Lore Card */}
        {chapter.dossierLore && (
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-start gap-3 text-xs text-slate-300">
            <FileText className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-cyan-300 uppercase tracking-wider font-mono block mb-1">📁 GEHEIM-DOSSIER DER KOMMISSION</strong>
              <p>{chapter.dossierLore}</p>
            </div>
          </div>
        )}

        {/* Hero Image if present */}
        {chapter.image && (
          <div className="h-56 sm:h-72 w-full rounded-2xl overflow-hidden border border-slate-800 relative">
            <img src={chapter.image} alt={chapter.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          </div>
        )}

        {/* Audio Briefing / Story Dialog in Typewriter Style */}
        <div>
          <TypewriterText lines={chapter.storyDialogue} />
        </div>

        {/* MORAL DILEMMA DECISION SECTION */}
        {chapter.dilemmaChoice && (
          <div className="space-y-4 pt-4 border-t border-slate-800 bg-indigo-950/30 p-6 rounded-2xl border border-indigo-500/30">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <Scale className="w-5 h-5 text-yellow-400" /> Ethische Dilemma-Entscheidung
            </h3>
            <p className="text-sm font-semibold text-white">{chapter.dilemmaChoice.prompt}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {chapter.dilemmaChoice.options.map((opt, idx) => {
                const isChosen = selectedDilemma === idx;
                return (
                  <button
                    key={idx}
                    disabled={selectedDilemma !== undefined}
                    onClick={() => handleDilemmaClick(idx, opt.xpBonus)}
                    className={`text-left p-4 rounded-xl border text-xs transition flex flex-col justify-between ${
                      isChosen 
                        ? 'bg-indigo-600/30 border-indigo-400 text-white font-bold shadow-lg' 
                        : selectedDilemma !== undefined 
                        ? 'bg-slate-950/40 border-slate-800 text-slate-500' 
                        : 'bg-slate-900 border-slate-800 hover:border-indigo-500 text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-cyan-300 mb-1">{opt.label}</div>
                      <div className="text-slate-400 mb-2">{opt.stance}</div>
                    </div>
                    <div className="pt-2 border-t border-slate-800/60 font-mono text-[11px] text-emerald-400">
                      Konsequenz: {opt.consequence} (+{opt.xpBonus} Bonus-XP)
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Interactive HTML Code Playground if task exists */}
        {chapter.initialCode && (
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                <Code2 className="w-5 h-5" /> HTML-Praxisauftrag
              </h3>
              <span className="text-xs text-slate-400 font-mono">Live-Vorschau</span>
            </div>
            <p className="text-sm text-slate-300">{chapter.taskInstruction}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden p-1">
              <div>
                <div className="bg-slate-900 px-3 py-1.5 text-xs font-mono text-slate-400 border-b border-slate-800">
                  HTML-Editor
                </div>
                <textarea
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className="w-full h-48 bg-transparent p-3 font-mono text-sm text-cyan-300 outline-none resize-none"
                  spellCheck={false}
                />
              </div>

              <div>
                <div className="bg-slate-900 px-3 py-1.5 text-xs font-mono text-slate-400 border-b border-slate-800">
                  Ergebnis (Browser-Preview)
                </div>
                <div 
                  className="w-full h-48 bg-slate-100 text-slate-900 p-3 overflow-y-auto font-sans rounded-b-xl text-sm"
                  dangerouslySetInnerHTML={{ __html: code }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Student Reflection Input */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h3 className="text-base font-bold text-yellow-300 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" /> Reflexions-Auftrag
          </h3>
          <p className="text-sm text-slate-300">{chapter.reflectionPrompt}</p>

          <textarea
            value={reflectionText}
            onChange={e => setReflectionText(e.target.value)}
            placeholder="Schreibe hier deine Gedanken und ethische Begründung hinein..."
            className="w-full h-32 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl p-3 text-sm text-slate-200 outline-none resize-none transition"
          />

          <div className="flex justify-between items-center">
            <button
              onClick={handleSaveReflection}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg"
            >
              <Save className="w-4 h-4" /> Reflexion & Code speichern
            </button>
            {saveStatus && <span className="text-xs font-bold text-emerald-400 animate-pulse">{saveStatus}</span>}
          </div>
        </div>

        {/* Interactive Quiz Section */}
        <div className="space-y-4 pt-4 border-t border-slate-800 bg-slate-950/50 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" /> Wissens-Überprüfung
          </h3>
          <p className="text-sm font-semibold text-white">{chapter.quiz.question}</p>

          <div className="space-y-2">
            {chapter.quiz.options.map((opt, idx) => {
              const isSelected = selectedQuizIndex === idx;
              return (
                <button
                  key={idx}
                  disabled={quizAnswered && quizSuccess}
                  onClick={() => handleQuizAnswer(idx, opt.correct)}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition flex justify-between items-center ${
                    isSelected && quizSuccess
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                      : isSelected && !quizSuccess
                      ? 'bg-red-500/20 border-red-500 text-red-300'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-200'
                  }`}
                >
                  <span>{opt.text}</span>
                  {isSelected && quizSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                </button>
              );
            })}
          </div>

          {quizAnswered && (
            <div className={`p-4 rounded-xl text-xs font-bold border ${quizSuccess ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300' : 'bg-red-500/10 border-red-500/40 text-red-300'}`}>
              {quizSuccess ? `✅ Richtig! +${chapter.xpReward} XP freigeschaltet! ${chapter.quiz.explanation}` : '❌ Nicht ganz. Versuch es noch einmal!'}
            </div>
          )}
        </div>

        {/* Microsoft Teams / OneNote Integration Links */}
        {(chapter.teamsLink || chapter.oneNoteLink) && (
          <div className="p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs text-indigo-200">
            <span>📚 Unterrichtsmaterialien & Kursraum:</span>
            <div className="flex gap-2">
              {chapter.teamsLink && (
                <a href={chapter.teamsLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 rounded-lg text-white border border-indigo-500/40 transition">
                  Teams Aufgabe <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {chapter.oneNoteLink && (
                <a href={chapter.oneNoteLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg text-white border border-purple-500/40 transition">
                  OneNote Kursheft <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-slate-800">
          <button 
            disabled={chapter.id <= 1}
            onClick={() => onSelectChapter(chapter.id - 1)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold disabled:opacity-40"
          >
            ← Vorheriges Kapitel
          </button>

          {chapter.id < 20 ? (
            <button 
              onClick={() => onSelectChapter(chapter.id + 1)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl transition"
            >
              Nächstes Kapitel <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-sm shadow-xl transition"
            >
              🎓 Kurs abgeschlossen! Zurück zum HQ
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
