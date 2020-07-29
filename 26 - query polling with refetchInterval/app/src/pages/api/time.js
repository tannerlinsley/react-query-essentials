export default async (req, res) => {
  if (req.method === 'GET') {
    await new Promise(r => setTimeout(r, 500))
    res.json({
      time: Date.now(),
    })
  }
}
