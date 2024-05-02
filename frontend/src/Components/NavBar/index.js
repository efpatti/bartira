import { Box } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Avatar, Stack, Input } from '@chakra-ui/react'


const NavBar = () => {
  return <>
    <Box w='100%' h={115} bg='darkblue'>
      <Stack direction='col' spacing={10}>



        <Image w={150} ml={18} align="center" src='https://www.moveisbartira.com.br/images/logos/bartira-branco-vermelho.svg?256&q=75' alt='Bartira' />

        
        <Input borderRadius={20} bg='white' m={35} w={400} justify="center" align="center" placeholder='O que você está buscando?'/>

        <Avatar mt={30} ml={50} name='Oshigaki Kisame' src='https://bit.ly/broken-link' />
        <Avatar mt={30} ml={50} name='Sasuke Uchiha' src='https://bit.ly/broken-link' />
        <Avatar mt={30} ml={50} src='https://bit.ly/broken-link' />

      </Stack>
    </Box>

  </>
}

export default NavBar;
