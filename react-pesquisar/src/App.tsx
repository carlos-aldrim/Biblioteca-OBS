import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import BookIcon from '@mui/icons-material/Book';
import PersonIcon from '@mui/icons-material/Person';
import LinkIcon from '@mui/icons-material/Link';
import axios from 'axios';

function App() {
  const [pesquisa, setPesquisa] = useState("");
  const [livros, setLivros] = useState<[]>([]);

  const div_1 = {
    textAlign: 'center' as const,
    marginTop: '8px'
  }

  const div_2 = {
    textAlign: 'left' as const,
    background: '#afb1ca',
    borderRadius: '10px',
    width: '45%',
    margin: '8px 0px 0px 370px'
  }

  const button = {
    width: '70px',
    height: '37px',
    margin: '2px 0px 0px 8px',
    borderRadius: '10px',
    borderColor: '#8085ce',
    backgroundColor: '#8085ce',
    color: '#ffffff'
  }

  const input = {
    width: '300px',
    height: '30px',
    borderRadius: '10px',
    borderColor: '#b9b9b9',
  }

  const h1 = {
    textAlign: 'center' as const,
    fontSize: '26px'
  }

  const p = {
    margin: '10px 0px 0px 8px',
    fontSize: '16px'
  }

  async function search() {
    const response = await axios.get("https://hn.algolia.com/api/v1/search?query");
    setLivros(response.data.hits.filter((hits: any) => {
      if (hits.title === null) {
        return hits.author.toLowerCase().includes(pesquisa.toLowerCase());
      } else {
        return (hits.author.toLowerCase().includes(pesquisa.toLowerCase()) || hits.title.toLowerCase().includes(pesquisa.toLowerCase()))
      }
    }));
  }

  return (
    <div>
      <h1 style={h1} >Biblioteca OBS</h1>
      <div style={div_1} >
        <input style={input} type="text" placeholder="Digite o livro..." onChange={(event) => setPesquisa(event.target.value)}></input>
        <button style={button} onClick={search} >Buscar</button>
      </div>
      <div style={div_1}>
        {livros.length !== 0 ? livros.flatMap((livros: { author: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; title: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; url: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
          <div style={div_2} >
            <p style={p} ><PersonIcon style={{ fontSize: 'medium', paddingRight: '8px' }} />{livros.author}</p>
            <p style={p} ><BookIcon style={{ fontSize: 'medium', paddingRight: '8px' }} />{livros.title}</p>
            <p style={p} > <LinkIcon style={{ fontSize: 'medium', paddingRight: '8px' }} />{livros.url}</p >
          </div >
        )) : "Nenhum livro encontrado."}
      </div >
    </div >
  );
}

export default App;