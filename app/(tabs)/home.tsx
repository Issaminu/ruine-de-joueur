import { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import { Image } from "expo-image";

import Dice1 from "../../assets/images/dice-six-faces-one.png";
import Dice2 from "../../assets/images/dice-six-faces-two.png";
import Dice3 from "../../assets/images/dice-six-faces-three.png";
import Dice4 from "../../assets/images/dice-six-faces-four.png";
import Dice5 from "../../assets/images/dice-six-faces-five.png";
import Dice6 from "../../assets/images/dice-six-faces-six.png";
import { router, useFocusEffect, useNavigation } from "expo-router";

const diceImages = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

const home = () => {
  const [playerFortune, setPlayerFortune] = useState(0);
  const [casinoFortune, setCasinoFortune] = useState(0);
  const [playResult, setPlayResult] = useState("");
  const [initGame, setInitGame] = useState(true);
  const navigation = useNavigation();
  const [currentDiceImage, setCurrentDiceImage] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setPlayerFortune(0);
      setCasinoFortune(Math.floor(Math.random() * 100));
      setInitGame(true);
      setPlayResult("");
      setCurrentDiceImage(null);
    }, [])
  );

  const play = () => {
    const result = Math.floor(Math.random() * 6) + 1;
    setCurrentDiceImage(diceImages[result - 1]);

    if (result === 2 || result === 3) {
      setPlayerFortune(playerFortune + 1);
      setCasinoFortune(casinoFortune - 1);
      setPlayResult("Vous avez gagné 1 euro");
    } else {
      setPlayerFortune(playerFortune - 1);
      setCasinoFortune(casinoFortune + 1);
      setPlayResult("Vous avez perdu 1 euro");
    }

    if (playerFortune === 0) {
      alert("Vous avez perdu le jeu");
      router.replace("/");
    } else if (casinoFortune === 0) {
      alert("Vous avez gagné le jeu");
      router.replace("/");
    }
  };

  if (initGame) {
    return (
      <View className="flex justify-center items-center h-full w-full px-8">
        <TextInput
          className="w-full bg-white text-black rounded-sm pl-2 py-2 my-4"
          placeholder="Miser de l'argent"
          keyboardType="number-pad"
          onChangeText={(value) => {
            setPlayerFortune(parseInt(value));
          }}
        />
        <View className="w-full">
          <Button
            title="Jouer"
            onPress={() => {
              if (playerFortune > 0) {
                setInitGame(false);
              }
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View className="flex justify-center items-ce nter h-full w-full px-8">
      <View className="mb-4">
        <Text>Fortune du Joueur: {playerFortune}</Text>
        <Text>Fortune du Joueur: {casinoFortune}</Text>
      </View>

      <Button title="Lancer le dé" onPress={play} />
      <View className="flex flex-row justify-between items-center my-4">
        <Text>{playResult}</Text>
        <Image source={currentDiceImage} className="w-8 h-8" />
      </View>

      <Button
        title="Terminer le jeu"
        onPress={() => {
          alert(
            `Vous avez quitter le jeu. Votre fortune est de ${playerFortune} euros`
          );
          router.replace("/");
        }}
      />
    </View>
  );
};

export default home;
