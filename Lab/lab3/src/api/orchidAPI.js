import axios from "axios";

const BASE_URL = "http://localhost:8080/orchids";

export async function getOrchids() {
  const res = await axios.get(BASE_URL);
  return res.data;
}

export async function getOrchidById(id) {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
}

export async function createOrchid(orchid) {
  const res = await axios.post(BASE_URL, orchid);
  return res.data;
}

export async function updateOrchid(id, orchid) {
  const res = await axios.put(`${BASE_URL}/${id}`, orchid);
  return res.data;
}

export async function deleteOrchid(id) {
  const res = await axios.delete(`${BASE_URL}/${id}`);
  return res.data;
}
