import { Stack, HStack, Link, Image } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Stack
      marginInline="auto"
      p={8}
      margin={0}
      bgColor={'darkblue'}
      alignItems="center"
      color={'white'}
    >

      <Stack d={{ base: 'flex', md: 'none' }} alignItems="center">
      <p>© {new Date().getFullYear()} INDÚSTRIA DE MÓVEIS BARTIRA LTDA. Todos os direitos reservados.</p>
      </Stack>

    </Stack>
  );
};


export default Footer;