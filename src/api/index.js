import {
  service
} from '@/axios'

export const login = (data) => {
  return service.post('/api/auth/login', data)
}

export const getUserInfo = () => {
  return service.get('/api/user/current')
}
