'use client'
import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'

const BlockEquation = ({ block }) => (
  <div>
    <BlockMath math={block.Equation.Expression} />
  </div>
)

export default BlockEquation
