import { Fragment } from 'react'

import { fetchHomeContents } from '@/utils/fetching/FetchHome';

import Home from '@/components/content/home/Home';

export default async function HomePage() {
  const homeData = await fetchHomeContents();
  return (
    <Fragment>
      <Home homeData={homeData} />
    </Fragment>
  );
}