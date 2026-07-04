import http from '@/infra/plugins/http-client'

export const MemberTypeService = () => ({
  getAll: () => http.get('/member-types'),
})
