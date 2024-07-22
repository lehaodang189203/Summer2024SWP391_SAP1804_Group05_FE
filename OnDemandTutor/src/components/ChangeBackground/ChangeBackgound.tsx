import React, { useRef, useEffect } from 'react'
import { Stage, Layer, Rect, Image } from 'react-konva'
import useImage from 'use-image'

interface ChangeBackgroundProps {
  imageUrl: string
  backgroundColor: [number, number, number]
}

export default function ChangeBackground({
  imageUrl,
  backgroundColor
}: ChangeBackgroundProps) {
  const [image] = useImage(imageUrl)
  const canvasRef = useRef<any>()

  useEffect(() => {
    if (image) {
      const layer = canvasRef.current.getLayers()[0]
      const rect = layer.findOne('Rect')
      rect.size({ width: image.width, height: image.height })
      layer.batchDraw()
    }
  }, [image])

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      ref={canvasRef}
    >
      <Layer>
        <Rect
          x={0}
          y={0}
          width={window.innerWidth}
          height={window.innerHeight}
          fill={`rgb(${backgroundColor[0]}, ${backgroundColor[1]}, ${backgroundColor[2]})`}
        />
        {image && (
          <Image
            image={image}
            x={0}
            y={0}
            width={image.width}
            height={image.height}
          />
        )}
      </Layer>
    </Stage>
  )
}
