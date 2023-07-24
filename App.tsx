import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native-rom-components'
import { LogBox, Text } from 'react-native'
LogBox.ignoreAllLogs()

const App = () => {
  return (
    <View flex1 main='center' cross='center'>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

export default App
