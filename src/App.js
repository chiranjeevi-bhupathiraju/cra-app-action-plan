import { useDeferredValue, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import { addAction, deleteAction, editAction } from "./slices/todoSlice";

const App = () => {
  const actions = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const deferredActions = useDeferredValue(actions);
  const [taskId, setTaskId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("action-plan-theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });
  const editingAction = actions.find((action) => action.id === taskId) || null;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("action-plan-theme", isDark ? "dark" : "light");
  }, [isDark]);

  console.log(actions, "aacc");
  const handleAddClick = () => {
    setTaskId(null);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteAction(id));
  };

  const handleEdit = (id) => {
    setTaskId(id);
    setShowModal(true);
  };

  const handleCloseClick = () => {
    setShowModal(false);
    setTaskId(null);
  };

  const handleSaveClick = (desc) => {
    if (taskId) {
      dispatch(editAction({ id: taskId, desc }));
    } else {
      dispatch(addAction({ desc, id: crypto.randomUUID() }));
    }
    handleCloseClick();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-orange-50 px-4 py-10 font-sans antialiased transition-colors dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <button
        type="button"
        onClick={() => setIsDark((current) => !current)}
        className="fixed right-4 top-4 z-[60] flex h-11 w-11 items-center justify-center rounded-xl border border-white/70 bg-white/90 text-slate-700 shadow-lg backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 dark:border-slate-700 dark:bg-slate-800/95 dark:text-amber-300 dark:hover:bg-slate-700"
        aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
        title={`Switch to ${isDark ? "light" : "dark"} theme`}
      >
        {isDark ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
            <circle cx="12" cy="12" r="4" />
            <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6 8.5 8.5 0 1 0 20.4 15.2Z" />
          </svg>
        )}
      </button>
      <main className="mx-auto max-w-4xl">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-2xl shadow-slate-200/60 backdrop-blur dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-black/30">
          <header className="border-b border-slate-200 bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-8 text-white sm:px-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-orange-100">
                  Productivity
                </p>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Action Plan
                </h1>
                <p className="mt-2 text-sm text-orange-50 sm:text-base">
                  Organize your actions and stay focused.
                </p>
              </div>
              <div className="flex h-20 w-20 items-center justify-center self-end rounded-2xl bg-white/20 shadow-inner backdrop-blur sm:self-auto">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold">{actions.length}</span>
                  <span className="text-xs text-orange-50">
                    {actions.length === 1 ? "Action" : "Actions"}
                  </span>
                </div>
              </div>
            </div>
          </header>

          <div className="p-6 sm:p-10">
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  Your Actions
                </h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Add and manage your action items.
                </p>
              </div>
              <button
                onClick={handleAddClick}
                className="group flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-300 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-orange-200 active:translate-y-0 dark:bg-orange-500 dark:shadow-black/20 dark:hover:bg-orange-400"
              >
                <span className="text-lg leading-none transition-transform group-hover:rotate-90">
                  +
                </span>
                Add Action
              </button>
            </div>

            {actions.length > 0 ? (
              <div className="space-y-3">
                {deferredActions.map((action, index) => (
                  <Task
                    key={action.id}
                    action={action}
                    index={index}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 px-6 text-center dark:border-slate-700 dark:bg-slate-800/50">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-3xl text-orange-600">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
                  No actions yet
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Start building your action plan by adding your first action
                  item.
                </p>
                <button
                  onClick={handleAddClick}
                  className="mt-5 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 transition hover:bg-orange-600 dark:shadow-black/20"
                >
                  Create your first action
                </button>
              </div>
            )}
          </div>

          <footer className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:px-10 dark:border-slate-800 dark:bg-slate-950/40">
            <p className="text-center text-xs text-slate-400 dark:text-slate-500">
              Stay consistent. Small actions create big results.
            </p>
          </footer>
        </section>
      </main>

      {showModal && (
        <AddTask
          key={taskId || "new-action"}
          initialValue={editingAction?.desc ?? ""}
          edit={Boolean(taskId)}
          handleCloseClick={handleCloseClick}
          handleSaveClick={handleSaveClick}
        />
      )}
    </div>
  );
};

export default App;
