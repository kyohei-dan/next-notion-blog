'use client'
import React, { useEffect, useRef, FC } from 'react'
import mermaid from 'mermaid'

type Props = {
  id: string
  definition: string
}

const Mermaid: FC<Props> = props => {
  const { id, definition } = props
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
    })
  }, [])

  useEffect(() => {
    if (ref.current) {
      try {
        mermaid.parse(definition)
        mermaid.mermaidAPI.render(id, definition, (html: string) => {
          ref.current.innerHTML = html
        })
      } catch (err) {
        console.log(err)
      }
    }
  }, [definition, id])

  return (
    <div>
      <div id={id} />
      <div ref={ref} />
    </div>
  )
}

export default Mermaid
