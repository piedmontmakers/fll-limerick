export interface Award {
  id: string;
  name: string;
  category: 'required' | 'optional';
  allocation: string;
  description: string;
}

export const awards: Award[] = [
  // Required Awards
  {
    id: 'champions-award',
    name: "Champion's Award",
    category: 'required',
    allocation: '1 winner and up to 3 finalists',
    description: "This award celebrates a team that embodies the FIRST® LEGO® League Challenge experience by fully embracing the Core Values while achieving excellence and innovation in Robot Performance, Robot Design, and the Innovation Project."
  },
  {
    id: 'core-values-award',
    name: 'Core Values Award',
    category: 'required',
    allocation: '1 winner and up to 3 finalists',
    description: 'This team displays extraordinary enthusiasm and spirit; exemplifies teamwork, discovery, inclusion, innovation, impact, and fun; and shows each other and other teams respect at all times.'
  },
  {
    id: 'innovation-project-award',
    name: 'Innovation Project Award',
    category: 'required',
    allocation: '1 winner and up to 3 finalists',
    description: 'This team utilizes diverse resources for their Innovation Project to help them gain a comprehensive understanding of their problem; has a creative, well-researched solution; and effectively communicates their findings to judges and the community.'
  },
  {
    id: 'robot-design-award',
    name: 'Robot Design Award',
    category: 'required',
    allocation: '1 winner and up to 3 finalists',
    description: 'This team uses outstanding programming principles and solid engineering practices to develop a robot that is mechanically sound, durable, efficient, and highly capable of performing challenge missions.'
  },
  {
    id: 'robot-performance-award',
    name: 'Robot Performance Award',
    category: 'required',
    allocation: '1 winner and up to 3 finalists (2nd, 3rd, and 4th places)',
    description: 'This award celebrates a team that scores the most points during the Robot Game. Teams have a chance to compete in at least three 2.5-minute matches, and their highest score counts.'
  },
  {
    id: 'coach-mentor-award',
    name: 'Coach/Mentor Award',
    category: 'required',
    allocation: 'Up to 6 winners',
    description: 'Coaches and mentors inspire their teams to do their best, both as individuals and together. This award goes to the coach or mentor whose leadership and guidance is clearly evident and best exemplifies the FIRST Core Values.'
  },

  // Optional Awards
  {
    id: 'engineering-excellence-award',
    name: 'Engineering Excellence Award',
    category: 'optional',
    allocation: 'Up to 3 winners',
    description: 'This award celebrates a team with an efficiently designed robot, an innovative project solution that effectively addresses the season challenge, and Core Values evident in all they do.'
  },
  {
    id: 'breakthrough-award',
    name: 'Breakthrough Award',
    category: 'optional',
    allocation: 'Up to 3 winners',
    description: 'This award celebrates a team that made significant progress in their confidence and capability in at least one of the core areas of FIRST LEGO League.'
  },
  {
    id: 'rising-all-star-award',
    name: 'Rising All-Star Award',
    category: 'optional',
    allocation: 'Up to 3 winners',
    description: 'This award celebrates a team that the judges notice and expect great things from in the future.'
  },
  {
    id: 'motivate-award',
    name: 'Motivate Award',
    category: 'optional',
    allocation: 'Up to 3 winners',
    description: 'This award celebrates a team that embraces the culture of FIRST LEGO League through team building, team spirit, and displayed enthusiasm.'
  },
  {
    id: 'peer-award',
    name: 'Peer Award',
    category: 'optional',
    allocation: 'Up to 3 winners',
    description: 'This award celebrates a team that has been nominated by their peers for their expression of Core Values and Gracious Professionalism.'
  }
];
