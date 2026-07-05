import campus from "./grafo/campus.json";
import dominante from "./algoritmo/dominante";
import camera from "/camera.png";
import styles from "./app.module.css";

function App() {
  const resultado = dominante(campus);

  const ESCALA = 0.8;
  const LARGURA = 900;
  const ALTURA = 900;

  const getVertice = (id) =>
    campus.vertices.find((vertice) => vertice.id === id);

  return (
    <div className={styles.main}>
      <h1>Posicionamento de Câmeras - UFC Russas</h1>
      <p>(Passe o mouse sobre um vértice para visualizar o local)</p>

      <div className={styles.info}>
        <p>
          <b>Vértices:</b> {campus.vertices.length}
        </p>
        <p>
          <b>Arestas:</b> {campus.arestas.length}
        </p>
        <p>
          <b>Câmeras instaladas:</b> {resultado.cameras.length}
        </p>
      </div>

      <svg width={LARGURA} height={ALTURA} className={styles.campusmap}>
        {campus.arestas.map((aresta, index) => {
          const origem = getVertice(aresta.origem);
          const destino = getVertice(aresta.destino);

          return (
            <line
              key={index}
              x1={origem.x * ESCALA}
              y1={origem.y * ESCALA}
              x2={destino.x * ESCALA}
              y2={destino.y * ESCALA}
              className="edge"
              stroke="#999"
              strokeWidth={2}
            />
          );
        })}

        {campus.vertices.map((vertice) => {
          const temCamera = resultado.cameras.includes(vertice.id);
          const estaDominado = resultado.dominados.has(vertice.id);

          return (
            <g key={vertice.id}>
              <title>{vertice.label}</title>

              <circle
                cx={vertice.x * ESCALA}
                cy={vertice.y * ESCALA}
                r={12}
                className={estaDominado ? "vertex dominated" : "vertex"}
                fill={estaDominado ? "#00b646" : "#DDD"}
                stroke="#222"
                strokeWidth={2}
              />

              {temCamera && (
                <image
                  href={camera}
                  x={vertice.x * ESCALA - 10}
                  y={vertice.y * ESCALA - 10}
                  width={20}
                  height={20}
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default App;
