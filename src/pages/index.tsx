import { Container } from '../components/Container'
import { FormGroup } from '../components/FormGroup'
import { DarkModeSwitch } from '../components/DarkModeSwitch'

import { Box } from '@chakra-ui/react'

const Index = () => (
  <Container height="100vh">
    <DarkModeSwitch />
    <Box py={20}>
      <FormGroup />
    </Box>
  </Container>
)

export default Index
