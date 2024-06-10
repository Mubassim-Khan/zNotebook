import { Toaster } from 'react-hot-toast'

export const ToasterProvider = () => {
    return (
        <Toaster
            position='top-center'
            toastOptions={{
                style: {
                    background: "#333",
                    color: "#fff",
                },
            }}
        />
    )
}
