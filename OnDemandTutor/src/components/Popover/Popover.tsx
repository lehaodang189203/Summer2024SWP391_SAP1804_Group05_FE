import { Placement } from '@floating-ui/react'
import React, { ElementType } from 'react'

interface Props {
  children: React.ReactNode
  renderPopopver: React.ReactNode
  className?: string
  as?: ElementType
  intialOpen?: boolean
  placement?: Placement
}

//  về nhà làm tiếp
// export default function Popover({
//   children,
//   className,
//   renderPopover,
//   as: Element = 'div',
//   initalOpen,
//   placement = 'bottom-end'
// }: Props) {
//   return <div>Popover</div>
// }
