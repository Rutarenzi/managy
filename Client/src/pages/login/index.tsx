import { Page } from '@/@types';
import Head from 'next/head';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
// import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { EyeIcon as ViewIcon, EyeSlashIcon as ViewOffIcon } from '@heroicons/react/24/outline';
import { axiosInstace } from '@/utils/axios.config';
import { setCookie } from '@/utils/cookies';
import Image from 'next/image';

const Login: Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstace.post('/auth/login', data);
      console.log(res);
      if (res.status === 200 && res.data.token) {
        toast({
          title: 'Login success',
          description: 'You have successfully logged in',
          status: 'success',
          isClosable: true,
        });
        setCookie('token', res.data.token, 1);
        window.location.href = '/';
      }
    } catch (error: any) {
      console.log(error);
      toast({
        title: 'Login failed',
        description: error?.response?.data?.message ?? 'Please check your email and password',
        status: 'error',
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Login - InvictusRMF</title>
        <link rel="shortcut icon" href="favicon.svg" type="image/x-icon" />
      </Head>
      <div className="bg-primary h-screen w-screen grid place-content-center">
        <Image className=" mx-auto" src={'/logo.svg'} width={80} height={80} alt="Invictus" />
        <Heading color={'white'} textAlign={'center'} p={8} size={'xl'}>
          Invictus RMF
        </Heading>
        <form onSubmit={handleSubmit}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            width={{
              base: '100%',
              sm: 400,
            }}
          >
            <Stack spacing={4}>
              <Heading>Login</Heading>
              {/* <Text fontSize={'sm'} color={status.color}>
              {status.message}
            </Text> */}
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  type="email"
                  name="email"
                  id="email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() => setShowPassword((showPassword) => !showPassword)}
                    >
                      {showPassword ? (
                        <ViewIcon
                          style={{
                            transform: 'scale(2)',
                          }}
                        />
                      ) : (
                        <ViewOffIcon
                          style={{
                            transform: 'scale(2)',
                          }}
                        />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.500'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type="submit"
                  className="bg-secondary"
                  disabled={loading}
                >
                  {loading ? <Spinner /> : ' Login'}
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </div>
    </>
  );
};

Login.metadata = {
  title: 'Login - InvictusRMF',
  description: 'InvictusRMF is a website that provides information about the InvictusRMF project.',
};
Login.titleName = 'Login';

export default Login;
