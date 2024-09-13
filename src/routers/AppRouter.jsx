const AppRouter = () => {
    return (
        <Router>
            <Routes>

                {/* Rutas Publicas */}
                <Route path="/" element={<PublicLayout />}>
                    <Route path="/" element={<LoginPage />} /> 
                </Route>


                {/* Rutas Privadas */}
                <Route 
                    path="/" 
                    element={
                        <PrivateRouter>
                            <PrivateLayout />
                        </PrivateRouter>
                }>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/empleados" element={<EmpleadosPage />} />  
                </Route>
                
            </Routes>
        </Router>
    )
}