import axios from 'axios';

// Backend base URL for orchids (from .env: VITE_API_URL)
const BASE_URL = import.meta.env.VITE_API_URL;

// ---------- 1. Get all orchids ----------
// GET /api/orchids
// Returns: array of orchids, sorted by id (newest first)
export async function fetchOrchids() {
  const response = await axios.get(BASE_URL);
  const orchidList = response.data;

  orchidList.sort((a, b) => {
    const idA = parseInt(a.orchidID, 10);
    const idB = parseInt(b.orchidID, 10);
    return idB - idA; // newest first
  });

  return orchidList;
}

// ---------- 2. Add new orchid ----------
// POST /api/orchids
// Sends: orchidName, orchidUrl, orchidDescription, category (object with categoryID), isNatural
export async function addOrchid(data) {
  const body = {
    orchidName: data.orchidName,
    orchidUrl: data.orchidUrl,
    orchidDescription: data.orchidDescription || null,
    category: data.categoryID ? { categoryID: Number(data.categoryID) } : null,
    isNatural: data.isNatural ?? false,
  };

  await axios.post(BASE_URL, body, {
    headers: { 'Content-Type': 'application/json' },
  });
}

// ---------- 3. Delete orchid ----------
// DELETE /api/orchids/{orchidID}
export async function deleteOrchid(orchidID) {
  const url = `${BASE_URL}/${orchidID}`;
  await axios.delete(url);
}

// ---------- 4. Get one orchid by id (for Edit page) ----------
// GET /api/orchids/{orchidID}
// Returns: one orchid object
export async function getOrchidById(orchidID) {
  const url = `${BASE_URL}/${orchidID}`;
  const response = await axios.get(url);
  return response.data;
}

// ---------- 5. Update orchid (for Edit page) ----------
// PUT /api/orchids/{orchidID}
// Sends: orchidName, orchidUrl, orchidDescription, category (object with categoryID), isNatural
export async function updateOrchid(orchidID, data) {
  const url = `${BASE_URL}/${orchidID}`;
  const body = {
    orchidName: data.orchidName,
    orchidUrl: data.orchidUrl,
    orchidDescription: data.orchidDescription || null,
    category: data.categoryID ? { categoryID: Number(data.categoryID) } : null,
    isNatural: data.isNatural ?? false,
  };
  const response = await axios.put(url, body, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
}
