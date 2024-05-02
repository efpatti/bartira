import { Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Avatar, Stack, Input } from '@chakra-ui/react'


export const App = () => {
  return <>
    <Box w='100%' h={115} bg='darkblue'>
      <Stack direction='col' spacing={100}>



        <Image w={150} p={40} align="center" src='https://www.moveisbartira.com.br/images/logos/bartira-branco-vermelho.svg?256&q=75' alt='Bartira' />

        <Input borderRadius={20} border={0} m={35} w={400} justify="center" align="center" placeholder='O que você está buscando?'/>

        <Avatar name='Oshigaki Kisame' src='https://bit.ly/broken-link' />
        <Avatar name='Sasuke Uchiha' src='https://bit.ly/broken-link' />
        <Avatar src='https://bit.ly/broken-link' w={20} />

      </Stack>
    </Box>

  </>
}

export default Nav;
