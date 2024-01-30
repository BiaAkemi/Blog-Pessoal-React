import { createContext, ReactNode, useState } from "react"
import { toastAlerta } from "../util/toastAlerta"
import UsuarioLogin from "../models/UsuarioLogin"
import { login } from "../services/Service"

// Define as infos que o contexto irá guardar
interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

// Define a estrutura do Componente de Contexto (deve estar no App.tsx, envolvendo os componentes da aplicação)
interface AuthProviderProps {
    children: ReactNode
}
// Define o armazenamento de dados - aqui o contexto nasce.
export const AuthContext = createContext({} as AuthContextProps)

// Compartilha e manipula os dados do Contexto
export function AuthProvider({ children }: AuthProviderProps) {
    // Variável Estado - objeto usuario
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    // isLoading é incializado falso porque não tem nada carregando, já que não está logado
    const [isLoading, setIsLoading] = useState(false)

    
    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true)
        try {
            await login(`/usuarios/logar`, userLogin, setUsuario)
            toastAlerta ('Usuário logado com sucesso', 'sucesso')
            setIsLoading(false)

        } catch (error) {
            console.log(error)
            toastAlerta ('Dados do usuário inconsistentes', 'erro')
            setIsLoading(false)
        }
    }

    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}