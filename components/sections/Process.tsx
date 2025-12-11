import React from 'react';
import ProcessScroll from './ProcessScroll';
import { Section, SectionContainer } from '../ui/Section';

const Process: React.FC = () => {
  return (
    <Section>
      <SectionContainer>
        <ProcessScroll />
      </SectionContainer>
    </Section>
  );
};

export default Process;
