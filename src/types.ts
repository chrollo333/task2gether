interface Project {
  id: string;              // Firebase key (string, not null after creation)
  name: string;            // or 'title' — match what you save in DB
  ownerUid: string;         // the user's UID
  createdAt: number;        // timestamp
}

export type { Project };