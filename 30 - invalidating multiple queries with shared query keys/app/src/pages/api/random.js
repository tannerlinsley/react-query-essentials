export default async (req, res) => {
  if (req.method === 'GET') {
    await new Promise(r => setTimeout(r, 200))
    res.json({
      random: Math.random(),
    })
  }
}
