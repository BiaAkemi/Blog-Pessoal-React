import { AuthContext } from '../../contexts/AuthContext';
import { toastAlerta } from '../../util/toastAlerta';
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext } from 'react';

function Navbar() {
  let navigate = useNavigate()

  const { usuario, handleLogout } = useContext(AuthContext)

  function logout() {
      handleLogout()
      toastAlerta ('Usuário deslogado com sucesso', 'sucesso')
      navigate('/login')
  }

  let navbarComponent
  
  return (
    <>
    <div className='w-full bg-[#483D8B] text-white flex justify-center py-4'>
          <div className="container flex justify-between text-lg">
          <Link to='/home' className='text-2xl font-bold uppercase'>Blog Pessoal</Link>

            <div className='flex gap-4'>
              <Link to='/login' className='hover:underline'>Login</Link>
              <Link to='/home' className='hover:underline'>Home</Link>
              <Link to='/postagens' className='hover:underline'>Postagens</Link>
              <Link to='/temas' className='hover:underline'>Temas</Link>
              <Link to='cadastroTema' className='hover:underline'>Cadastrar tema</Link>
              <Link to='/perfil' className='hover:underline'>Perfil</Link>
              <Link to='' onClick={logout} className='hover:underline'>Sair</Link>
            </div>
          </div>
        </div>
    </>
  )
}

export default Navbar