import React,  { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import homeLogo from '../../assets/cactus.svg'
import './Home.css';

function Home() {
  const { nome, setNome } = useContext(UserContext);
    return (
        <>
        <div className="bg-green-400 flex justify-center">
          <div className='container grid grid-cols-2 text-white'>
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className='text-5xl font-bold'>Seja bem vinde, {nome}!</h2>
              <p className='text-xl'>Expresse aqui seus pensamentos e opniões</p>
              <div className="flex justify-around gap-4">
                <button className='rounded bg-[#e7ee83] text-[rgb(74,177,86)] py-2 px-4'>Ver postagens</button>
                <Link to="/login" className='rounded bg-[#e7ee83] text-[rgb(74,177,86)] py-2 px-4'>
              Voltar 
              </Link>
              </div>
            </div>
  
            <div className="flex justify-center ">
              <img src={homeLogo} alt="" className='w-2/3' />
      
            </div>
          </div>
        </div>
      
      </>
    );
}

export default Home;