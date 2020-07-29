import shortid from 'shortid'
import db from '../../../db'
import { sleep } from '../../../utils'

//

export default async (req, res) => {
  await sleep(1000)

  try {
    if (req.method === 'GET') {
      return await GET(req, res)
    } else if (req.method === 'POST') {
      return await POST(req, res)
    }
  } catch (err) {
    console.error(err)
    res.status(500)
    res.json({ message: 'An unknown error occurred!' })
  }
}

async function GET(req, res) {
  const {
    query: { pageOffset, pageSize },
  } = req

  const posts = (await db.get()).posts.map(({ body = '', ...d }) => ({
    ...d,
    body: body.substring(0, 50) + (body.length > 100 ? '...' : ''), // Don't return full body in list calls
  }))

  if (Number(pageSize)) {
    const start = Number(pageSize) * Number(pageOffset)
    const end = start + Number(pageSize)
    const page = posts.slice(start, end)

    return res.json({
      items: page,
      nextPageOffset: posts.length > end ? Number(pageOffset) + 1 : undefined,
    })
  }

  res.json(posts)
}

async function POST(req, res) {
  const row = {
    id: shortid.generate(),
    ...req.body,
  }

  if (row.title === 'Bad Word') {
    res.status(400)
    res.json({ message: 'You cannot use bad words in titles!' })
  }

  await db.set((old) => {
    return {
      ...old,
      posts: [...old.posts, row],
    }
  })

  res.json(row)
}
