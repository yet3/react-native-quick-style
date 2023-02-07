import * as React from 'react';
import { UiCard, UiText, UiView } from './ui';

export default function App() {
  return (
    <UiView
      gap={6}
      textColor="red"
      textSize={18}
      p={12}
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      Just a text
      <UiText content="Another text" />
      <UiText content="Another text v2" color="blue" size={20} mb={12} />
      <UiView gap={16} width="100%" alignItems="center">
        <UiCard width="100%">
          <UiText content="Card 1" size={24} mb="md" />
          <UiText content="A super cool card number 1" size={16} />
        </UiCard>
        <UiCard width="80%" px={24} py={32}>
          <UiText content="Card 2" size={24} mb="md" />
          <UiText content="A super cool card number 2" size={16} />
        </UiCard>
      </UiView>
    </UiView>
  );
}
