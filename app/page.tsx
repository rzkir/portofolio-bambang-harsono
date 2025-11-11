import { Fragment } from 'react'

import { fetchHomeContents } from '@/utils/fetching/FetchHome';

import { fetchTechSkillsContents, fetchSkillsContents } from '@/utils/fetching/FetchTechSkills';

import { fetchProjects } from '@/utils/fetching/FetchProjects';

import { fetchAchievementContents } from '@/utils/fetching/FetchAchievement';

import Home from '@/components/content/home/Home';

import Skills from '@/components/content/skills/Skills';

import Projects from '@/components/content/projects/Projects';

import Achviement from '@/components/content/achvievement/Achviement';

import Gallery from '@/components/content/gallery/Gallery';

import Contact from '@/components/content/contact/Contact';

export const dynamic = 'force-dynamic'

export const revalidate = 0

export default async function HomePage() {
  const homeData = await fetchHomeContents().catch(() => [] as HomeContent[]);
  const techSkillData = await fetchTechSkillsContents().catch(() => [] as TechSkill[]);
  const skillData = await fetchSkillsContents().catch(() => [] as SkillContent[]);
  const projectData = await fetchProjects().catch(() => [] as projects[]);
  const achievementData = await fetchAchievementContents().catch(() => [] as Achievement[]);

  return (
    <Fragment>
      <Home homeData={homeData} />
      <Skills techSkillsData={techSkillData} skillsData={skillData} />
      <Achviement achievementData={achievementData} />
      <Projects projectsData={projectData} />
      <Gallery />
      <Contact />
    </Fragment>
  );
}