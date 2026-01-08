import React, { useState, useEffect } from 'react';
import { CheckCircle, Calendar as CalIcon, Sparkles, Trophy, Flame, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

export default function App() {
  const [checkIns, setCheckIns] = useState([]);
  const [quote, setQuote] = useState("今天的努力，是明天強大的基礎。");

  useEffect(() => {
    const saved = localStorage.getItem('fitness-pro-data');
    if (saved) setCheckIns(JSON.parse(saved));
    const tips = [
      "深蹲能分泌更多生長激素，今天練腿嗎？",
      "喝水能提升 3% 的代謝，現在就喝一口吧！",
      "肌肉是在休息時長的，今晚請睡滿 8 小時。",
      "完成比完美更重要，動起來就對了！"
    ];
    setQuote(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  useEffect(() => {
    localStorage.setItem('fitness-pro-data', JSON.stringify(checkIns));
  }, [checkIns]);

  const toggleCheckIn = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    if (checkIns.includes(today)) {
      setCheckIns(checkIns.filter(d => d !== today));
    } else {
      setCheckIns([...checkIns, today]);
    }
  };

  const days = eachDayOfInterval({ start: startOfMonth(new Date()), end: endOfMonth(new Date()) });

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-200 pb-32 font-sans selection:bg-indigo-500/30">
      {/* 背景裝飾 */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-md mx-auto px-6">
        {/* Header */}
        <header className="pt-10 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">健身日記</h1>
            <p className="text-slate-500 text-sm mt-1">建立你的鋼鐵意志</p>
          </div>
          <div className="w-12 h-12 bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center shadow-inner">
            <Trophy className="text-yellow-500" size={24} />
          </div>
        </header>

        {/* AI 卡片 (亮點功能) */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] p-6 shadow-2xl shadow-indigo-500/20 mb-8">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3 bg-white/10 w-fit px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
              <Sparkles size={14} className="text-yellow-300" />
              <span className="text-xs font-bold tracking-wider text-white">AI 每日動力</span>
            </div>
            <p className="text-lg font-medium text-white leading-relaxed italic">"{quote}"</p>
          </div>
          <Sparkles className="absolute right-[-10px] bottom-[-10px] text-white/10 w-32 h-32" />
        </div>

        {/* 數據統計 */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-xl p-5 rounded-[1.5rem] border border-slate-700/50">
            <div className="bg-orange-500/10 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <Flame className="text-orange-500" size={20} />
            </div>
            <div className="text-2xl font-black text-white">{checkIns.length}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">累計打卡</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl p-5 rounded-[1.5rem] border border-slate-700/50">
            <div className="bg-emerald-500/10 w-10 h-10 rounded-xl flex items-center justify-center mb-3">
              <CheckCircle className="text-emerald-500" size={20} />
            </div>
            <div className="text-2xl font-black text-white">{checkIns.includes(format(new Date(), 'yyyy-MM-dd')) ? '100%' : '0%'}</div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">今日進度</div>
          </div>
        </div>

        {/* 日曆區塊 */}
        <div className="bg-slate-800/30 backdrop-blur-md rounded-[2rem] p-6 border border-slate-700/30 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 font-bold text-lg">
              <CalIcon size={20} className="text-indigo-400" />
              {format(new Date(), 'MMMM yyyy')}
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-3 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
              <div key={d} className="text-[10px] font-black text-slate-600 uppercase">{d}</div>
            ))}
            {days.map(day => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const isChecked = checkIns.includes(dateStr);
              const isToday = isSameDay(day, new Date());
              return (
                <div 
                  key={dateStr} 
                  className={`h-10 w-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all duration-300
                    ${isChecked 
                      ? 'bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-500/40 scale-110' 
                      : 'bg-slate-800 text-slate-500 border border-slate-700/50'}
                    ${isToday && !isChecked ? 'border-2 border-indigo-500 text-indigo-400' : ''}
                  `}
                >
                  {format(day, 'd')}
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部按鈕 */}
        <div className="fixed bottom-8 left-0 right-0 px-8">
          <button 
            onClick={toggleCheckIn} 
            className={`w-full py-5 rounded-2xl font-black text-lg shadow-2xl transform transition-all active:scale-95 flex items-center justify-center gap-3
              ${checkIns.includes(format(new Date(), 'yyyy-MM-dd')) 
                ? 'bg-slate-800 text-slate-400 border border-slate-700' 
                : 'bg-white text-slate-900 shadow-white/10 hover:bg-indigo-50'}`}
          >
            {checkIns.includes(format(new Date(), 'yyyy-MM-dd')) ? (
              '今天已自律'
            ) : (
              <>立即打卡 <ChevronRight size={20} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}