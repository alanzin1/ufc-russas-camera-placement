export default function dominante(grafo) {
  const { vertices, arestas } = grafo;

  const listaAdjacencia = {};

  vertices.forEach((vertice) => {
    listaAdjacencia[vertice.id] = new Set();
  });

  arestas.forEach((aresta) => {
    listaAdjacencia[aresta.origem].add(aresta.destino);
    listaAdjacencia[aresta.destino].add(aresta.origem);
  });

  const dominados = new Set();

  const cameras = [];

  const dominacao = {};

  while (dominados.size < vertices.length) {
    let melhorVertice = null;
    let melhorCobertura = [];

    for (const vertice of vertices) {
      const cobertura = [];

      if (!dominados.has(vertice.id)) cobertura.push(vertice.id);

      listaAdjacencia[vertice.id].forEach((vizinho) => {
        if (!dominados.has(vizinho)) cobertura.push(vizinho);
      });

      if (cobertura.length > melhorCobertura.length) {
        melhorCobertura = cobertura;
        melhorVertice = vertice.id;
      }
    }

    if (melhorVertice === null) break;

    cameras.push(melhorVertice);

    dominacao[melhorVertice] = [];

    dominados.add(melhorVertice);
    dominacao[melhorVertice].push(melhorVertice);

    listaAdjacencia[melhorVertice].forEach((vizinho) => {
      dominados.add(vizinho);
      dominacao[melhorVertice].push(vizinho);
    });
  }

  return {
    cameras,
    dominacao,
    dominados,
  };
}
