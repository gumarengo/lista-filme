import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./filme.css";

function Filme() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "796c3865d427d5b32103b951fef74590",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })

        .catch(() => {
          navigate("/", { replace: true });
          return;
        });
    }
    loadFilme();

    return () => {
      //desmontar componente
    };
  }, [navigate, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@gustaflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );

    if (hasFilme) {
      alert("Já tem na lista");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@gustaflix", JSON.stringify(filmesSalvos));
    alert("Filme salvo");
  }

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando filme ...</h1>
      </div>
    );
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      />
      <br />
      <h3>Sinopse</h3>
      <span>{filme.overview} </span>

      <strong>Rating: {filme.vote_average} /10 </strong>
      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${filme.title} Trailer`}
          >
            Trailer
          </a>{" "}
        </button>
      </div>
    </div>
  );
}

export default Filme;