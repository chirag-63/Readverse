import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export interface Blog {
    id: string
    title: string,
    content: string,
    publishedAt: Date,
    author: { name: string }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<Blog[]>([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                const sortedBlogs = res.data.sort((a: Blog, b: Blog) => {
                    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
                })
                setBlogs(sortedBlogs)
            } catch (err) {
                console.error("Error fetching blogs:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])

    return { loading, blogs }
}

const defaultBlog: Blog = {
    id: '',
    title: '',
    content: '',
    publishedAt: new Date(),
    author: { name: '' }
}

export const useBlog = (id: string | '') => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<Blog>(defaultBlog)
    const [blogNotFound, setBlogNotFound] = useState(false)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/get/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })

                if (res.data != null) {
                    const formattedContent = res.data.content.replace(/\n/g, '<br>')
                    const formattedBlog = { ...res.data, content: formattedContent }
                    setBlog(formattedBlog as Blog)
                } else {
                    setBlogNotFound(true)
                }
            } catch (err) {
                console.error("Error fetching blog : ", err)
            } finally {
                setLoading(false)
            }
        }
        fetchBlog()
    }, [id])

    return { loading, blog, blogNotFound }
}

export const setBlog = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    const publish = async () => {
        const payload = {
            title: title.trim(),
            content: content.trim(),
            published: true
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`, payload, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            navigate(`/blog/${res.data.id}`)
        } catch (err) {
            alert('Error posting blog')
        }
    }

    useEffect(() => {
        if (title.trim() !== '' && content.trim() !== '') {
            publish()
        }
    }, [])

    return { title, content, setTitle, setContent, publish }
}

export const useMyProfile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [myBlogs, setMyBlogs] = useState<Blog[]>([])

    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setName(res.data.name)
                setEmail(res.data.email)
                const sortedBlogs = res.data.posts.sort((a: Blog, b: Blog) => {
                    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
                })
                setMyBlogs(sortedBlogs)
            } catch (err) {
                console.error("Error fetching blogs:", err)
            }
        }
        fetchMyPosts()
    }, [])

    return { name, setName, email, setEmail, myBlogs, setMyBlogs }
}