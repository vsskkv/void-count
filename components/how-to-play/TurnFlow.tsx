import React from "react";

export const TurnFlow = () => {
  const steps = [
    { num: "1", title: "Start Turn", desc: "Check your hand" },
    { num: "2", title: "Action", desc: "Play or Pick up" },
    { num: "3", title: "Resolve", desc: "Effect happens" },
    { num: "4", title: "Draw", desc: "If required" },
    { num: "5", title: "Next", desc: "Round continues" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tight text-center mb-8">
        The <span className="text-indigo-500">Turn Flow</span>
      </h2>
      <div className="flex flex-wrap justify-center gap-4 md:gap-2">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center text-center w-28 sm:w-32">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black mb-3 shadow-[0_0_15px_rgba(79,70,229,0.4)]">
                {step.num}
              </div>
              <h3 className="text-sm font-black text-white uppercase tracking-tighter mb-1">
                {step.title}
              </h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                {step.desc}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden md:flex items-center pt-5 px-1">
                <div className="w-8 h-px bg-slate-800" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};


