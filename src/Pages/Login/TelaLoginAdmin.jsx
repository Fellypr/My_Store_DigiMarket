import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TelaLoginAdmin.css";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";

import { MdAdminPanelSettings } from "react-icons/md";
function TelaLoginAdmin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [palavraChave, setPalavraChave] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function GetLogin(e) {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("https://api-store-g1mu.onrender.com/api/Login/LoginForAdministrator",{
                Email: email,
                Password: password,
                KeyCode: palavraChave
            },{
                headers: {
                    "Content-Type": "application/json",
                },
            })
            alert("Login feito com sucesso!");
            navigate("/admin");
        } catch (error) {
            console.log(error);
            alert("Erro no Login!");
        }finally{
            setLoading(false);
        }
    } 
  return (
    <div className="telaLoginAdminBody">
      <form className="telaLoginAdminSection" onSubmit={GetLogin}>
        <MdAdminPanelSettings className="iconAdmin" />
        
        <div className="InputLabel">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder="Informe seu email" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="InputLabel">
          <label htmlFor="Password">Password:</label>
          <input type="password" id="Password" placeholder="Informe sua senha" onChange={(e) => setPassword(e.target.value)}  />
        </div>

        <div className="InputLabel">
          <label htmlFor="PalavraChave">Palavra Chave:</label>
          <input type= "number" id="PalavraChave" placeholder="Informe sua Palavra Chave"  onChange={(e) => setPalavraChave(e.target.value)}/>
        </div>
        <button type="submit">Entrar</button>
      </form>
      <div className={loading ? "loadingLogin" : ""}>
        {loading && <Loading />}
      </div>
    </div>
  );
}

export default TelaLoginAdmin;
