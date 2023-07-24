import { View } from 'react-native-rom-components'
import { LogBox, Text, Dimensions, TouchableOpacity } from 'react-native'
import { useCountdown } from './useCountdown'
import { useMemo } from 'react'
import CircularProgress from './CircularProgress'
const { width: deviceWidth } = Dimensions.get('screen')
LogBox.ignoreAllLogs()

const MAX_VALUE = 5

const App = () => {
  const { countdown, toggle, isPaused, reset } = useCountdown(MAX_VALUE) 
  const DISPLAY_SIZE = useMemo(() => deviceWidth * 0.7, [deviceWidth])

  return (
    <View flex1 main='center' cross='center'>

      <View absolute>
        <CircularProgress 
          size={DISPLAY_SIZE} 
          strokeWidth={18} 
          maxValue={MAX_VALUE}
          currentValue={MAX_VALUE - countdown}
        />
      </View>

      <View absolute>
        <Text style={{ fontSize: 32, color: '#6A5ACD', fontWeight: 'bold' }}>
          TIMER: {countdown}
        </Text>
      </View>

      <View absolute by={200}>
        <TouchableOpacity onPress={
          countdown === 0 ? reset : toggle
        }>
          <Text style={{
            fontSize: 28,
            color: '#6A5ACD',
            fontWeight: 'bold',
          }}>
            {countdown === 0 ? 'RESET' : isPaused ? 'START' : 'PAUSE'}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default App
