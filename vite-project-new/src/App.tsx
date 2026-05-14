import { useEffect, useState } from "react";
import "./App.css";

type Usuario = {
  id: number;
  nome: string;
};

function App() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsuarios = async () => {
    const res = await fetch("http://localhost:3001/usuarios");
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);
  
  const adicionarUsuario = async () => {
    if (!nome.trim()) return;

    try {
      setLoading(true);

      const res = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome.trim() }), // .trim() para evitar espaços vazios
      });

      if (!res.ok) throw new Error("Erro ao criar usuário");

      // Pegamos o novo usuário retornado pela API
      const novoUsuario: Usuario = await res.json();

      // Atualizamos o estado local sem precisar de um novo GET
      setUsuarios((prev) => [...prev, novoUsuario]);
      
      // Limpamos o input
      setNome("");
      
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar usuário");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>📊 Central de Usuários</h1>
        <p>Gerencie usuários em tempo real</p>
      </header>

      <div className="form">
        <input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite um nome..."
        />
        <button onClick={adicionarUsuario} disabled={loading}>
          {loading ? "Adicionando..." : "Adicionar"}
        </button>
      </div>

      <div className="grid">
        {usuarios.map((user) => (
          <div className="card" key={user.id}>
            <h2>{user.nome}</h2>
            <span>ID: {user.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;