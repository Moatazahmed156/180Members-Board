import CommitteeCard from 'app/Components/CommitteeCard';
import axios from 'axios';
import { Image, ScrollView, Text, View, TouchableOpacity, Modal, Pressable } from 'react-native';

import './global.css';
import Logo from './assets/logo-2e33b7a0.png';

import { useEffect, useState } from 'react';
import MemberCard from 'app/Components/MemberCard';

export default function App() {
  const [data, setData] = useState([]);
  const [committee, setCommitttee] = useState('All');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://192.168.100.43:3000/members${committee !== 'All' ? `?committee=${committee}` : ''}`
        );
        setData(response.data[1]);
      } catch (error) {
        console.log('Error: ', error);
      }
    }
    fetchData();
  }, [committee, showModal]);
  return (
    <View className="bg-gray-200">
      <View className="flex-row items-center justify-between bg-[#700608] px-4 pb-6 pt-16">
        <View>
          <Text className="text-4xl font-bold text-white">Redrect</Text>
          <Text className="text-4xl font-bold text-white">your</Text>
          <Text className="text-4xl font-bold text-white">Thinking</Text>
        </View>
        <Image source={Logo} className="size-36" />
      </View>
      <ScrollView horizontal>
        <View className="m-4 flex-row gap-4">
          <CommitteeCard
            icon="🔍"
            title="ALL"
            IsActive={false}
            onPress={() => {
              setCommitttee('All');
            }}
          />
          <CommitteeCard
            icon="🧠"
            title="Technical"
            IsActive={false}
            onPress={() => {
              setCommitttee('Technical');
            }}
          />
          <CommitteeCard
            icon="🤝"
            title="PR&FR"
            IsActive={false}
            onPress={() => {
              setCommitttee('PR%26FR');
            }}
          />
          <CommitteeCard
            icon="🎬"
            title="Video"
            IsActive={false}
            onPress={() => {
              setCommitttee('Video');
            }}
          />
          <CommitteeCard
            icon="🎨"
            title="Graphics"
            IsActive={false}
            onPress={() => {
              setCommitttee('Graphics');
            }}
          />
          <CommitteeCard
            icon="📱"
            title="SMM"
            IsActive={false}
            onPress={() => {
              setCommitttee('SMM');
            }}
          />
        </View>
      </ScrollView>
      <View className="h-[37.5rem] px-2">
        <View className="flex-row border-b border-gray-300 bg-gray-100 py-2">
          <Text className="flex-1 p-2 font-bold">ID</Text>
          <Text className="flex-1 p-2 font-bold">Name</Text>
          <Text className="flex-1 p-2 font-bold">Committee</Text>
          <Text className="flex-1 p-2 font-bold">Points</Text>
        </View>
        <ScrollView>
          {data.map((e) => (
            <TouchableOpacity
              key={e.ID}
              onPress={() => {
                setSelectedMember(e);
                setShowModal(true);
              }}>
              <View className="flex-row border-b border-white py-2">
                <Text className="flex-1 p-2">{e.ID}</Text>
                <Text className="flex-1 p-2">{e.Name}</Text>
                <Text className="flex-1 p-2">{e.Committee}</Text>
                <Text className="flex-1 p-2">{e.Score}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Modal transparent={true} visible={showModal} onRequestClose={() => setShowModal(false)}>
          <View className="flex-1 items-center justify-center bg-black/40">
            <View>
              {selectedMember ? (
                <MemberCard member={selectedMember} />
              ) : (
                <Text>No member selected</Text>
              )}
              <Pressable
                className="mt-4 rounded-xl bg-red-600 px-4 py-2"
                onPress={() => setShowModal(false)}>
                <Text className="text-center text-white">Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <View className="absolute bottom-[-50px] left-2 right-2 z-50 flex-row items-center justify-around rounded-3xl border bg-white p-4 shadow-lg">
        <Text>Home</Text>
        <Text>Add Member</Text>
      </View>
    </View>
  );
}
