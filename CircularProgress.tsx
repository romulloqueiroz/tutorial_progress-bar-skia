import { memo, useMemo, useEffect } from 'react'
import { View } from 'react-native'
import {
  Canvas,
  Path,
  Skia,
  Group,
  useComputedValue,
  mix,
  useValue,
  vec,
  SweepGradient,
  useClockValue,
  useValueEffect,
} from '@shopify/react-native-skia'

interface CircularProgressProps {
  size?: number
  strokeWidth?: number
  duration?: number
  maxValue: number
  currentValue: number
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size = 194,
  strokeWidth = 12,
  maxValue = 100,
  currentValue = 0,
}) => {
  const radius = size / 2 - strokeWidth

  const path = useMemo(() => {
    const p = Skia.Path.Make()
    p.addCircle(strokeWidth + radius, strokeWidth + radius, radius)
    return p
  }, [radius, strokeWidth])

  const progressValue = useValue(currentValue / maxValue)
  const animatedProgress = useValue(progressValue.current)

  useEffect(() => {
    progressValue.current = currentValue / maxValue
  }, [currentValue, maxValue])

  const clock = useClockValue()

  useValueEffect(clock, () => {
    const progressDifference = progressValue.current - animatedProgress.current
    const animationSpeed = 0.05

    if (Math.abs(progressDifference) > 0.001) {
      animatedProgress.current += progressDifference * animationSpeed
    }
  })

  const x = useComputedValue(() => mix(animatedProgress.current, 0, 180), [animatedProgress])
  const progress = useComputedValue(() => x.current / 180, [x])

  return (
    <View 
      style={{ 
        width: size,
        height: size,
        transform: [{ rotate: `-90deg` }],
      }} 
    >
      <Canvas style={{ flex: 1 }}>
        <Group>
          <Path
            path={path}
            style='stroke'
            strokeWidth={strokeWidth}
            color='#6A5ACD19'
            end={1}
            strokeCap='round'
          />
          <Group>
            <SweepGradient c={vec(size, size)} colors={['#4B0082', '#6A5ACD']} />
            <Path
              path={path}
              style='stroke'
              strokeWidth={strokeWidth}
              end={progress}
              strokeCap='round'
            />
          </Group>
        </Group>
      </Canvas>
    </View>
  )
}

export default memo(CircularProgress)
