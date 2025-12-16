import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { store } from './store/index'
import { authService } from './services/authService'
import { setAuth, clearAuth } from './features/auth/authSlice'
import AppRoutes from './routes'

const App: React.FC = () => {
    useEffect(() => {
        // Get initial session
        authService.getUser().then(({ user }) => {
            if (user) {
                store.dispatch(setAuth({ user, session: null }))
            }
        })

        // Listen for auth changes
        const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                store.dispatch(setAuth({ user: session?.user, session }))
            } else if (event === 'SIGNED_OUT') {
                store.dispatch(clearAuth())
            }
        })

        // Only unsubscribe if subscription exists
        return () => {
            if (subscription?.unsubscribe) {
                subscription.unsubscribe()
            }
        }
    }, [])

    return (
        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <AppRoutes />
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                            },
                            success: {
                                duration: 3000,
                            },
                        }}
                    />
                </div>
            </BrowserRouter>
        </Provider>
    )
}

export default App
