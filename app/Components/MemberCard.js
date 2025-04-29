import { Pressable, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function MemberCard({ member }) {
  const [score, setScore] = useState(member.Score);

  const updateScore = async (newScore) => {
    try {
      await axios.patch(`http://192.168.100.43:3000/members/${member.ID}`, {
        Score: newScore,
      });
    } catch (error) {
      console.log('Error updating score:', error);
    }
  };

  const incrementScore = () => {
    const newScore = score + 1;
    setScore(newScore);
    updateScore(newScore);
  };

  const decrementScore = () => {
    const newScore = score - 1;
    setScore(newScore);
    updateScore(newScore);
  };
  const deleteMember = async () => {
    try {
      await axios.delete(`http://192.168.100.43:3000/members/${member.ID}`);
      console.log('Member Deleted');
      return <Text>Member Deleted</Text>;
    } catch (error) {
      console.log('Error updating score:', error);
    }
  };
  return (
    <View className="flex h-96 w-80 justify-between rounded-xl bg-white p-4 shadow-md">
      <Text className="mb-2 text-2xl font-bold">Member Info</Text>
      <Text className="text-xl">ID: {member.ID}</Text>
      <Text className="text-xl">Name: {member.Name}</Text>
      <Text className="text-xl">Committee: {member.Committee}</Text>
      <Text className="text-xl">Score: {score}</Text>
      <View className="flex-row items-center justify-between">
        <Pressable
          onPress={incrementScore}
          className="mt-4 w-12 items-center justify-center bg-green-500 p-2">
          <Text>+</Text>
        </Pressable>
        <Text>Change Score</Text>
        <Pressable
          onPress={decrementScore}
          className="mt-4 w-12 items-center justify-center bg-red-500 p-2">
          <Text>-</Text>
        </Pressable>
      </View>
      <Pressable
        onPress={deleteMember}
        className="mt-8 items-center justify-center rounded-3xl bg-red-500 p-2">
        <Text className="text-lg text-white">Delete</Text>
      </Pressable>
    </View>
  );
}
