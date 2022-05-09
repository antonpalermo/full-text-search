import { Container } from '../components/Container'
import { FormGroup } from '../components/FormGroup'
import { DarkModeSwitch } from '../components/DarkModeSwitch'

import { Box } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { MemberSelect } from '../components/MemberSelect'
import { User } from '../../prisma/users'

export const getServerSideProps: GetServerSideProps = async () => {
  const getUsers = await fetch('http://localhost:3000/api/users')
  const users = await getUsers.json()

  return {
    props: {
      users
    }
  }
}

export interface IndexProps {
  users: User[]
}

const Index = ({ users }) => {
  return (
    <Container height="100vh">
      <DarkModeSwitch />
      <MemberSelect users={users} />
    </Container>
  )
}

export default Index
