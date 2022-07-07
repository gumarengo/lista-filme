import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import './favoritos.css';

function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@gustaflix");
        setFilmes(JSON.parse(minhaLista) || [] )
    },[])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter((item)=> {
            return (item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem('@gustaflix', JSON.stringify(filtroFilmes))
        toast.success("Filme removido");
    }
    
    return(
        <div className="meus-filmes" >
            <h1>Meus favoritos</h1>
            <ul>
                {filmes.map((item)=>{
                    return(
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`} >Ver detalhes</Link>
                                <button onClick={()=>excluirFilme(item.id)}>Remover</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Favoritos;