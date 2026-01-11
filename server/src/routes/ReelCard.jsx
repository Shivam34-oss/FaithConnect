import { Heart, MessageCircle, Share2, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getRelativeTime } from '@core/utils/helpers'
import './ReelCard.css'

const ReelCard = ({ reel }) => {
  if (!reel) return null

  return (
    <div className="reel-card" style={{ 
      position: 'relative', 
      borderRadius: '12px', 
      overflow: 'hidden', 
      marginBottom: '20px',
      backgroundColor: '#000',
      aspectRatio: '9/16',
      maxHeight: '500px'
    }}>
      {/* Video Placeholder / Thumbnail */}
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#222' }}>
        {reel.videoUrl ? (
          <video src={reel.videoUrl} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <Play size={48} color="white" />
        )}
      </div>

      {/* Overlay Content */}
      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        padding: '16px',
        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ddd', overflow: 'hidden' }}>
             {reel.author?.avatar && <img src={reel.author.avatar} alt="" style={{ width: '100%', height: '100%' }} />}
          </div>
          <span style={{ fontWeight: 600 }}>{reel.author?.name}</span>
        </div>
        <p style={{ fontSize: '14px', marginBottom: '12px' }}>{reel.caption}</p>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <button style={{ background: 'none', border: 'none', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <Heart size={24} />
            <span style={{ fontSize: '12px' }}>{reel.likes?.length || 0}</span>
          </button>
          <button style={{ background: 'none', border: 'none', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <MessageCircle size={24} />
            <span style={{ fontSize: '12px' }}>{reel.comments?.length || 0}</span>
          </button>
          <button style={{ background: 'none', border: 'none', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <Share2 size={24} />
            <span style={{ fontSize: '12px' }}>Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ReelCard