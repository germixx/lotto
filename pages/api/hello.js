// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function Handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}

/* 

Goals:
* Pull last 18 draws
  - Can alternate between 7(9) and 18 draws
  - Pulls numbers and shows how many times repeated
  - Pull Hot, Cold, Overdue, Repeat
* Search through
* Store (5) guesses in mongoDB
* Make Numbers clickable

* Best Chance Algorithm:
  - Only use numbers that have showed up within the last __ draws
*/