import { homeText } from '@/index'
import React from 'react'

const QAndA = () => {
  const QA = [
    {
      Q : homeText.QA['why-aqar'].q,
      A : homeText.QA['why-aqar'].a
    },
    {
      Q : homeText.QA.histroy.q,
      A : homeText.QA.histroy.a
    }
  ]
  return (
    <section>
      <h2>{homeText['QA-hook']}</h2>
      <div>
        {/* //TODO: is there is a package that build a Q&A block or better build it by my self */}
        {QA.map(qa => (
          <div>
            <p>{qa.Q}</p>
            <p>{qa.A}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default QAndA