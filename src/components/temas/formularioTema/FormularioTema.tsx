import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toastAlerta } from '../../../utils/toastAlerta'
import { RotatingLines } from 'react-loader-spinner';
import Tema from '../../../models/Tema';

function FormularioTema() {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [tema, setTema] = useState<Tema>({} as Tema)  

    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>()  

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token;   

    async function buscarPorId(id: string) {

        await buscar(`/temas/${id}`, setTema, { 
            headers: {
                Authorization: token,
            },
        });
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {

        setTema({      
            ...tema,   
            [e.target.name]: e.target.value 
        })
    }

    async function gerarNovoTema(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()  
        setIsLoading(true)  

        if (id !== undefined) {

            try {
                await atualizar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                toastAlerta ('Tema atualizado com sucesso', 'sucesso')
                retornar()

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente','info')
                    handleLogout()
                } else {
                    toastAlerta('Erro ao atualizar o Tema','erro')
                }
            }

        } else {

            try {
                await cadastrar(`/temas`, tema, setTema, {
                    headers: {
                        'Authorization': token
                    }
                })

                toastAlerta('Tema cadastrado com sucesso','sucesso')

            } catch (error: any) {
                if (error.toString().includes('403')) {
                    toastAlerta('O token expirou, favor logar novamente','info')
                    handleLogout()
                } else {
                    toastAlerta('Erro ao cadastrado o Tema','erro')
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/temas")
    }

    useEffect(() => {
        if (token === '') {
            toastAlerta('Você precisa estar logado','erro')
            navigate('/login')
        }
    }, [token])

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl text-center my-8">

                {id === undefined ? 'Cadastre um novo tema' : 'Editar tema'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovoTema}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao">Descrição do tema</label>
                    <input
                        type="text"
                        placeholder="Descrição"
                        name='descricao'
                        className="border-2 border-slate-700 rounded p-2"
                        value={tema.descricao}                                                  
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}     
                    />
                </div>
                <button
                    className="rounded text-slate-100 bg-[#7B68EE] hover:bg-[#6A5ACD] w-1/2 py-2 mx-auto flex justify-center "
                    type="submit"
                >
                    {isLoading ?
                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                        <span>Confirmar</span>
                    }
                </button>
            </form>
        </div>
    );
}

export default FormularioTema;