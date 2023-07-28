// import type { H3Event } from 'h3'
// import { appendResponseHeader } from 'h3'

export const useAdminSidebar = () => useState<boolean>('sidebar', () => false)

// export async function fetchWithCookie(event: H3Event, url: string) {
//   const res = await $fetch.raw(url)
//   const cookies = (res.headers.get('set-cookie') || '').split(',')
//   for (const cookie of cookies)
//     appendResponseHeader(event, 'set-cookie', cookie)

//   return res._data
// }
