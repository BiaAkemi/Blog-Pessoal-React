import React,  { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import homeLogo from '../../assets/cactus.svg'
import './Home.css';
import { Link, useNavigate } from 'react-router-dom';


function Home() {
  const { nome, setNome } = useContext(UserContext);
    return (
        <>
        <div className="bg-[#9370DB] flex justify-center">
          <div className='container grid grid-cols-2 text-white'>
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className='text-5xl font-bold'>Seja bem vinde, {nome}!</h2>
              <p className='text-xl'>Expresse aqui seus pensamentos e opniões</p>
              <div className="flex justify-around gap-4">
                <button className='rounded bg-[#6A5ACD] hover:bg-[#483D8B]  text-[#ffffff] py-2 px-4'>Ver postagens</button>
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