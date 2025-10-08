// @ts-nocheck
import * as postService from "../services/postService.js";

export async function criar(req, res) {
  try {
    const novoPost = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      chamadaNoticia: req.body.chamadaNoticia,
      data: req.body.data || new Date().toISOString(),
      imagem: req.body.imagem,
      post: req.body.post,
      autor: req.body.autor,
      tags: req.body.tags || [],
      destaque: req.body.destaque || false,
    };

    const result = await postService.criarPost(novoPost);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const listar = async (req, res) => {
  try {
    const { lastDocId } = req.query;
    let startAfterDoc = null;

    if (lastDocId) {
      try {
        // usa o service para pegar o documento de referência
        const db = (await import("../services/firebaseService.js")).default;
        const docSnap = await db.collection("posts").doc(lastDocId).get();

        if (docSnap.exists) {
          startAfterDoc = docSnap;
        } else {
          console.warn("Documento não encontrado para lastDocId:", lastDocId);
        }
      } catch (err) {
        console.error("Erro ao buscar lastDocId:", err);
      }
    }

    const { posts, lastDoc } = await postService.listarPosts({
      limite: 6,
      startAfterDoc,
    });

    // 🔑 responde no formato que o front espera (array simples + lastDocId)
    res.json({
      posts,
      lastDocId: lastDoc ? lastDoc.id : null,
    });
  } catch (err) {
    console.error("Erro ao listar posts:", err);
    res.status(500).json({ error: "Erro ao listar posts" });
  }
};


export async function obter(req, res) {
  try {
    const post = await postService.obterPost(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

export async function atualizar(req, res) {
  try {
    const atualizado = await postService.atualizarPost(req.params.id, req.body);
    res.json(atualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deletar(req, res) {
  try {
    const result = await postService.deletarPost(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}