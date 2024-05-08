import { Page } from '@/@types';
import { Flex, Grid, Text } from '@chakra-ui/react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Head from 'next/head';
import Link from 'next/link';

const ServerError: Page = () => {
  return (
    <>
      <Head>
        <title>500 - InvictusRMF</title>
        <link rel="shortcut icon" href="favicon.svg" type="image/x-icon" />
      </Head>
      <Grid placeContent={'center'}>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <XCircleIcon className="stroke-red-500 h-20 w-20" />
          <Text as={'h3'} fontSize={'2xl'} fontWeight={'bold'}>
            Something Went Wrong. Please Try Again Later.
          </Text>
          <Link href={'/'} className="underline text-primary-100">
            Go Back To Control Panel
          </Link>
        </Flex>
      </Grid>
    </>
  );
};

ServerError.metadata = {
  title: '500 - InvictusRMF',
  description: '500 Server Error',
};

// ServerError.titleName = '500';

export default ServerError;
