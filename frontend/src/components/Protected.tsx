import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

export const isAuthenticated = () => {
    const token = localStorage.getItem('token')
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token)
        if (decodedToken) return true;
    } catch (err) {
        return false;
    }

}

export const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/signin')
        }
    }, [navigate])

    return element
}