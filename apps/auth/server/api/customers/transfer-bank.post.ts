const DUMMY_USER = {
  id: '64ae26ed02c62902b15441ca',
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // if (body.id !== DUMMY_USER.id
  // ) {
  //   setResponseStatus(event, 500, 'ข้อมูลผิดพลาด')
  //   return {
  //     error: 'ข้อมูลผิดพลาด',
  //   }
  // }
  return { success: true }

  //   setTimeout(() => {
  //     return { success: true }
  //   }, 5000)
})
