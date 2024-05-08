import { Page } from '@/@types';
import { Flex, Grid, Text } from '@chakra-ui/react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import Link from 'next/link';

const NotFound: Page = () => {
  return (
    <>
      <Head>
        <title>404 - InvictusRMF</title>
        <link rel="shortcut icon" href="favicon.svg" type="image/x-icon" />
      </Head>
      <Grid placeContent={'center'}>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <ExclamationCircleIcon className="stroke-red-500 h-20 w-20" />
          <Text as={'h3'} fontSize={'2xl'} fontWeight={'bold'}>
            Sorry. Page Not Found.
          </Text>
          <Link href={'/'} className="underline text-primary-100">
            Go Back To Control Panel
          </Link>
        </Flex>
      </Grid>
    </>
  );
};

NotFound.metadata = {
  title: '404 - InvictusRMF',
  description: '404 Page Not Found',
};

// NotFound.titleName = '404';

export default NotFound;
