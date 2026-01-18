import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { postService } from '@data/services/postService'
import Button from '@widgets/Button/Button'
import Input from '@widgets/Input/Input'
import { toast } from 'react-toastify'
import './CreatePost.css'

const CreatePost = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await postService.createPost({ title, content })
      await queryClient.invalidateQueries(['feed'])
      toast.success('Post created')
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-post-view">
      <h2>Create Post</h2>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />

        <div style={{ marginTop: 8 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Content</label>
          <textarea
            className="input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            style={{ width: '100%', padding: 10, borderRadius: 8 }}
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <Button type="submit" loading={loading}>
            Create
          </Button>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
