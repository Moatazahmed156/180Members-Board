import { Pressable, Text, View } from 'react-native';

export default function CommitteeCard({ icon, title, IsActive, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex h-20 w-28 items-center rounded-full border p-2 ${IsActive && 'bg-blue-600 '}`}>
      <Text className="text-2xl">{icon}</Text>
      <Text className={`text-lg font-bold ${IsActive && 'text-white'}`}>{title}</Text>
    </Pressable>
  );
}
