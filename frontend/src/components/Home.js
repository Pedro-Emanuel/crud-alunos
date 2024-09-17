// src/components/Home.js
import BudAnimation from "./BudAnimation";

function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      marginTop: '2rem'
    }}>
      <h1>Bem-vindo ao CRUD</h1>
      <p>Gerencie informações de alunos de forma fácil e eficiente.</p>
      <BudAnimation />
    </div>
  );
}

export default Home;