# FaithConnect API Contract (Backend: Node/Express/Mongo)

## Auth
- `POST /api/auth/register` — body: `name, email, username, password, role (worshiper|leader), faith?, bio?, avatar?`
- `POST /api/auth/login` — body: `email, password`
- `GET /api/auth/profile` — auth: Bearer token
- `PUT /api/auth/profile` — body: `name?, faith?, bio?, avatar?, location?, role?`

## Feed
- `GET /api/feed/explore?page&limit` — mixed posts + reels
- `GET /api/feed/following?page&limit` — from followed leaders

## Posts (existing)
- `GET /api/posts?page&limit`
- `GET /api/posts/:id`
- `POST /api/posts` — leader-only recommended; body: `content, images[], tags[], isPublic?`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`
- `POST /api/posts/:id/like` / `DELETE /api/posts/:id/like`
- `POST /api/posts/:id/comments`

## Reels (new)
- `GET /api/reels?page&limit`
- `GET /api/reels/author/:id`
- `POST /api/reels` — leader-only; body: `videoUrl, caption?, tags[], isPublic?`
- `POST /api/reels/:id/like` / `DELETE /api/reels/:id/like`
- `POST /api/reels/:id/save` / `DELETE /api/reels/:id/save`
- `GET /api/reels/:id/comments` / `POST /api/reels/:id/comments`

## Leaders
- `GET /api/leaders/me/stats` — followers/posts/reels counts
- `GET /api/leaders/me/followers`
- `GET /api/leaders/me/content` — own posts + reels

## Users / Follow
- `GET /api/users/:id`
- `POST /api/users/:id/follow`
- `DELETE /api/users/:id/unfollow`

## Messaging
- `GET /api/messages/conversations`
- `POST /api/messages/conversations` — body: `participantId`
- `GET /api/messages/:conversationId`
- `POST /api/messages/:conversationId` — body: `text?, mediaUrl?`

## Notifications
- `GET /api/notifications`
- `POST /api/notifications/:id/read`

## Models (fields of interest)
- `User`: `role (worshiper|leader), faith, bio, avatar, followers[], following[]`
- `Post`: `author, content, images[], likes[], comments[], tags[], isPublic`
- `Reel`: `author, videoUrl, caption, likes[], saves[], comments[], tags[], isPublic`
- `Conversation`: `participants[], lastMessage, lastMessageAt`
- `Message`: `conversation, sender, text, mediaUrl, readBy[]`
- `Notification`: `user, type (new_post|new_reel|new_message|like|comment), refType, refId, actor, message, read`
