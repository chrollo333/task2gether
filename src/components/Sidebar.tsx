"use client";

import { useState } from "react";
import { push, ref, set, onValue } from "firebase/database";
import { db, auth } from "@/lib/firebase";
import { useEffect } from "react";
import type { Project } from "@/types";

export default function Sidebar() {
  const [projects, setProjects] = useState<Project[]>([]);
  const userId = auth.currentUser?.uid;
  const [user, setUser] = useState(auth.currentUser);
  const [isCreating, setIsCreating] = useState(false); //will be used for creating new projects
  const [newProjectTitle, setNewProjectTitle] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      setProjects([]);
      return;
    }
    const projectsRef = ref(db, "projects");
    const unsubscribe = onValue((projectsRef), (snapshot) => {
      const data = snapshot.val();
      const userProjects = [];



      if (!data) {
        setProjects([]);
        return;
      }
      for (const key in data) {
        if (data[key].userUid === user.uid) {
          userProjects.push({
            id: key,
            name: data[key].name,
            ownerUid: data[key].userUid,
            createdAt: data[key].createdAt,
          });
        }
      }
      setProjects(userProjects);
    });
    return () => unsubscribe();
  }, [user]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = newProjectTitle.trim();
    if (!title || !user) return;

    try {
      const projectsRef = ref(db, "projects");
      const newProjectRef = push(projectsRef);

      await set(newProjectRef, {
        name: newProjectTitle,
        userUid: user.uid,
        createdAt: Date.now(),
      });

      setProjects((prev) => [
        ...prev,
        {
          id: newProjectRef.key!,
          name: title,
          ownerUid: user.uid,
          createdAt: Date.now(),
        },
      ]);
      console.log("Creating new project:", newProjectTitle);
    } catch (error) {
      console.error("Error creating project:", error);
    }
    setNewProjectTitle("");
    setIsCreating(false);
  };

  return (
    <aside className="w-64 bg-zinc-100 border-r border-zinc-200 flex flex-col">
      <div className="p-6 border-b border-zinc-200">
        <h1 className="text-xl font-bold text-zinc-800">Task2Gether</h1>
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
            Your Boards
          </h2>
          <button
            onClick={() => setIsCreating(true)}
            className="text-2xl text-zinc-600 hover:text-zinc-800"
          >
            +
          </button>
        </div>

        {isCreating && (
          <form onSubmit={handleCreateProject} className="mb-4">
            <input
              type="text"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
              placeholder="Project Title..."
              autoFocus
              className="w-full px-3 py-2 text-sm border border-zinc-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-zinc-600 text-zinc-600"
            />
            <div className="mt-2 flex gap-2">
              <button
                type="submit"
                className="px-3 py-1 text-sm bg-zinc-800 text-white rounded hover:bg-zinc-900"
              >
                Create
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setNewProjectTitle("");
                }}
                className="px-3 py-1 text-sm text-zinc-600 hover:text-zinc-800"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <nav className="space-y-1">
          {projects.length === 0 ? (
            <p className="text-sm text-zinc-500">No boards yet. Create one!</p>
          ) : (
            projects.map((project) => (
              <button
                key={project.id}
                className="w-full text-left px-3 py-2 text-zinc-700 rounded hover:bg-zinc-200 transition"
                //will add onClick={() => selectBoard(board.id)}   when firebase is integrated
              >
                {project.name}
              </button>
            ))
          )}
        </nav>
      </div>
    </aside>
  );
}
