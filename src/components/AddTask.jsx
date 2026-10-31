import React, { memo, useState } from "react";

const AddTask = memo(({ initialValue = "", handleSaveClick, handleCloseClick, edit = false }) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const [error, setError] = useState("");

  const onSave = () => {
    const value = inputValue.trim();
    if (!value) {
      setError("Please enter an action.");
      return;
    }
    handleSaveClick(value);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) handleCloseClick(); }}>
      <div role="dialog" aria-modal="true" aria-labelledby="action-modal-title" className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-800">
          <div>
            <h2 id="action-modal-title" className="text-xl font-bold text-slate-800 dark:text-slate-100">{edit ? "Edit Action" : "Create Action"}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{edit ? "Update your action item." : "Add a new item to your action plan."}</p>
          </div>
          <button onClick={handleCloseClick} className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-red-50 hover:text-red-500 dark:bg-slate-800 dark:text-slate-400" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-6">
          <label htmlFor="action" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300">Action</label>
          <input
            autoFocus
            type="text"
            id="action"
            name="action"
            placeholder="e.g. Complete React project"
            value={inputValue}
            onChange={(event) => { setInputValue(event.target.value); if (event.target.value.trim()) setError(""); }}
            onKeyDown={(event) => { if (event.key === "Enter") onSave(); }}
            className={`h-12 w-full rounded-xl border bg-slate-50 px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:bg-slate-800 ${error ? "border-red-300 focus:border-red-400 focus:ring-red-100 dark:focus:ring-red-500/10" : "border-slate-200 focus:border-orange-400 focus:ring-orange-100 dark:focus:ring-orange-500/10"}`}
          />
          {error && <p role="alert" className="mt-2 text-sm text-red-500">{error}</p>}
          <div className="mt-7 flex justify-end gap-3">
            <button onClick={handleCloseClick} className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">Cancel</button>
            <button onClick={onSave} className="rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600 hover:shadow-orange-300 active:scale-95 dark:shadow-black/20">{edit ? "Update Action" : "Save Action"}</button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AddTask;
