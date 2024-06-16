'use client';

// import { HomepageBlocksDocument } from '@tempo/api/generated/graphql';
import { Button } from '@tempo/ui/components/buttons/Button';
import { useShopSettings } from '@tempo/ui/providers/ShopSettingsProvider'; // HOMEPAGE_MENU

// import { contextToRegionQuery } from '@tempo/utils/regions';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { NAVBAR_HEIGHT } from '@tempo/ui/components/Layout';
import { useUser } from '@tempo/api/auth/react/hooks';
import React from 'react';
import usePaths from '@kwstriping/hooks/usePaths';
import Layout from '@kwstriping/app/client/Layout';

// export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
//   const [client, ssrCache] = getStaticRenderingClientAndCache();
//   await client
//     .query(HomepageBlocksDocument, {
//       slug: HOMEPAGE_MENU,
//       ...contextToRegionQuery(context),
//     })
//     .toPromise();
//   return {
//     props: generateStaticRenderingProps(ssrCache),
//     revalidate: 60 * 60,
//   };
// };

function Home() {
  const paths = usePaths();
  const { user } = useUser();
  const { name: shopName } = useShopSettings();
  const shopDescription =
    'We offer reliable, precise field-painting services throughout the state of Utah.';
  const learnMoreCta = 'Learn more';
  const catalogCta = 'Request service';
  const productSlug = 'striping-service';
  const catalogHref = user?.isStaff ? `/products/${productSlug}` : `/contact`;
  console.log('Home');
  return (
    <Layout transparentBg>
      <main
        className="grow min-w-full max-w-full overflow-x-hidden flex items-center justify-center"
        style={{
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT})`,
        }}
      >
        <div
          className="flex flex-col items-center justify-center py-[3rem]"
          style={{ background: `radial-gradient(rgba(0, 0, 0, 0.70), transparent 75%)` }}
        >
          <Typography
            variant={'h1'}
            className="text-center text-white text-xl text-black-outline"
          >{`Welcome to ${shopName}`}</Typography>
          <Divider flexItem />
          <Typography className="lead text-center text-white m-4 text-lg max-w-screen-sm text-black-outline">
            {shopDescription}
          </Typography>
          <div className="text-center flex flex-wrap xs:gap-3 sm:gap-12 m-2 text-white items-center">
            <Link href={'#about'}>
              <Button className="p-6 py-3">{learnMoreCta}</Button>
            </Link>
            <Typography className={'text-black-outline'}>{' or '}</Typography>
            <Link href={catalogHref}>
              <Button className="p-6 py-3">{catalogCta}</Button>
            </Link>
          </div>
        </div>
      </main>
      <div id="about" className={'bg-white/80 flex xs:flex-col sm:flex-row gap-8 md:gap-20 p-8'}>
        {paragraphs.map(([header, paragraph], index) => (
          <section key={index}>
            <Typography variant={'h3'} className={'mb-1'}>
              {header}
            </Typography>
            <Typography className={'max-w-screen-sm'}>{paragraph}</Typography>
          </section>
        ))}
      </div>
    </Layout>
  );
}

export default Home;

const paragraphs: [string, string][] = [
  [
    'About us',
    'KW Striping has been providing athletic field painting services since 2009. ' +
      'We began with just one person armed with tape measures and string at a local soccer field; since then, we have grown to become a trusted provider of professional-quality lines for fields throughout the state of Utah. ' +
      'We now have a full crew and are able to use GPS automated paint systems to provide straight lines for sports such as soccer, lacrosse, football, rugby, ultimate frisbee, and more, improving the quality of play and pleasing officials and fans alike.',
  ],
  [
    'Can do',
    'Whether you have a single field or more than thirty, we can help you check the time-consuming task of painting off your list. ' +
      'You can count on us to handle the painting all season long or, if you prefer, to just take care of the initial setup. ' +
      'If you prefer to maintain a field yourself after the initial setup, we have the necessary equipment and paint for you to get started. ' +
      "Just ask, and we'll be happy to provide more information.",
  ],
  [
    'The KW Striping difference',
    'At KW Striping, we are committed to providing excellent service. ' +
      'We understand that building a loyal customer base depends on taking care of people, being genuine in our interactions, and delivering consistent results. ' +
      'In this space, we are the pros. Even if technology fails us, we are always prepared to go old school and paint by hand. Our customers trust us to get the job done right. ' +
      "Whether you need us to handle the painting or prefer to take care of your own fields, we're always willing to offer our knowledge and expertise. ",
  ],
];
