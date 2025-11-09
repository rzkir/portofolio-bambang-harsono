import { Fragment } from 'react'

import { fetchHomeContents } from '@/utils/fetching/FetchHome';

import { fetchTechSkillsContents, fetchSkillsContents } from '@/utils/fetching/FetchTechSkills';

import { fetchProjects } from '@/utils/fetching/FetchProjects';

import Home from '@/components/content/home/Home';

import Skills from '@/components/content/skills/Skills';

import Projects from '@/components/content/projects/Projects';

export default async function HomePage() {
  const homeData = await fetchHomeContents();
  const techSkillData = await fetchTechSkillsContents();
  const skillData = await fetchSkillsContents();
  const projectData = await fetchProjects();

  return (
    <Fragment>
      <Home homeData={homeData} />
      <Skills techSkillsData={techSkillData} skillsData={skillData} />
      <Projects projectsData={projectData} />
    </Fragment>
  );
}