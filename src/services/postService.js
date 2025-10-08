// @ts-nocheck
import db from "./firebaseService.js";

const collection = db.collection("posts");

export async function criarPost(data) {
  const docRef = await collection.add(data);
  return { id: docRef.id, ...data }
}

// @ts-nocheck
export async function listarPosts({ limite = 6, startAfterDoc = null } = {}) {
  // Criamos a query ordenando pelo campo 'data' decrescente, que é nossa referência temporal
  let query = collection.orderBy("data", "desc").limit(limite);

  // Se recebemos um documento de referência (lastDoc), continuamos a paginação a partir dele
  if (startAfterDoc) {
    query = query.startAfter(startAfterDoc);
  }

  // Pegamos o snapshot da query
  const snapshot = await query.get();

  // Transformamos os documentos em array de posts com id
  const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Guardamos o último documento para usar como cursor na próxima requisição
  const lastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null;

  return { posts, lastDoc };
}

export async function obterPost(id) {
  const doc = await collection.doc(id).get();
  if(!doc) throw new Error("Post não encontrado!")
  return { id: doc.id, ...doc.data() }
}

export async function atualizarPost(id, data) {
  await collection.doc(id).update(data);
  return obterPost(id);
}

export async function deletarPost(id) {
  await collection.doc(id).delete();
  return { message: "Post deletado com sucesso" };
}
