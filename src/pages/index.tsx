import { Container } from '../components/Container'
import { FormGroup } from '../components/FormGroup'
import { DarkModeSwitch } from '../components/DarkModeSwitch'

import { Box } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  const getUsers = await fetch('http://localhost:3000/api/users')
  const users = await getUsers.json()

  return {
    props: {
      users
    }
  }
}

const Index = ({ users }) => {
  return (
    <Container height="100vh">
      <DarkModeSwitch />
      <Box py={20}>
        <FormGroup />
      </Box>
      {JSON.stringify(users)}
    </Container>
  )
}

export default Index
