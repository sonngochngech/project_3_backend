import { ChromaClient } from "chromadb";
const chromaClient = new ChromaClient({ path: "http://localhost:8000" });

export {chromaClient}
