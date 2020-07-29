import db from '../../../db'
import { sleep } from '../../../utils'

export default async (req, res) => {
  await sleep(500)

  try {
    if (req.method === 'GET') {
      return await GET(req, res)
    } else if (req.method === 'PATCH') {
      return await PATCH(req, res)
    } else if (req.method === 'DELETE') {
      return await DELETE(req, res)
    }
  } catch (err) {
    console.error(err)
    res.status(500)
    res.json({ message: 'An unknown error occurred!' })
  }
}

async function GET(req, res) {
  const {
    query: { postId },
  } = req

  const row = (await db.get()).posts.find((d) => d.id == postId)

  if (!row) {
    res.status(404)
    return res.send('Not found')
  }

  res.json(row)
}

async function PATCH(req, res) {
  const {
    query: { postId },
    body,
  } = req

  if (body.title === 'Bad Word') {
    res.status(400)
    res.json({ message: 'You cannot use bad words in titles!' })
    return
  }

  const row = (await db.get()).posts.find((d) => d.id == postId)

  if (!row) {
    res.status(404)
    return res.send('Not found')
  }

  delete body.id

  const newRow = {
    ...row,
    ...body,
  }

  await db.set((old) => {
    return {
      ...old,
      posts: old.posts.map((d) => (d.id == postId ? newRow : d)),
    }
  })

  res.json(newRow)
}

async function DELETE(req, res) {
  const {
    query: { postId },
  } = req

  const row = (await db.get()).posts.find((d) => d.id == postId)

  if (!row) {
    res.status(404)
    return res.send('Not found')
  }

  await db.set((old) => {
    return {
      ...old,
      posts: old.posts.filter((d) => d.id != postId),
    }
  })

  res.status(200)
  res.send('Resource Deleted')
}
