import { StatusBar, Text, View } from "react-native";
import {styles} from '../../styles/auth.styles'
import { Link } from "expo-router";

export default function Index() {
  return (
    <>
    <StatusBar barStyle={'light-content'}/>
    <View style={styles.container}>
      <Link href={'/notification'}><Text>Feed screen in tabs</Text></Link>
    </View>
    </>
  );
}
