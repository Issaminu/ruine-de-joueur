import { router } from "expo-router";
import { useState } from "react";
import { Button, View, TextInput } from "react-native";
import databaseJSON from "../../database.json";

export default function HomeScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const database = databaseJSON as Record<string, string>;

  const checkCredentials = () => {
    if (database[username] && database[username] === password) {
      router.push("/home");
    } else {
      alert("Mauvais identifiants");
    }
  };

  return (
    <View className="flex justify-center items-center h-full w-full px-8">
      <TextInput
        className="w-full bg-white text-black rounded-sm pl-2 py-2"
        placeholder="Nom utilisateur"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        className="w-full bg-white text-black rounded-sm pl-2 py-2 my-4"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View className="w-full">
        <Button title="Sign in" onPress={checkCredentials} />
      </View>
    </View>
  );
}
