import { Fragment } from 'react'

import { fetchHomeContents } from '@/utils/fetching/FetchHome';

import { fetchTechSkillsContents, fetchSkillsContents } from '@/utils/fetching/FetchTechSkills';

import Home from '@/components/content/home/Home';

import Skills from '@/components/content/skills/Skills';

export default async function HomePage() {
  const homeData = await fetchHomeContents();
  const techSkillData = await fetchTechSkillsContents();
  const skillData = await fetchSkillsContents();
  return (
    <Fragment>
      <Home homeData={homeData} />
      <Skills techSkillsData={techSkillData} skillsData={skillData} />
    </Fragment>
  );
}