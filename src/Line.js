
import React from 'react'
import { margin } from 'understyle'

const line = (...args) => (
  args.map(([x, y], i) => (
    i === 0
      ? `M${x} ${y}`
      : x === 'z'
      ? 'z'
      : `L${x} ${y}`
  )).join(' ')
)

const Line = ({
  path,
  paths = [],
  size = 16,
  stroke = 'currentcolor',
  strokeWidth = 3,
  strokeLinejoin = 'square',
  strokeLinecap = 'butt',
  style,
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  debug,
  ...props
}) => {
  const sx = {
    display: 'inline-block',
    verticalAlign: 'middle',
    ...margin({
      m,
      mt,
      mr,
      mb,
      ml,
      mx,
      my,
    }),
    style
  }
  
  const doViewBox = (strokeWidth) => {
    const c = 2;
    const base = 16;
    const pos = (strokeWidth - c) / -c;
    const size = strokeWidth + base - c;
    return `${pos} ${pos} ${size} ${size}`;
  }

  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      viewBox={doViewBox(strokeWidth)}
      width={size}
      height={size}
      fill='none'
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinejoin={strokeLinejoin}
      strokeLinecap={strokeLinecap}
      style={sx}>
      {path && <path d={line(...path)} />}
      {paths.map((p, i) => (
        <path key={i} d={line(...p)} />
      ))}
      {debug && (
        <g strokeWidth='.25' stroke='magenta'>
          <path d={line([8, 0], [8, 16])} />
          <path d={line([0, 8], [16, 8])} />
        </g>
      )}
    </svg>
  )
}

export default Line
