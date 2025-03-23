
// const services = [
//   { name: 'identity', url: IDENTITY_SERVICE_URL },
//   { name: 'content', url: CONTENT_SERVICE_URL },
//   { name: 'project', url: PROJECT_SERVICE_URL },
//   { name: 'upload', url: UPLOAD_SERVICE_URL }
// ]

// app.get('/keep-alive', async (_, res) => {
//   const pingResults = await Promise.allSettled(
//     services.map(async ({ name, url }) => {
//       try {
//         const response = await axios.get(`${url}/health`, { timeout: 10000 })
//         return response.data
//       } catch (err: any) {
//         return {
//           name,
//           status: err?.code,
//           error: err?.message || 'Unknown error'
//         }
//       }
//     })
//   )

//   const results = pingResults.map((result) =>
//     result.status === 'fulfilled'
//       ? result.value
//       : { error: 'Unexpected promise rejection' }
//   )

//   logger.info(`Keep-alive summary: ${JSON.stringify(results)}`)
//   res.status(200).json({ message: 'Pinged all services', results })
// })
