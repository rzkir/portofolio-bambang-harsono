import { Fragment } from 'react'

import { fetchHomeContents } from '@/utils/fetching/FetchHome';

import { fetchTechSkillsContents, fetchSkillsContents } from '@/utils/fetching/FetchTechSkills';

import { fetchProjects } from '@/utils/fetching/FetchProjects';

import { fetchAchievementContents } from '@/utils/fetching/FetchAchievement';

import Home from '@/components/content/home/Home';

import Skills from '@/components/content/skills/Skills';

import Projects from '@/components/content/projects/Projects';

import Achviement from '@/components/content/achvievement/Achviement';

import Contact from '@/components/content/contact/Contact';

export default async function HomePage() {
  const homeData = await fetchHomeContents();
  const techSkillData = await fetchTechSkillsContents();
  const skillData = await fetchSkillsContents();
  const projectData = await fetchProjects();
  const achievementData = await fetchAchievementContents();

  return (
    <Fragment>
      <Home homeData={homeData} />
      <Skills techSkillsData={techSkillData} skillsData={skillData} />
      <Achviement achievementData={achievementData} />
      <Projects projectsData={projectData} />
      <Contact />
    </Fragment>
  );
}