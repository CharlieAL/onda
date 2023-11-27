export const config = {
  url: 'https://onda-qbmj.onrender.com/api/',
  socket: 'https://onda-qbmj.onrender.com',
  // socket: 'http://localhost:3000',
  // url: 'http://localhost:3000/api/',
  auth: {
    login: 'users/signin',
    signup: 'users/signup',
    logout: 'users/signout',
    verifyToken: 'users/verify-token',
    getUser: 'users/get-one/',
    updateUser: 'users/update/',
    getUsers: 'users',
    sendFriendRequest: 'users/send-friend-request/',
    acceptFriendRequest: 'users/accept-friend-request/',
    friends: 'users/friends',
    messages: 'users/messages/',
    sendPermission: 'users/permissions/',
    permissions: 'users/permissions',
    givePermission: 'users/give-permission-by-create-company/',
    removerPermission: 'users/remove-permission-by-create-company/'
  },
  events: {
    get: 'events',
    create: 'events',
    like: 'events/like/',
    comment: 'events/comment/',
    myLikes: 'events/my-like-events',
    getOne: 'events/get-one/',
    asistirEvento: 'events/asistir-evento/',
    getMyTickets: 'events/my-tickets'
  },
  company: {
    create: 'company',
    get: 'company'
  }
}
