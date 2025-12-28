
const CalendarWidget = ({ expanded, onToggle }) => {
    const date = new Date();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });

    return (
        <>
            {/* Wall Calendar Object */}
            <div
                onClick={onToggle}
                className={`absolute top-[25%] right-[20%] w-20 h-24 bg-white rounded-lg shadow-xl cursor-pointer hover:scale-105 transition-transform flex flex-col items-center overflow-hidden border border-stone-200 z-30 group ${expanded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                {/* Red Header */}
                <div className="w-full h-8 bg-red-500 flex items-center justify-center text-white text-xs font-bold tracking-widest uppercase">
                    {month}
                </div>
                {/* Date Body */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-stone-800 leading-none">{dayNum}</span>
                    <span className="text-[10px] text-stone-400 uppercase mt-1">{dayName}</span>
                </div>
                {/* "Paper" folds/shadows */}
                <div className="absolute bottom-0 w-full h-1 bg-stone-100" />
            </div>

            {/* Expanded Overlay view */}
            {expanded && (
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-white rounded-xl shadow-2xl z-[60] overflow-hidden animate-pop-in border-4 border-[#5D4037]"
                >
                    <div className="bg-red-500 p-4 text-white flex justify-between items-center">
                        <h3 className="font-serif text-xl">Calendar</h3>
                        <button onClick={onToggle} className="hover:bg-red-600 rounded-full p-1"><span className="text-white text-lg">✕</span></button>
                    </div>
                    <div className="p-6 grid grid-cols-7 gap-2 text-center text-sm font-sans text-[#5D4037]">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="font-bold opacity-50">{d}</div>)}
                        {/* Fake Days Grid */}
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div key={i} className={`p-2 rounded hover:bg-stone-100 ${i + 1 === dayNum ? 'bg-red-100 text-red-600 font-bold' : ''}`}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                    {/* Todo List Stub */}
                    <div className="px-6 pb-6 border-t border-stone-100 pt-4">
                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wide mb-2">Today's Tasks</h4>
                        <div className="space-y-2 text-sm text-[#5D4037]">
                            <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-stone-300 rounded-sm" /> <span>Feed Mochi</span></div>
                            <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-stone-300 rounded-sm" /> <span>Check Emails</span></div>
                            <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-stone-300 rounded-sm" /> <span>Relax</span></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Click outside backdrop for expanded state */}
            {expanded && <div className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-[1px]" onClick={onToggle} />}
        </>
    );
};
