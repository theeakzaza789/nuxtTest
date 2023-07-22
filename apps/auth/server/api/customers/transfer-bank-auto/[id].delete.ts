export default defineEventHandler(async (event) => {
  const body = await getMethod(event)
  if (body === 'DELETE') {
    // delete a blog by id
    return 'success'
  }
})
