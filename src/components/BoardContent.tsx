"use client"

import { useSelectedBoardStore } from "@/store/selectedBoard"
import { useState } from "react";
import { push, ref, set } from "firebase/database";
import { db } from "@/lib/firebase";

export default function BoardContent() {
    const { selectedBoardId, selectedBoardName } = useSelectedBoardStore();
    const [isAddingColumn, setIsAddingColumn] = useState(false);
    const [ newColumnName, setNewColumnName ] = useState("");

    const handleAddColumn = async (e: React.FormEvent) => {
      e.preventDefault();
      const name = newColumnName.trim();
      if (!name || !selectedBoardId) return;

      try {
        const columnsRef = ref(db, `columns`);
        const newColumnRef = push(columnsRef);

        await set(newColumnRef, {
          boardId: selectedBoardId,
          name: name,
          createdAt: Date.now(),
          tasksOrder: [], // for future task IDs
        });

        console.log("Column added: ", name);
        
      } catch (error) {
        console.error("Error adding column: ", error);
      }

      setNewColumnName("");
      setIsAddingColumn(false);
    };

    return (
        <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">  
          {!isAddingColumn ? (
            <button
              onClick={() => setIsAddingColumn(true)}
              className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              + Add Column
            </button>
          ) : (
            <form
              onSubmit={handleAddColumn}
              className="mt-6 bg-white p-4 rounded-lg border border-zinc-200 shadow-sm"
            >
              <input
                type="text"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                placeholder="Column name... (e.g., To Do, in Progress)"
                autoFocus
                className="w-full px-3 py-2 border border-zinc-300 rounded mb-3 focus:outline-none focus:ring-2 focus:ring-zinc-600 text-zinc-700"
                />
                <div className="flex gap-3">
                  <button 
                  type="submit"
                  className="px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-900"
                  >
                    Add
                  </button>
                  <button
                  type="button"
                  onClick={() => {
                    setIsAddingColumn(false);
                    setNewColumnName("");
                  }}
                  className="px-4 py-2 text-zinc-600 hover:text-zinc-800">
                    Cancel
                  </button>
                </div>
            </form>
          )}
          { selectedBoardId && selectedBoardName ? (
            <div className="max-w-4xl mx-auto">
              <h2 className="text3xl font-bold text-zinc-800 mb-4">
                {selectedBoardName}
                </h2>
                <p className="text-zinc-600">
                  No columns to work with yet. Start by adding your first column!
                </p>
            </div>
          ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold text-zinc-800 mb-4">
              Welcome to your Dashboard!
            </h1>
            <p className="text-xl text-zinc-600">
              Start by creating your first project.
            </p>
          </div>
          )}
        </main>
    );
    }
